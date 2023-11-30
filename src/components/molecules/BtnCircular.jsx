import styled from "styled-components";
export function BtnCircular({
  icon,
  width,
  height,
  bgcolor,
  textColor,
  fontsize,
  translateX,
  translateY,
}) {
  return (
    <Container
      bgcolor={bgcolor}
      textColor={textColor}
      height={height}
      width={width}
      fontsize={fontsize}
      translateX={translateX}
      translateY={translateY}
    >
      <span>{icon}</span>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${(props) => props.bgcolor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: ${(props) => props.translateY};
  left: ${(props) => props.translateX};

  span {
    font-size: ${(props) => props.fontsize};
    text-align: center;
    color: ${(props) => props.textColor};
  }
`;