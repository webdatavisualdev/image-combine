/** App component
 * - used merge-images to merge multiple images into one image
 * - used file-save to download image
 */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import Board from "./components/Board";
import FileInput from "./components/FileInput";
import Preview from "./components/Preview";
import mergeImages from "merge-images";
import { saveAs } from "file-saver";

function App() {
  const [frames, setFrames] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [selfies, setSelifes] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState();
  const [selectedFrame, setSelectedFrame] = useState();

  const onDrop = useCallback((acceptedFiles, type) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (type === "frame") {
          setFrames((prevState) => [
            ...prevState,
            { id: index, src: e.target.result, x: 0, y: 0 },
          ]);
        } else if (type === "background") {
          setBackgrounds((prevState) => [
            ...prevState,
            { id: index, src: e.target.result, x: 50, y: 50 },
          ]);
        } else {
          setSelifes((prevState) => [
            ...prevState,
            { id: index, src: e.target.result },
          ]);
        }
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onSelectFrame = (id) => setSelectedFrame(frames[id]);

  const onSelectBackground = (id) => setSelectedBackground(backgrounds[id]);

  const onDrag = (d, index) => {
    const images = [...selfies];
    images[index] = {
      x: d.x,
      y: d.y,
      ...images[index],
    };
    setSelifes(images);
  };

  const onDownload = async () => {
    await mergeImages([selectedFrame, selectedBackground, ...selfies]).then(
      (b64) => {
        saveAs(b64, "download.jpeg");
      }
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }} height="100vh">
      <Grid container spacing={2} height="100%">
        <Grid item xs={9} height="60%">
          <Board
            frame={selectedFrame}
            background={selectedBackground}
            selfies={selfies}
            onDrag={onDrag}
          />
        </Grid>
        <Grid item xs={3} height="60%">
          <FileInput
            onDrop={(files) => onDrop(files, "frame")}
            label={"frames"}
          />
          <Preview images={frames} type="vertical" onSelect={onSelectFrame} />
        </Grid>
        <Grid
          item
          xs={9}
          height="5%"
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Button onClick={onDownload}>Download</Button>
        </Grid>
        <Grid item xs={12} height="20%" sx={{ display: "flex" }}>
          <FileInput
            onDrop={(files) => onDrop(files, "background")}
            label={"background images"}
          />
          <Preview
            images={backgrounds}
            type="horizontal"
            onSelect={onSelectBackground}
          />
        </Grid>
        <Grid item xs={12} height="15%" sx={{ display: "flex" }}>
          <FileInput
            onDrop={(files) => onDrop(files, "selfie")}
            label={"selfies"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
