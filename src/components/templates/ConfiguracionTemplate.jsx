import styled from "styled-components";
import {
  Header,
  Selector,
  v,
  ListaPaises,
  useUsuariosStore,
  ListaGenerica,
  TemasData,
  Btnsave,
  CardEliminarData
} from "../../index";
import { useState } from "react";

export function ConfiguracionTemplate() {
  // user data and currency updater function
  const { datausuarios, editartemamonedauser } = useUsuariosStore();
  // stores selected currency by the user
  const [select, setSelect] = useState([]);
  // stores selected theme by the user
  const [selectTema, setSelecttema] = useState([]);
  // bool variable used to hide/show user options
  const [state, setState] = useState(false);
  // bool variable to show/hide country currency search window
  const [stateListaPaises, setStateListaPaises] = useState(false);
  // bool variable to show/hide theme configuration options
  const [stateListaTemas, setStateListaTemas] = useState(false);
  // selected currency values for user or the ones he has stored on the database
  const moneda = select.symbol ? select.symbol : datausuarios.moneda;
  const pais = select.countryName ? select.countryName : datausuarios.pais;
  const paisSeleccionado = moneda + " " + pais;
  // selected theme options or theme stored at database
  const iconobd = datausuarios.tema === "0" ? "🌞" : "🌚";
  const temadb = datausuarios.tema === "0" ? "light" : "dark";
  const temainicial = selectTema.descripcion ? selectTema.descripcion : temadb;
  const iconoinicial = selectTema.icono ? selectTema.icono : iconobd;
  const temaSeleccionado = iconoinicial + " " + temainicial;
  /**
   * calls update function to the database
   */
  const editar = async () => {
    // constroy object to submit to database
    const themeElegido = selectTema.descripcion === "light" ? "0" : "1";
    const p = {
      tema: themeElegido,
      moneda: moneda,
      pais: pais,
      id: datausuarios.id,
    };
    // call update function
    await editartemamonedauser(p);
  };
  //! solve select issues
  /**
   * shows/hides user options
   */
  function openUser() {
    // switch user options bool variable
    setState(!state);
    // hide other select options
    setStateListaPaises(false);
    setStateListaTemas(false);
  }
  /**
   * shows/hides currency options
   */
  function openCurrency() {
    // switch currency options bool variable
    setStateListaPaises(!stateListaPaises);
    // hide other select options
    setState(false);
    setStateListaTemas(false);
  }
  /**
   * shows/hides theme options
   */
  function openTheme() {
    // switch theme options bool variable
    setStateListaTemas(!stateListaTemas);
    // hide other select options
    setStateListaPaises(false);
    setState(false);
  }
  return (
    <Container>
    
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: openUser }}
        />
      </header>

      <section className="area2">
        <h1>AJUSTES</h1>
        <ContentCard>
          <span>Moneda:</span>
          <Selector
            state={ stateListaPaises }
            color={ v.colorselector }
            texto1={ paisSeleccionado }
            funcion={ openCurrency }
          />
          {stateListaPaises && (
            <ListaPaises
              setSelect={ (p) => setSelect(p) }
              setState={ openCurrency }
            />
          )}
        </ContentCard>
        <ContentCard>
          <span>Tema:</span>
          <Selector
            texto1={ temaSeleccionado }
            color={ v.colorselector }
            state={ stateListaTemas }
            funcion={ openTheme }
          ></Selector>
          {stateListaTemas && (
            <ListaGenerica bottom="88%"
              data={ TemasData }
              setState={ openTheme }
              funcion={ setSelecttema }
            />
          )}
        </ContentCard>
        <Btnsave
          titulo="Guardar"
          bgcolor={ v.colorselector }
          icono={ <v.iconoguardar /> }
          funcion={ editar }
        />
        <CardEliminarData/>
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
    "area2" auto;

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(77, 237, 106, 0.14); */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: start;
    gap: 30px;
  
    h1 {
      font-size: 3rem;
    }
  }
`;
const ContentCard = styled.div`
  display: flex;
  text-align: start;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
  justify-content: center;
`;