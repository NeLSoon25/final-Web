import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Switch } from "@mui/material";
import {
  useMovementsStore,
  useCategoriesStore,
  useOperaciones,
  ListGenerica,
  Selector,
  InputNumber,
  InputText,
  useAccountStore,
  v,
  Btnsave,
  useUserStore //! unused import
} from "../../../index";
import { useEffect } from "react"; //! unused import
export function RegisterMovements({ setState, state, dataSelect, action }) { //! unused variables
  // user current account data
  const { accountItemSelect } = useAccountStore();
  // category data and item setter
  const { dataCategories, categoryItemSelect, selectCategory } = useCategoriesStore();
  // category type
  const { type } = useOperaciones();
  // API insert request function
  const { insertMovements } = useMovementsStore();

  // bool variable to determine if movements have been paid or not
  const [state, setState] = useState(true);
  //! unused variable
  const [ignorar, setIgnorar] = useState(false);
  // bool variable to hide/show type select options (income or outcome)
  const [stateCategories, setStateCategories] = useState(false);
  // forms library
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  /**
   * calls create function to instert data into the database
   * @param {Object} data   inputted form data
   */
  const insert = async (data) => {
    // set movement status variable (paid or unpaid)
    let stateText = 0;
    if (state) {
      stateText = 1;
    }
    // object to insert on the database
    const p = {
      type: type,
      state: stateText,
      date: data.date,
      description: data.description,
      idaccount: accountItemSelect.id,
      valor: parseFloat(data.amount),
      idcategoria: categoryItemSelect.id,
    };
    // call insert function
    try {
      await insertMovements(p);
      setState();
    } catch (err) {
      alert(err);
    }
  };
  /**
   * updates paid/unpaid option selected by user through a switch (checkbox)
   * @param {Event} e    event triggered when switch element is pressed
   */
  function stateControl(e) {
    setState(e.target.checked);
  }

  return (
    <Container onClick={setState}>
      <div
        className="sub-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">
          <div>
            <h1>New {type == "i" ? "ingreso" : "gasto"}</h1>
          </div>
          <div>
            <span onClick={setState}>{<v.iconclose />}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(insert)} className="forms">
          <section>
            <div>
              <label>Monto:</label>
              <div>
                <InputNumber
                  defaultValue={dataSelect.valor}
                  register={register}
                  placeholder="Ingrese monto"
                  errors={errors}
                  icon={<v.iconcalculator />}
                />
              </div>
            </div>
            <ContainerFuepagado>
              <span>{<v.iconcheck />}</span>
              <label>Fue pagado:</label>
              <Switch
                onChange={stateControl}
                checked={state}
                color="warning"
              />
            </ContainerFuepagado>
            <ContainerDate>
              <label>Date:</label>

              <input
                type="date"
                {...register("date", { required: true })}
              ></input>
              {errors.date?.type === "required" && (
                <p>El campo es requerido</p>
              )}
            </ContainerDate>
            <div>
              <label>Descripción:</label>
              <InputText
                defaultValue={dataSelect.description}
                register={register}
                placeholder="Ingrese una descripcion"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <ContainerCategoria>
              <label>Categoria: </label>
              <Selector
                color="#e14e19"
                texto1={categoryItemSelect?.icon}
                texto2={categoryItemSelect?.description}
                func={() => setStateCategories(!stateCategories)}
              />
            </ContainerCategoria>
          </section>
          {stateCategories && (
            <ListGenerica
              bottom="88%"
              scroll="scroll"
              setState={() => setStateCategories(!stateCategories)}
              data={dataCategories}
              func={selectCategory}
            />
          )}

          <div className="contentBtnsave">
            <Btnsave
              title="Guardar"
              bgcolor="#DAC1FF"
              icon={<v.iconsave />}
              className="btnsave"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  color: black;

  .sub-container {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
    label {
      font-weight: 550;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 30px;
        font-weight: 700;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .forms {
      .contentBtnsave {
        padding-top: 20px;
        display: flex;
        justify-content: center;
      }
      section {
        padding-top: 20px;
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
  @keyframonths scale-up-bottom {
    0% {
      transform: scale(0.5);
      transform-origin: center bottom;
    }
    100% {
      transform: scale(1);
      transform-origin: center bottom;
    }
  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  width: 50%;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => props.color};
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.color};
  }
`;
const ContainerFuepagado = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ContainerCategoria = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ContainerDate = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  input {
    appearance: none;
    color: ${({ theme }) => theme.text};
    font-family: “Helvetica”, arial, sans-serif;
    font-size: 17px;
    border: none;
    background: ${({ theme }) => theme.bgtotal};
    padding: 4px;
    display: inline-block;
    visibility: visible;
    width: 140px;
    cursor: pointer;
    &:focus {
      border-radius: 10px;

      outline: 0;
      /* box-shadow: 0 0 5px 0.4rem rgba(252, 252, 252, 0.25); */
    }
  }
`;