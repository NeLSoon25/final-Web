import styled from "styled-components";
import {
  Header,
  ContentFilters,
  Btndesplegable,
  useOperaciones,
  ListMenuDesplegable,
  DataDesplegableType,
  Btnfiltro,
  v,
  TableCategories,
  RegistrarCategories,
  Lottieanimation,
} from "../../index";
import { useState } from "react";
import vaciogreen from "../../assets/greenvoid.json";
import vaciored from "../../assets/redvoid.json";
export function CategoriesTemplate({ data }) {
  // bool variable to show/hide create category window
  const [openRegister, SetopenRegister] = useState(false);
  // variable used to determine user's action (insert or update)
  const [action, setAction] = useState("");
  // stores last category selected by the user
  const [dataSelect, setdataSelect] = useState([]);
  // bool variable to show/hide user options
  const [state, setState] = useState(false);
  // bool variable to show/hide type category options (income, outcome)
  const [stateType, setStateType] = useState(false);
  // style values and setters
  const { colorCategory, titleBtnDes, bgCategory, setType, type } = useOperaciones();
  /**
   * sets a new type and updates values
   * @param {String} p    Type selected
   */
  function changeType(p) {
    // set new type
    setType(p);
    // hide type select option
    setStateType(!stateType);
    // hide user 
    setState(false);
  }
  /**
   * hides all select options on the screen
   */
  function closeDropdown() {
    setStateType(false);
    setState(false);
  }
  /**
   * shows/hides category type options
   */
  function openType() {
    // switch category type bool variable
    setStateType(!stateType);
    // hide user options
    setState(false);
  }
  /**
   * shows/hides user options
   */
  function openUser() {
    // switch user options bool variable
    setState(!state);
    // hide category type
    setStateType(false);
  }
  /**
   * shows new category window
   */
  function newRegister() {
    SetopenRegister(!openRegister);
    setAction("New");
    setdataSelect([]);
  }
  return (
    <Container onClick={closeDropdown}>
      {openRegister && (
        <RegistrarCategories
          dataSelect={dataSelect}
          onClose={() => SetopenRegister(!openRegister)}
          action={action}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="type">
        <ContentFilters>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Btndesplegable
              textcolor={colorCategory}
              bgcolor={bgCategory}
              text={titleBtnDes}
              func={openType}
            />
            {stateType && (
              <ListMenuDesplegable
                data={DataDesplegableType}
                top="112%"
                func={(p) => changeType(p)}
              />
            )}
          </div>
        </ContentFilters>
      </section>
      <section className="area2">
        <ContentFiltro>
          <Btnfiltro
            func={newRegister}
            bgcolor={bgCategory}
            textcolor={colorCategory}
            icon={<v.add />}
          />
        </ContentFiltro>
      </section>
      <section className="main">
        {data.length == 0 && (
          <Lottieanimation
            height="300"
            width="300"
            animation={type == "i" ? vaciogreen : vaciored}
          />
        )}

        <TableCategories
          data={data}
          SetopenRegister={SetopenRegister}
          setdataSelect={setdataSelect}
          setAction={setAction}
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "type" 100px
    "area2" 50px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .type {
    grid-area: type;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;