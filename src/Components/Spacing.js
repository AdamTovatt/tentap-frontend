import styled from "styled-components";

const Spacing = styled.div`
  width: ${(props) => (props.Width ? props.Width : "0px")};
  height: ${(props) => (props.Height ? props.Height : "0px")};
`;

export default Spacing;
