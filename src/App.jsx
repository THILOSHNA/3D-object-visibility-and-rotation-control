// src/App.jsx
import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import Controls from "./Controls";

const App = () => {
  const [visibility, setVisibility] = useState({
    box: true,
    torus: true,
    dodecahedron: true,
  });
  const [rotationSpeeds, setRotationSpeeds] = useState({
    box: 0.01,
    torus: 0.01,
    dodecahedron: 0.01,
  });

  const handleToggleVisibility = (object) => {
    setVisibility((prevState) => ({
      ...prevState,
      [object]: !prevState[object],
    }));
  };

  const handleSpeedChange = (object, speed) => {
    setRotationSpeeds((prevState) => ({
      ...prevState,
      [object]: speed,
    }));
  };

  return (
    <div className="container">
      <h1>3D Object Visibility and Rotation Control</h1>
      <Controls
        visibility={visibility}
        onToggleVisibility={handleToggleVisibility}
        rotationSpeeds={rotationSpeeds}
        onSpeedChange={handleSpeedChange}
      />
      <ThreeScene visibility={visibility} rotationSpeeds={rotationSpeeds} />
    </div>
  );
};

export default App;
