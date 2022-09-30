import styled from "styled-components";
import { Color, BorderRadius } from "./Constants";
import { useState } from "react";

const ImagePreviewButton = ({ source, onClick, startHidden }) => {
  const [hidden, setHidden] = useState(startHidden ? true : false);
  return (
    <ButtonHtml
      onClick={() => {
        setHidden(false);
        onClick();
      }}
    >
      {hidden ? (
        <ButtonText>Bild gömd</ButtonText>
      ) : (
        <>
          {source && source.length > 0 ? (
            <Image src={source} alt="Bild från uppgift" />
          ) : (
            <ButtonText>Bild saknas</ButtonText>
          )}
        </>
      )}
    </ButtonHtml>
  );
};

const Image = styled.img`
  border-radius: 9px;
  max-width: 19.5rem;
  width: 19.5rem;
  height: 5rem;
  max-height: 5.75rem;
  margin: 0.22rem;
  height: 100%;
  object-fit: cover;
`;

const ButtonText = styled.div`
  font-size: 1rem;
  font-family: "Jost";
  color: ${Color.Dark};
  font-weight: 700;
`;

const ButtonHtml = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-family: "Jost";
  width: 20rem;
  max-height: 6.25rem;
  height: 6.25rem;
  border-radius: ${BorderRadius.Default};
  border: none;
  background-color: ${(props) => (props.TextColor ? props.color : Color.White)};
  text-decoration: none;

  cursor: pointer;

  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition-duration: 0.05s;
  }
`;

export default ImagePreviewButton;
