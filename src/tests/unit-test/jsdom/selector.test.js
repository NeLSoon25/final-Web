import renderer from 'react-test-renderer';
import React from 'react';

import styled from "styled-components";
import { Icono } from "../../../components/atomos/Icono"
import { Colorcontent } from "../../../components/atomos/Colorcontent"
import { IoIosArrowDown } from "react-icons/io";

function ItemsDesplegable({ item, funcion, color }) {
  return (
    <Container onClick={funcion} id="button">
      <Icono>{item.icono}</Icono>
      <Colorcontent $ancho="12px" $alto="12px" $color={item.color}/>
      <span>{item.text}</span>
    </Container>
  );
}

function Selector({ color, state, funcion, texto1, texto2 }) {
  return (
    <Container color={color} onClick={funcion} id="button">
      <div>
        <span>{texto1}</span>
        <span>{texto2}</span>
      </div>
      <span className={state?"open":"close"}>{<IoIosArrowDown/>}</span>
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

describe('selectors testings', function () {
  it('selector test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<Selector state={true} texto1={'a'} texto2={'b'} funcion={pressMe}/>);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });

  it('item test 1', () => {
    let item = '';
    const selectItem = () => (item = 'item1');

    const myObject = {
      "icono": IoIosArrowDown,
      "text": 'hello'
    }

    const component = renderer.create(<ItemsDesplegable funcion={selectItem} item={myObject}/>);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(item).toBe('item1');
  });

  it('item test 2', () => {
    let item = '';
    const selectItem = () => (item = 'item2');

    const myObject = {
      "icono": IoIosArrowDown,
      "text": 'world'
    }

    const component = renderer.create(<ItemsDesplegable funcion={selectItem} item={myObject}/>);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(item).toBe('item2');
  });
});