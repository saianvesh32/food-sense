import React from "react";

const StreamlitPage1 = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="http://localhost:8502"
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

export default StreamlitPage1;
