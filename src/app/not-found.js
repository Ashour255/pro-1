import Head from 'next/head';
import Link from 'next/link';
import './globals.css'; // Assuming you have a global CSS file for styles

export default function NotFound() {
  return (
    <div className="not-found-page">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      
      <main className="not-found-container">
        <div className="not-found-content">
          <p className="error-code">Error 404</p>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-message">The page you are looking for does not exist</p>
          <div className="home-link">
            <Link href="/">Go to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}