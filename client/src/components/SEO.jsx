import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Alfacure Lifescience';
const SITE_URL = 'https://alfacurelifescience.com';
const DEFAULT_OG_IMAGE = '/assets/logo.png';

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
  noindex = false,
}) {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Sterile Infusions & Injections`;

  const pageDesc = description || 'Alfacure Lifescience Pvt. Ltd. is an Ahmedabad-based pharmaceutical export company specializing in Large Volume Parenteral (LVP) formulations, serving healthcare institutions across global markets.';
  const pageKeywords = keywords || 'Alfacure Lifescience, pharmaceutical, LVP, IV fluids, sterile infusions, parenteral solutions, injection, Ahmedabad, pharma export, large volume parenteral, healthcare';
  const pageImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonical || SITE_URL} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />

      <link rel="canonical" href={canonical || SITE_URL} />
    </Helmet>
  );
}
