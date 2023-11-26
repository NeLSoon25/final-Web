import renderer from 'react-test-renderer';
import React from 'react';

import styled from "styled-components";

function InputBuscadorLista({ onChange, placeholder }) {
  return (<Container>
<input onChange={onChange} placeholder={placeholder} type="text"></input>
  </Container>);
}

function InputNumber({
  style,
  onChange,
  defaultValue,
  placeholder,
  register,
  errors,
  icono
}) {
  return (
    <Container>
      <ContainerTextoicono>
        <span>{icono}</span>
        <input
          step="0.01"
          style={style}
          onChange={onChange}
          type="number"
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register("monto", { required: true, Number: true })}
        />
      </ContainerTextoicono>
      {errors.valor?.type === "required" && (
        <p>Campo requerido</p>
      )}
      {errors.valor?.type === "Number" && (
        <p>Ingrese un número valido</p>
      )}
    </Container>
  );
}

function InputText({
  style,
  onChange,
  defaultValue,
  placeholder,
  register,
  errors,
}) {
  return (
    <Container>
      <input
      style={style}
      onChange={onChange}
      type="text"
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register("descripcion", { required: true, minLength: 2 })}
      />
      {errors.descripcion?.type === "required" && (
        <p>Campo requerido</p>
      )}
      {errors.descripcion?.type === "minLength" && (
      <p>Debe tener al menos 2 caracteres</p>
      )}
    </Container>
  );
}

const Container =styled.div`
  position: relative;
  input{
    background: ${({ theme }) => theme.body};
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: solid 1px grey;
    color: ${({ theme }) => theme.text};
    outline: none;
    
    &:focus {
      border-bottom: none;
    }
    &::placeholder {
      color: #c8c8c8;
    }
  }
`

const ContainerTextoicono=styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  text-align:center;
`

describe('inputs testing', function () {
  it('InputBuscadorLista', () => {
    let myString = '';
    const input = (value) => {
      myString = value;
    };

    const component = renderer.create(<InputBuscadorLista onChange={input} />);
    const inputElement = component.root.findByType('input');

    inputElement.props.onChange('test');

    expect(myString).toBe('test');
  })

  it('InputNumber', () => {
    let myNumber = 0;
    const input = (value) => {
      myNumber = Number(value);
    };
    const register = () => {};
    const myObject = {
      "description": "hello"
    }

    const component = renderer.create(<InputNumber onChange={input} register={register} errors={myObject} />);
    const inputElement = component.root.findByType('input');

    inputElement.props.onChange('123');

    expect(myNumber).toBe(123);
  })

  it('InputText', () => {
    let myString = '';
    const input = (value) => {
      myString = value;
    };
    const myFun = (a, b, c) => {}
    const myObject = {
      "description": "hello"
    }

    const component = renderer.create(<InputText onChange={input} register={myFun} errors={myObject}/>);
    const inputElement = component.root.findByType('input');

    inputElement.props.onChange('test');

    expect(myString).toBe('test');
  })
});