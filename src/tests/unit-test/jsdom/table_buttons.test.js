import renderer from 'react-test-renderer';
import React from 'react';

import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export function ActionTable({ func, icon, color, fontSize }) {
  return <Container onClick={func} color={color} fontSize={fontSize} id="button">{icon}</Container>;
}
const Container = styled.span`
  color:${(props)=>props.color};
  font-size:${(props)=>props.fontSize};
  cursor: pointer;
`;

describe('table buttons testings', function () {
  it('delete button test', () => {
    let action = '';
    const setAction = () => (action = 'delete');

    const component = renderer.create(<ActionTable icon={IoIosArrowDown} func={setAction}/>);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(action).toBe('delete');
  });

  it('create button test', () => {
    let action = '';
    const setAction = () => (action = 'create');

    const component = renderer.create(<ActionTable icon={IoIosArrowDown} func={setAction}/>);
    const container = component.root.find((el) => el.props.id === 'button');

    container.props.onClick();

    expect(action).toBe('create');
  });
});