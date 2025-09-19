import React from "react";

export default function loading() {
  return (
    <div className="position-fixed top-0 left-0 w-full h-screen bg-pink-50 flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
}
