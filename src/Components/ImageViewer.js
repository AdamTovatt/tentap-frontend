import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";

const ImageViewer = ({ source }) => {
  return <Image src={source} alt="Bild från uppgift" />;
};

const Image = styled.img`
  border-radius: ${BorderRadius.Default};
  object-fit: contain;
  width: 95vw;
  height: 95vh;

  @media (min-width: 640px) {
    width: 50rem;
    height: 50rem;
  }
`;

export default ImageViewer;
