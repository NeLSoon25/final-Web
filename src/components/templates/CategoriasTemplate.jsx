import styled from "styled-components";
import {
  Header,
  ContentFiltros,
  Btndesplegable,
  useOperaciones,
  ListaMenuDesplegable,
  DataDesplegableTipo,
  Btnfiltro,
  v,
  TablaCategorias,
  RegistrarCategorias,
  Lottieanimacion,
} from "../../index";
import { useState } from "react";
import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";
export function CategoriasTemplate({ data }) {
  // bool variable to show/hide create category window
  const [openRegistro, SetopenRegistro] = useState(false);
  // variable used to determine user's action (insert or update)
  const [accion, setAccion] = useState("");
  // stores last category selected by the user
  const [dataSelect, setdataSelect] = useState([]);
  // bool variable to show/hide user options
  const [state, setState] = useState(false);
  // bool variable to show/hide type category options (income, outcome)
  const [stateTipo, setStateTipo] = useState(false);
  // style values and setters
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } = useOperaciones();
  /**
   * sets a new type and updates values
   * @param {String} p    Type selected
   */
  function cambiarTipo(p) {
    // set new type
    setTipo(p);
    // hide type select option
    setStateTipo(!stateTipo);
    // hide user 
    setState(false);
  }
  /**
   * hides all select options on the screen
   */
  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }
  /**
   * shows/hides category type options
   */
  function openTipo() {
    // switch category type bool variable
    setStateTipo(!stateTipo);
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
    setStateTipo(false);
  }
  /**
   * shows new category window
   */
  function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  }
  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="tipo">
        <ContentFiltros>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Btndesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDes}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableTipo}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
      </section>
      <section className="area2">
        <ContentFiltro>
          <Btnfiltro
            funcion={nuevoRegistro}
            bgcolor={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="main">
        {data.length == 0 && (
          <Lottieanimacion
            alto="300"
            ancho="300"
            animacion={tipo == "i" ? vacioverde : vaciorojo}
          />
        )}

        <TablaCategorias
          data={data}
          SetopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
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
    "tipo" 100px
    "area2" 50px
    "main" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .tipo {
    grid-area: tipo;
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