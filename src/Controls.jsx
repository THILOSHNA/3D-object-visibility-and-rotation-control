// src/Controls.jsx
import React from "react";

const Controls = ({
  visibility,
  onToggleVisibility,
  rotationSpeeds,
  onSpeedChange,
}) => {
  const handleSpeedInputChange = (event, object) => {
    const newSpeed = parseFloat(event.target.value);
    if (newSpeed >= 0) {
      onSpeedChange(object, newSpeed);
    }
  };

  const handleSpeedSliderChange = (event, object) => {
    const newSpeed = parseFloat(event.target.value);
    onSpeedChange(object, newSpeed);
  };

  return (
    <div className="controls">
      {["box", "torus", "dodecahedron"].map((object) => (
        <div key={object} className="control-group">
          <button onClick={() => onToggleVisibility(object)}>
            Toggle {object}
          </button>

          <label>Rotation Speed:</label>
          <div className="speedControls">
            <input
              type="range"
              value={rotationSpeeds[object]}
              onChange={(event) => handleSpeedSliderChange(event, object)}
              step="0.01"
              min="0"
              max="0.1"
            />
            <input
              type="number"
              value={rotationSpeeds[object]}
              onChange={(event) => handleSpeedInputChange(event, object)}
              step="0.01"
              min="0"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Controls;
