import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Spinner,
  useOperaciones,
  Btnsave,
  useUserStore,
  useCategoriesStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import Emojipicker from "emoji-picker-react";

export function RegisterCategories({ onClose, dataSelect, action }) {
  // CRUD functions
  const { insertCategories, editCategory } = useCategoriesStore();
  // user data
  const { dataUsers } = useUserStore();
  // boolean to show or not emoji palette
  const [showPicker, setShowPicker] = useState(false);
  // emoji selected by user
  const [emojiselect, setEmojiselect] = useState("😻");
  // color selected by user
  const [currentColor, setColor] = useState("#F44336");
  // boolean to show spinner (loading icon) when performing API request.
  const [processState, setProcessState] = useState(false);
  // enum attribute for current selected movement type (used on database)
  const { type } = useOperaciones();
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
  async function insert(data) {
    // if edit window was open, UPDATE is performed
    if (action === "Edit") {
      // category object
      const p = {
        description: data.description,
        color: currentColor,
        icon: emojiselect,
        id: dataSelect.id,
        idUser:dataUsers.id,
        type: type,
      };
      try {
        // show loading spinner
        setProcessState(true);
        // perform update
        await editCategory(p);
        // hide loading spinner
        setProcessState(false);
        // hide this component
        onClose();
      } catch (error) {}
    // if create window was open, INSERT is performed
    } else {
      // category object
      const p = {
        description: data.description,
        color: currentColor,
        icon: emojiselect,
        idUser: dataUsers.id,
        type: type,
      };
      try {
        // show loading spinner
        setProcessState(true);
        // perform insert
        await insertCategories(p);
        // hide loading spinner
        setProcessState(false);
        // hide this component
        onClose();
      } catch (error) {
        alert("error ingresar Form");
      }
    }
  }
  // reset form to default values when opens
  useEffect(() => {
    if (action === "Edit") {
      setEmojiselect(dataSelect.icon);
      setColor(dataSelect.color);
    } 
  }, []);
  return (
    <Container>
      {processState && <Spinner />}

      <div className="sub-container">
        <div className="headers">
          <section>
            <h1>
              {action == "Edit"
                ? "Editar categoria"
                : "Registrar nueva categoria"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="forms" onSubmit={handleSubmit(insert)}>
          <section>
            <div>
              <InputText
                defaultValue={dataSelect.description}
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
                <span>icon</span>
              </ContentTitle>
              {showPicker && (
                <ContainerEmojiPicker>
                  <Emojipicker onEmojiClick={onEmojiClick} />
                </ContainerEmojiPicker>
              )}
            </div>
            <div className="btn-save-content">
              <Btnsave
                icon={<v.iconsave />}
                title="Guardar"
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

  .sub-container {
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
    .forms {
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