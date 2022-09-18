import styled from "styled-components";

const AdvancedSpacing = ({ MinHeight, MaxHeight, ScreenPercentage }) => {
  return (
    <VerticalSpacing
      style={{
        minHeight: MinHeight + "rem",
        maxHeight: MaxHeight + "rem",
        height: ScreenPercentage + "vh",
      }}
    />
  );
};
const VerticalSpacing = styled.div``;

export default AdvancedSpacing;
