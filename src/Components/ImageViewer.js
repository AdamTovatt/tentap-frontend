import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";

const ImageViewer = ({ source }) => {
  return <Image src={source} alt="Bild från uppgift" />;
};

const Image = styled.img`
  border-radius: ${BorderRadius.Default};
  object-fit: contain;
  width: 100vw;
  height: 100vh;
`;

export default ImageViewer;
