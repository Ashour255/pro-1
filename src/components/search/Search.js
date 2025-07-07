import React from 'react'
import "./Search.css"
export default function Search() {
  return (
    <main className="search-container">
    <div className="full-width">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <label className="search-label">Search</label>
          <div className="input-container">
            <input type="text" className="global-input" />
          </div>
        </div>
        <button className="search-button">
          Search
        </button>
      </div>
    </div>
  </main>
  )
}
