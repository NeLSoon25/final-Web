import styled from "styled-components";
import Lottie from "react-lottie";
export function Lottieanimation({ height, width, animation }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
  };
  return (
    <Container>
      <Lottie options={defaultOptions}
      height={`${height}px`} width={`${width}px`} isClickToPauseDisabled/>
    </Container>
  );
}
const Container = styled.div``;