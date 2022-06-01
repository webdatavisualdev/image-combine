/* file upload component using react-dropzone
 */

import { useDropzone } from "react-dropzone";

import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function FileInput({ onDrop, label }) {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Container {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
      <input {...getInputProps()} />
      <p>{`Upload ${label}`}</p>
      <button type="button" className="btn" onClick={open}>
        Click to select file
      </button>
    </Container>
  );
}

export default FileInput;
