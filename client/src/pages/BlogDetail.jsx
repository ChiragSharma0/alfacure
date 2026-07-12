import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { ArrowLeft } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content, R2_PUBLIC_URL } = useCMS();

  const resolveImage = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return `${R2_PUBLIC_URL}/${img}`;
  };

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return (
      <div className="container">
        <h2>Article not found.</h2>
      </div>
    );
  }

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: "var(--bg-light)",
        minHeight: "100vh",
      }}
    >
      {/* Hero */}

      <section
        style={{
          background: "var(--blue-dark)",
          color: "#fff",
          padding: "110px 0 80px",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "950px",
          }}
        >
          <button
            className="btn btn-outline"
            onClick={() => navigate("/blog")}
            style={{
              marginBottom: "32px",
              borderColor: "rgba(255,255,255,0.25)",
              color: "#fff",
            }}
          >
            <ArrowLeft size={16} />
            Back to Articles
          </button>

          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              color: "var(--green-light)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            {blog.category}
          </span>

          <h1
            style={{
              fontSize: "3rem",
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: "24px",
              maxWidth: "800px",
            }}
          >
            {blog.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.95rem",
            }}
          >
            <span>{blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}

      <section
        style={{
          marginTop: "-50px",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "950px",
          }}
        >
          <img
            src={resolveImage(blog.image)}
            alt={blog.title}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
              border: "1px solid var(--border)",
            }}
          />
        </div>
      </section>

      {/* Article */}

      <section
        style={{
          padding: "70px 0 100px",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "50px",
            alignItems: "start",
          }}
        >
          {/* Sidebar */}

          <aside
            className="card"
            style={{
              position: "sticky",
              top: "100px",
              padding: "28px",
              border: "1px solid var(--border)",
              background: "#fff",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--blue-dark)",
                marginBottom: "18px",
              }}
            >
              Article Summary
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {blog.content.map((section, index) => (
                <div key={index}>
                  <span
                    style={{
                      color: "var(--green-dark)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p
                    style={{
                      marginTop: "6px",
                      color: "var(--blue-light)",
                      lineHeight: 1.5,
                      fontSize: "0.9rem",
                    }}
                  >
                    {section.heading}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}

          <article
            className="card"
            style={{
              background: "#fff",
              padding: "50px",
              border: "1px solid var(--border)",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "var(--blue-light)",
                marginBottom: "50px",
              }}
            >
              {blog.excerpt}
            </p>

            {blog.content.map((section, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "50px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.75rem",
                    color: "var(--blue-dark)",
                    marginBottom: "18px",
                    lineHeight: 1.3,
                  }}
                >
                  {section.heading}
                </h2>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.9,
                    color: "var(--blue-light)",
                  }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}