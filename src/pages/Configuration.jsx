import styled from "styled-components";
import { ConfigurationTemplate } from "../index";
export function Configuration() {
  return (
    <Container>
      <ConfigurationTemplate />
    </Container>
  );
}
const Container = styled.main`
  height: 100vh;
`;