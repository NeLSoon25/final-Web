import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Spinner,
  useOperaciones,
  Btnsave,
  useUsuariosStore,
  useCategoriasStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import Emojipicker from "emoji-picker-react";

export function RegistrarCategorias({ onClose, dataSelect, accion }) {
  // CRUD functions
  const { insertarCategorias, editarCategoria } = useCategoriasStore();
  // user data
  const { datausuarios } = useUsuariosStore();
  // boolean to show or not emoji palette
  const [showPicker, setShowPicker] = useState(false);
  // emoji selected by user
  const [emojiselect, setEmojiselect] = useState("😻");
  // color selected by user
  const [currentColor, setColor] = useState("#F44336");
  // boolean to show spinner (loading icon) when performing API request.
  const [estadoProceso, setEstadoproceso] = useState(false);
  // enum attribute for current selected movement type (used on database)
  const { tipo } = useOperaciones();
  /**
   * sets emogi selected by user and closes emoji window
   * @param {Object} emojiObject 
   */
  function onEmojiClick(emojiObject) {
    setEmojiselect(() => emojiObject.emoji);
    setShowPicker(false);
  }
  /**
   * sets color selected by user
   * @param {Object} color 
   */
  function elegirColor(color) {
    setColor(color.hex);
  }
  // forms library
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  /**
   * calls Create or Update functions to modify the database
   * @param {Object} data   category object to update or insert into the database
   */
  async function insertar(data) {
    // if edit window was open, UPDATE is performed
    if (accion === "Editar") {
      // category object
      const p = {
        descripcion: data.descripcion,
        color: currentColor,
        icono: emojiselect,
        id: dataSelect.id,
        idusuario:datausuarios.id,
        tipo: tipo,
      };
      try {
        // show loading spinner
        setEstadoproceso(true);
        // perform update
        await editarCategoria(p);
        // hide loading spinner
        setEstadoproceso(false);
        // hide this component
        onClose();
      } catch (error) {}
    // if create window was open, INSERT is performed
    } else {
      // category object
      const p = {
        descripcion: data.descripcion,
        color: currentColor,
        icono: emojiselect,
        idusuario: datausuarios.id,
        tipo: tipo,
      };
      try {
        // show loading spinner
        setEstadoproceso(true);
        // perform insert
        await insertarCategorias(p);
        // hide loading spinner
        setEstadoproceso(false);
        // hide this component
        onClose();
      } catch (error) {
        alert("error ingresar Form");
      }
    }
  }
  // reset form to default values when opens
  useEffect(() => {
    if (accion === "Editar") {
      setEmojiselect(dataSelect.icono);
      setColor(dataSelect.color);
    } 
  }, []);
  return (
    <Container>
      {estadoProceso && <Spinner />}

      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar categoria"
                : "Registrar nueva categoria"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <div>
              <InputText
                defaultValue={dataSelect.descripcion}
                register={register}
                placeholder="Descripcion"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <div className="colorContainer">
              <ContentTitle>
                {<v.paletacolores />}
                <span>Color</span>
              </ContentTitle>
              <div className="colorPickerContent">
                <CirclePicker onChange={elegirColor} color={currentColor} />
              </div>
            </div>
            <div>
              <ContentTitle>
                <input
                readOnly={true}
                  value={emojiselect}
                  type="text"
                  onClick={() => setShowPicker(!showPicker)}
                ></input>
                <span>icono</span>
              </ContentTitle>
              {showPicker && (
                <ContainerEmojiPicker>
                  <Emojipicker onEmojiClick={onEmojiClick} />
                </ContainerEmojiPicker>
              )}
            </div>
            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#DAC1FF"
              />
            </div>
          </section>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;