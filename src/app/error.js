"use client";
import React from "react";
import "./globals.css"
export default function ErrorBoundry({ error, reset }) {
  return (
    <div>
      <div className="not-found-page">
        <main className="not-found-container">
          <div className="not-found-content">
            <h2 className="error-code h2">Sorry, an error occurred.</h2>
            <p style={{marginTop:"10px",marginBottom:"10px",lineHeight:"1" ,fontSize:"30px"}} className="error-title">
              Sorry, there was an error loading the page.
            </p>
            <p className="error-message">error Page : {error.message}</p>
            <div className="home-link">
              <button onClick={reset}>reset</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// "use client";
// import React from "react";

// export default function Error({ error, reset }) {
//   return (
//     <div style={{ textAlign: 'center', padding: '40px' }}>
//       <h1>حدث خطأ</h1>
//       <p>{error.message}</p>
//       <button onClick={reset}>حاول مرة أخرى</button>
//     </div>
//   );
// }
