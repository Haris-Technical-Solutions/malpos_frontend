import React from "react";
import { Box } from "../elements";
import { Form } from "react-bootstrap";

export default function ColorDivs ({ onSelectColor })  
{
  const handleColorSelection = (color) => {
    onSelectColor(color); // Pass the selected color back to the parent component
  };

  return (
    <div>
      <Form.Label>Photo or Color</Form.Label>
      <Box className="cicrle-spans">
        <span className="red" onClick={() => handleColorSelection("red")}></span>
        <span className="pink" onClick={() => handleColorSelection("pink")}></span>
        <span className="purple"  onClick={() => handleColorSelection("purple")}></span>
        <span className="light-b"  onClick={() => handleColorSelection("light-blue")}></span>
        <span className="dark-b" onClick={() => handleColorSelection("dark-blue")}></span>
        <span className="blue" onClick={() => handleColorSelection("blue")}></span>
        <span className="see-green" onClick={() => handleColorSelection("see-green")}></span>
        <span className="green" onClick={() => handleColorSelection("green")}></span>
      </Box>
    </div>
  );
}
// import React, { useState } from "react";
// import { Box } from "../elements";
// import { Form } from "react-bootstrap";

// export default function ColorDivs({ selectedColor, onSelectColor }) {
//   const colorOptions = [
//     { name: "red", code: "#FF0000" },
//     { name: "pink", code: "#FFC0CB" },
//     { name: "purple", code: "#800080" },
//     { name: "light-b", code: "#ADD8E6" },
//     { name: "dark-b", code: "#00008B" },
//     { name: "blue", code: "#0000FF" },
//     { name: "see-green", code: "#2E8B57" },
//     { name: "green", code: "#008000" },
//     { name: "light-green", code: "#90EE90" },
//   ];

//   const handleColorSelect = (color) => {
//     onSelectColor(color);
//   };

//   return (
//     <div>
//       <Form.Label>Photo or Color</Form.Label>
//       <Box className="cicrle-spans">
//         {colorOptions.map((colorOption) => (
//           <span
//             key={colorOption.name}
//             className={colorOption.name}
//             style={{
//               backgroundColor: colorOption.code,
//               border: selectedColor === colorOption.name ? "2px solid black" : "none",
//             }}
//             onClick={() => handleColorSelect(colorOption.name)}
//           ></span>
//         ))}
//       </Box>
//     </div>
//   );
// }
