import renderer from 'react-test-renderer';
import React from 'react';

import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { Icono } from "../../../components/atomos/Icono"

function BtnCerrar({ func }) {
  return (
    <Container onClick={func} id="button">
      {<RiCloseLine />}
    </Container>
  );
}

function Btnsave({ func, title, bgcolor, icon }) {
  return (
    <Container type="submit" bgcolor={bgcolor}>
      <Icono>{icon}</Icono>
      <span className="btn" onClick={func} id="button">
        {title}
      </span>
    </Container>
  );
}

function Btnfiltro({ bgcolor, textcolor, icon, func }) {
  return (
    <Container $textcolor={textcolor} $bgcolor={bgcolor} onClick={func} id="button">
      <div className="contentIcon">
        <span>{icon}</span>
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

    const component = renderer.create(<BtnCerrar func={pressMe} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });

  it('BtnSave test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<Btnsave func={pressMe} icon={RiCloseLine} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });

  it('BtnSave test', () => {
    let myBool = false;
    const pressMe = () => (myBool = true);

    const component = renderer.create(<Btnfiltro func={pressMe} />);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(myBool).toBe(true);
  });
});
