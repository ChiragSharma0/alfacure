import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Blog() {
  const navigate = useNavigate();
  const { content, resolveImage } = useCMS();
  const blogs = content?.blogs || [];

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: 'var(--bg-light)',
        minHeight: '100vh'
      }}
    >
      <SEO
        title="Blog — Insights & Resources"
        description="Read the latest insights, news, and resources from Alfacure Lifescience about LVP formulations, pharmaceutical exports, regulatory updates, and healthcare industry trends."
        canonical="https://alfacurelifescience.com/blog"
      />
      <section
        className="section"
        style={{
          padding: '100px 0 60px',
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div className="container">
          <span className="badge badge-blue">
            INSIGHTS & RESOURCES
          </span>

          <h1
            style={{
              fontSize: '2.75rem',
              marginTop: '16px',
              color: 'var(--blue-dark)'
            }}
          >
            News & Articles
          </h1>

          <p
            style={{
              maxWidth: '720px',
              color: 'var(--blue-light)',
              marginTop: '16px'
            }}
          >
            Explore pharmaceutical insights, export guidance,
            manufacturing updates, and industry trends.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            className="grid grid-cols-3"
            style={{ gap: '24px' }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="card"
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  navigate(`/blog/${blog.slug}`)
                }
              >
                <img
                  src={resolveImage(blog.image)}
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                />

                <div style={{ padding: '24px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--green-dark)',
                      fontWeight: 700
                    }}
                  >
                    {blog.category}
                  </span>

                  <h2
                    style={{
                      fontSize: '1.25rem',
                      margin: '12px 0'
                    }}
                  >
                    {blog.title}
                  </h2>

                  <p
                    style={{
                      color: 'var(--blue-light)',
                      lineHeight: 1.6
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  <button
                    className="btn btn-outline"
                    style={{
                      marginTop: '20px'
                    }}
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}