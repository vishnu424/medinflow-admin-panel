import React from "react";
import { useHistory } from "react-router-dom";
const Page404 = () => {
  const navigate = useHistory();
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <h2>404 - Page not found</h2>
      <button onClick={() => navigate.push("/")}>Redirect to Home</button>
    </div>
  );
};
export default Page404;
