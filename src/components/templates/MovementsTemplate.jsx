import styled from "styled-components";
import {
  Header,
  CalendarLineal,
  CardTotals,
  useOperaciones,
  v,
  useMovementsStore,
  useUserStore,
  TableMovements,
  useAccountStore,
  useCategoriesStore,
  DataDropdownMovements,
  ContentFilters,
  Btndesplegable,
  ListMenuDesplegable,
  Btnfiltro,
  RegistrarMovements,
} from "../../index";
import { Device } from "../../styles/breakpoints";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
export function MovementsTemplate() {
  // stores data displayed on edit/create new movement window
  const [dataSelect, setdataSelect] = useState([]);
  //! determines user action (create or update)
  //? unused variable we don't even have an update function and create is not using it
  const [action, setAction] = useState("");
  // bool variable to show/hide edit/create new movement window
  const [openRegister, SetopenRegister] = useState(false);
  // date used to sort data
  const [value, setValue] = useState(dayjs(Date.now()));
  //! unused variable
  const [formatoDate, setFormatoDate] = useState("");
  // bool variable to show/hide user options
  const [state, setState] = useState(false);
  // bool variable to show/hide category type options
  const [stateType, setStateType] = useState(false);
  // styles, query data and setters
  const {
    setTypeMovements,
    type,
    colorCategory,
    year,
    months,
    bgCategory,
    titleBtnDes, //! unused import
    titleBtnDesMovements,
  } = useOperaciones();
  // user database id
  const { idUser } = useUserStore();
  // total sums, fetch data function and movements data
  const {
    totalMonthYear,
    totalMonthYearPaid,
    totalMonthYearUnpaid,
    showMovements,
    dataMovements,
  } = useMovementsStore();
  const { showAccounts } = useAccountStore();
  const { showCategories } = useCategoriesStore();
  /**
   * shows category type options
   */
  function openType() {
    setStateType(!stateType);
    setState(false);
  }
  /**
   * changes category type selected by user
   * @param {Object} p    category type object
   */
  function changeType(p) {
    // category type setter
    setTypeMovements(p);
    // close category type options
    //? we can set directly to false
    setStateType(!stateType);
    // close user options
    setState(false);
  }
  /**
   * open create movement window
   */
  function newRegister() {
    // open window
    SetopenRegister(!openRegister);
    // set action to create
    setAction("New");
    // empty selected object data
    setdataSelect([]);
  }
  //! this function is needed to solve bugs with select button
  /**
   * shows/hides user options
   */
  function openUser() {
    // switch user options bool variable
    setState(!state);
    // hide category type
    setStateType(false);
  }
  // fetch necessary data for page before rendering
  useQuery({
    queryKey: [
      "show movimientos months year",
      { year: year, months: months, idUser: idUser, typecategoria: type },
    ],
    queryFn: () =>
      showMovements({
        year: year,
        months: months,
        idUser: idUser,
        typecategoria: type,
      }), refetchOnWindowFocus: false,
  });
  useQuery({
    queryKey: ["show accounts"],
    queryFn: () => showAccounts({ idUser: idUser })
  });
  useQuery({
    queryKey: [
      "show categorias",
      { idUser: idUser, type: type }
    ],
    queryFn: () =>
    showCategories({ idUser: idUser, type: type })
  });

  return (
    <Container>
      {openRegister && (
        <RegistrarMovements
          dataSelect = {dataSelect}
          state = {openRegister}
          setState = {() => SetopenRegister(!openRegister)}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: openUser }}
        />
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
              text={titleBtnDesMovements}
              func={openType}
            />
            {stateType && (
              <ListMenuDesplegable
                data={DataDropdownMovements}
                top="112%"
                func={(p) => changeType(p)}
              />
            )}
          </div>
        </ContentFilters>
        <ContentFiltro>
          <Btnfiltro
            func={newRegister}
            bgcolor={bgCategory}
            textcolor={colorCategory}
            icon={<v.add />}
          />
        </ContentFiltro>
      </section>
      <section className="totales">
        <CardTotals
          total={totalMonthYearUnpaid}
          title={type == "g" ? "Outcome pendientes" : "Income pendientes"}
          color={colorCategory}
          icon={<v.uparrowlarge />}
        />
        <CardTotals
          total={totalMonthYearPaid}
          title={type == "g" ? "Outcome pagados" : "Income pagados"}
          color={colorCategory}
          icon={<v.downarrowlarge />}
        />
        <CardTotals
          total={totalMonthYear}
          title="Total"
          color={colorCategory}
          icon={<v.balance />}
        />
      </section>
      <section className="calendar">
        <CalendarLineal
          value={value}
          setValue={setValue}
          formatodate={formatoDate}
          setFormatoDate={setFormatoDate}
        />
      </section>
      <section className="main">
        <TableMovements
          data={dataMovements}
          SetopenRegister={SetopenRegister}
          setdataSelect={setdataSelect}
          setAction={setAction}
        />
      </section>
    </Container>
  );
  //! <TableMovements/> has missing parameters, probably that was monthssing up with edit button
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
    "totales" 360px
    "calendar" 100px
    "main" auto;
    @media ${Device.tablet} {
      grid-template:
    "header" 100px
    "type" 100px
    "totales" 100px
    "calendar" 100px
    "main" auto;
    }

  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .type {
    grid-area: type;
    /* background-color: rgba(107, 214, 14, 0.14); */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .totales {
    grid-area: totales;
  //  background-color: rgba(229, 26, 165, 0.14);
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .calendar {
    grid-area: calendar;
   // background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main {
    grid-area: main;
   // background-color: rgba(179, 46, 241, 0.14);
  }
`;
const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;