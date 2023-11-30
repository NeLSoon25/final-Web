import { useState } from "react";
import styled from "styled-components";
import {
  v,
  Doughnut, Lineal, Barras,
  useMovementsStore,
  useOperaciones,
  useUserStore
} from "../../index";
import { useQuery } from "@tanstack/react-query";
export function Tabs() {
  // variable used to switch between different graphs selected by the user
  const [activeTab, setactiveTab] = useState(0);
  /**
   * sets the selected tab by the user
   * @param {Int} index    tab index to display
   */
  const handleClick = (index) => {
    setactiveTab(index);
  };
  // user data
  const {idUser} = useUserStore();
  // button title, date and type data
  const {year, months, type, titleBtnDesMovements} = useOperaciones();
  // movements data and function to fetch data
  const {dataRptMovementsYearMonth, rptMovementsYearMonth} = useMovementsStore();
  // supported graph colors and styles
  const dataGraph = {
    type: "line",
    labels: dataRptMovementsYearMonth?.map((item) => item.description),
    datasets: [
      {
        fill: true,
        tension: 0.3,
        label: 'Total',
        spacing:10,
        borderRadius:5,
        cutout:30,
        borderAlign:"inner",
        data: dataRptMovementsYearMonth?.map((item) => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  // perform a query to get page data before rendering
  const {isLoading, error} = useQuery({
    queryKey:["reporte movimientos", {
      year: year,
      months: months,
      typecategoria: type,
      idUser: idUser,
    }],
    queryFn: () =>
      rptMovementsYearMonth({
        year: year,
        months: months,
        typecategoria: type,
        idUser: idUser,
    })
  });
  // display a monthssage if component is loading
  if (isLoading) {
    return <h1>cargando</h1>;
  }
  // display a error if component failed to load
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <Container className="container" activeTab={`${activeTab}00%`}>
      <ul className="tabs">
        <li
          className={activeTab == 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          {<v.iconpie />}
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          {<v.iconlineal />}
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          {<v.iconbars />}
        </li>
        <span className="glider"></span>
      </ul>

      <div className="tab-content">
        {activeTab === 0 && <Doughnut dataGraph={dataGraph} data={dataRptMovementsYearMonth} title={titleBtnDesMovements}/>}
        {activeTab === 1 && <Lineal dataGraph={dataGraph} data={dataRptMovementsYearMonth} title={titleBtnDesMovements}/>}
        {activeTab === 2 && <Barras dataGraph={dataGraph} data={dataRptMovementsYearMonth} title={titleBtnDesMovements}/>}
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  height: 100%;
  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.bg};
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    * {
      z-index: 2;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in;
    }
    .glider {
      position: absolute;
      color: "#fff";
      display: flex;
      height: 54px;
      width: 150px;
      background-color: ${(props) => props.theme.carouselColor};
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-out;
      transform: translateX(${(props) => props.activeTab});
      box-shadow: 0px 10px 20px -3px ${(props) => props.theme.carouselColor};
    }
  }

  .tab-content {
    position: relative;
    /* border: 1px solid red; */
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;