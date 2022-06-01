/* image preview component for frame, background
 */

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Preview = ({ images, type, onSelect }) => {
  const show = (image) => {
    return (
      <ImageListItem
        key={`image_${image.id}`}
        sx={{ width: 200, height: 140, margin: "auto" }}
        onClick={() => onSelect(image.id)}
      >
        <img alt="" src={image.src} />
      </ImageListItem>
    );
  };

  return (
    <ImageList cols={1} sx={{ display: type === "vertical" ? "grid" : "flex" }}>
      {images.map(show)}
    </ImageList>
  );
};

export default Preview;
