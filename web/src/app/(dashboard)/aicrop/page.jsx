"use client";

export default function AiCrop() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>AI Crop Recommendation</h1>
      <iframe
        src="http://localhost:8501" // Update with the deployed URL if applicable
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        title="AI Crop Recommendation"
      ></iframe>
    </div>
  );
}
