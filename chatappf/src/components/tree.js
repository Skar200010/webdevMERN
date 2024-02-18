import React from 'react';
import './tree.css'; // Make sure to import or define the necessary styles

const SaveTreesTooltip = () => {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="text">Save Trees</div>

        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
      </div>
      <div className="leaf icon"></div>
    </div>
  );
};

export default SaveTreesTooltip;
