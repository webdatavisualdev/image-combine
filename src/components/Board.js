/* board component to show frame, background, selfie on one screen
  and download into one image
  - used react-rnd for drag and drop selfie
*/

import Box from "@mui/material/Box";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  zIndex: 3,
};

const frameStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 1,
};

const backgroundStyle = {
  position: "absolute",
  top: 50,
  left: 50,
  width: "calc(100% - 100px)",
  height: "calc(100% - 100px)",
  zIndex: 2,
};

const selfieStyle = {
  width: "100%",
  height: "100%",
};

const Board = ({ frame, background, selfies, onDrag }) => {
  return (
    <Box
      position={"relative"}
      sx={{ border: "1px solid", width: "100%", height: "100%" }}
    >
      <img src={frame?.src} style={frameStyle} />
      <img src={background?.src} style={backgroundStyle} />
      {selfies &&
        selfies.length > 0 &&
        selfies.map((selfie, index) => (
          <Rnd
            style={style}
            default={{
              x: 0,
              y: 0,
              width: 300,
              height: 200,
            }}
            key={`selfie_${index}`}
            onDragStop={(e, d) => onDrag(d, index)}
          >
            <img
              src={selfie?.src}
              style={selfieStyle}
              onDragStart={(e) => e.preventDefault()}
            />
          </Rnd>
        ))}
    </Box>
  );
};

export default Board;
