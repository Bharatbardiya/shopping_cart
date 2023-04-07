import React from "react";
import { FaSpinner } from "react-icons/fa";
const Loading = () => {
  return (
    <div className="loader">
      <div className="spinner">
        <FaSpinner />
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
