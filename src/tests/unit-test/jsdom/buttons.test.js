import renderer from 'react-test-renderer';
import React from 'react';

import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { Icono } from "../../../components/atomos/Icono"

function BtnCerrar({ funcion }) {
  return (
    <Container onClick={funcion} id="button">
      {<RiCloseLine />}
    </Container>
  );
}

function Btnsave({ funcion, titulo, bgcolor, icono }) {
  return (
    <Container type="submit" bgcolor={bgcolor}>
      <Icono>{icono}</Icono>
      <span className="btn" onClick={funcion} id="button">
        {titulo}
      </span>
    </Container>
  );
}

function Btnfiltro({ bgcolor, textcolor, icono, funcion }) {
  return (
    <Container $textcolor={textcolor} $bgcolor={bgcolor} onClick={funcion} id="button">
      <div className="contentIcon">
        <span>{icono}</span>
      </div>
    </Container>
  );
}

const Container = styled.span`
  cursor: pointer;
  font-size: 25px;
  transition: all 0.2s;
  &:hover {
    color: #bf94ff;
    transform: scale(1.2);
  }
`;

describe('buttons testing', function () {
  it('BtnCerrar test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<BtnCerrar funcion={pressMe} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });

  it('BtnSave test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<Btnsave funcion={pressMe} icono={RiCloseLine} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });

  it('BtnSave test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<Btnfiltro funcion={pressMe} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });
});
