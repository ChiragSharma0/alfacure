// Restart Trigger Comment: Nodemon Reload env configurations
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set up Cloudflare R2 S3 Client
const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Multer for handling file uploads (in-memory buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware for basic auth (you can expand this later)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.ADMIN_TOKEN || 'alfacure-admin-token-2026'}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@alfacure.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'alfacure2026';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'alfacure-admin-token-2026';

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Test route
app.get('/', (req, res) => {
  res.send('CMS Backend is running.');
});

// Login route (email and password)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Config route to expose public R2 URL
app.get('/api/config', (req, res) => {
  res.json({
    r2PublicUrl: process.env.VITE_R2_PUBLIC_URL || 'https://pub-xxxxxx.r2.dev'
  });
});

// Upload Image
app.post('/api/images', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const { key, oldKey } = req.body;
    const fileBuffer = req.file.buffer;

    // If oldKey is provided, delete the old image first (for replacement)
    if (oldKey && oldKey !== key) {
      try {
        await S3.send(new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: oldKey,
        }));
        console.log(`Deleted previous image: ${oldKey}`);
      } catch (err) {
        console.error(`Failed to delete old key ${oldKey}:`, err);
      }
    }

    // Upload new image
    await S3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: req.file.mimetype,
    }));

    res.json({ message: 'Image uploaded successfully', key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete Image
app.delete('/api/images', authMiddleware, async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: 'Key is required' });

    await S3.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }));

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Get Content JSON (Retrieves from S3/R2 with local fallbacks if not found)
app.get('/api/content', async (req, res) => {
  try {
    const response = await S3.send(new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'content.json',
    }));
    const data = await response.Body.transformToString();
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.name === 'NoSuchKey' || error.code === 'NoSuchKey') {
      console.log('content.json not found in R2 bucket, returning empty structure');
      return res.json({
        home: {},
        about: {},
        products: {},
        gallery: {},
        certifications: {}
      });
    }
    console.error('Error fetching content.json from R2:', error);
    res.status(500).json({ error: 'Failed to retrieve content from cloud storage' });
  }
});

// Update Content JSON
app.post('/api/content', authMiddleware, async (req, res) => {
  try {
    const content = req.body;
    
    // Scan bucket to populate uploadedImages list before writing
    try {
      const objects = await S3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));
      if (objects.Contents) {
        if (!content.uploadedImages) content.uploadedImages = {};
        objects.Contents.forEach(obj => {
          if (obj.Key !== 'content.json') {
            content.uploadedImages[obj.Key] = true;
          }
        });
      }
    } catch (listErr) {
      console.error('Failed to list objects during content post:', listErr);
    }

    await S3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'content.json',
      Body: JSON.stringify(content, null, 2),
      ContentType: 'application/json',
    }));

    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
