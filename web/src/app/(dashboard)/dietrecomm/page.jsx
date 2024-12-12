import { color } from "framer-motion";
import React from "react";

const StreamlitPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #FFB6C1, #FFEB3B, #B0E0E6)", // Gradient background
        fontFamily: "Arial, sans-serif",
      }}
    >
      <iframe
        src="http://localhost:8501"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        title="Streamlit App"
      />
    </div>
  );
};

export default StreamlitPage;
