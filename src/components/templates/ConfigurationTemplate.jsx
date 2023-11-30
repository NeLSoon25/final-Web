import styled from "styled-components";
import {
  Header,
  Selector,
  v,
  ListCountries,
  useUserStore,
  ListGenerica,
  ThemonthsData,
  Btnsave,
  CardEliminateData
} from "../../index";
import { useState } from "react";

export function ConfigurationTemplate() {
  // user data and currency updater function
  const { dataUsers, editThemeCurrencyUser } = useUserStore();
  // stores selected currency by the user
  const [select, setSelect] = useState([]);
  // stores selected theme by the user
  const [selectTheme, setSelectTheme] = useState([]);
  // bool variable used to hide/show user options
  const [state, setState] = useState(false);
  // bool variable to show/hide country currency search window
  const [stateListCountries, setStateListCountries] = useState(false);
  // bool variable to show/hide theme configuration options
  const [stateListThemonths, setStateListThemonths] = useState(false);
  // selected currency values for user or the ones he has stored on the database
  const currency = select.symbol ? select.symbol : dataUsers.currency;
  const country = select.countryName ? select.countryName : dataUsers.country;
  const countrySelected = currency + " " + country;
  // selected theme options or theme stored at database
  const iconbd = dataUsers.theme === "0" ? "🌞" : "🌚";
  const themedb = dataUsers.theme === "0" ? "light" : "dark";
  const themeInitial = selectTheme.description ? selectTheme.description : themedb;
  const iconInitial = selectTheme.icon ? selectTheme.icon : iconbd;
  const themeSelected = iconInitial + " " + themeInitial;
  /**
   * calls update function to the database
   */
  const edit = async () => {
    // constroy object to submit to database
    const themeElegido = selectTheme.description === "light" ? "0" : "1";
    const p = {
      theme: themeElegido,
      currency: currency,
      country: country,
      id: dataUsers.id,
    };
    // call update function
    await editThemeCurrencyUser(p);
  };
  //! solve select issues
  /**
   * shows/hides user options
   */
  function openUser() {
    // switch user options bool variable
    setState(!state);
    // hide other select options
    setStateListCountries(false);
    setStateListThemonths(false);
  }
  /**
   * shows/hides currency options
   */
  function openCurrency() {
    // switch currency options bool variable
    setStateListCountries(!stateListCountries);
    // hide other select options
    setState(false);
    setStateListThemonths(false);
  }
  /**
   * shows/hides theme options
   */
  function openTheme() {
    // switch theme options bool variable
    setStateListThemonths(!stateListThemonths);
    // hide other select options
    setStateListCountries(false);
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
            state={ stateListCountries }
            color={ v.colorselector }
            texto1={ countrySelected }
            func={ openCurrency }
          />
          {stateListCountries && (
            <ListCountries
              setSelect={ (p) => setSelect(p) }
              setState={ openCurrency }
            />
          )}
        </ContentCard>
        <ContentCard>
          <span>Theme:</span>
          <Selector
            texto1={ themeSelected }
            color={ v.colorselector }
            state={ stateListThemonths }
            func={ openTheme }
          ></Selector>
          {stateListThemonths && (
            <ListGenerica bottom="88%"
              data={ ThemonthsData }
              setState={ openTheme }
              func={ setSelectTheme }
            />
          )}
        </ContentCard>
        <Btnsave
          title="Guardar"
          bgcolor={ v.colorselector }
          icon={ <v.iconsave /> }
          func={ edit }
        />
        <CardEliminateData/>
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