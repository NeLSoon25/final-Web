import styled from "styled-components";
import { Icono, Colorcontent } from "../../index";
export function ItemsDropdown({ item, func, color }) { //! unused import
  return (
    <Container onClick={func}>
      <Icono>{item.icon}</Icono>
      <Colorcontent $width="12px" $height="12px" $color={item.color}/>
      <span>{item.text}</span>
    </Container>
  );
}
const Container = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }
  svg {
    font-size: 28px;
    display: block;
  }
`;