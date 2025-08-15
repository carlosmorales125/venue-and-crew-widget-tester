"use client";

import Script from "next/script";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentVenueId, setCurrentVenueId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  // Get the Laravel app URL from environment variables
  const laravelAppUrl =
    process.env.NEXT_PUBLIC_LARAVEL_APP_URL ||
    "https://staging.venueandcrew.com";

  useEffect(() => {
    // Check localStorage for saved venue ID on component mount
    const savedVenueId = localStorage.getItem("venue-id");
    if (savedVenueId) {
      setCurrentVenueId(savedVenueId);
      setInputValue(savedVenueId);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Save to localStorage
      localStorage.setItem("venue-id", inputValue.trim());
      // Reload the page
      window.location.reload();
    }
  };

  const handleClear = () => {
    localStorage.removeItem("venue-id");
    setInputValue("");
    window.location.reload();
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "30px", maxWidth: "600px" }}>
        <h1>Venue & Crew Widget Tester</h1>
        <p>
          Enter a venue ID to test the widget with different configurations.
        </p>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="venue-id-input"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Venue ID:
            </label>
            <input
              id="venue-id-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter venue ID"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "300px",
                marginRight: "10px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Update Widget
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear & Reset
            </button>
          </div>
        </form>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Current Venue ID: <strong>{currentVenueId}</strong>
        </p>
      </div>

      <Link href={`${laravelAppUrl}/widget/widget.css`} type="stylesheet" />
      <div
        id="venue-and-crew-widget"
        data-venue-id={currentVenueId}
        data-button-mode="false"
      ></div>
      <Script
        src={`${laravelAppUrl}/widget.js?v=1.0.1`}
        strategy="afterInteractive"
      />
    </main>
  );
}
