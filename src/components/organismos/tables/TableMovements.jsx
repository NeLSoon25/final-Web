import styled from "styled-components";
import {
  ContentActionsTable,
  useCategoriesStore, //! unused import
  Pagination,
  useMovementsStore,
} from "../../../index";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { useState } from "react";
export function TableMovements({
  data,
  SetopenRegister,
  setdataSelect,
  setAction,
}) {
  // you cannot create a table if there is no data.
  if (data == null) {
    return;
  }
  // current user page
  const [page, setPage] = useState(1);
  // max elements per page
  const [perPage, setPerPage] = useState(10);
  // calculate maximum pages
  //! there is an error to pagination logic here
  // const mx = data.length / porPagina;
  // const maximo = mx < 1 ? 1 : mx;
  const maximum = Math.floor((data.length + 9) / perPage);

  // api delete function
  const { eliminateMovement } = useMovementsStore();
  /**
   * opens a Swal panel and performs a delete query if yes is pressed
   * @param {Object} p    movement object to delete from the database
   */
  function eliminate(p) {
    // open Swal panel
    Swal.fire({
      title: "¿Estás seguro(a)(e)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminate",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete object from database if yes is selected
        await eliminateMovement({ id: p.id });
      }
    });
  }
  //! data.slice was not implemented and pagination was failing
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Situacion</th>
              <th scope="col">Date</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Categoria</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Valor</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(
                (page - 1) * perPage,
                (page - 1) * perPage + perPage
              )
              .map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">
                    <Situacion
                      bgcolor={item.state == "1" ? "#69e673" : "#b3b3b3"}
                    ></Situacion>
                  </th>
                  <td  data-title="Date" >{item.date}</td>
                  <td data-title="Description" >
                    {item.description}
                  </td>
                  <td data-title="Category" >{item.categoria}</td>
                  <td data-title="Account">{item.account}</td>
                  <td data-title="Amount">{item.valorycurrency}</td>
                  <td data-title="Actions" >
                    <ContentActionsTable
                      funcEliminate={() => eliminate(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        { maximum !== 0 && <Pagination pagina={page} setPagina={setPage} maximo={maximum} /> }
      </Container>
    </>
  );
  //? why do we have an edit button if there is no update option on CRUD
  //! add bool to show pagination if there are pages
}
const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    max-width: ${v.bphomer};
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(151, 151, 151, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .Colordiv {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
        
      }
      td[data-type="currency"] {
        font-weight:600;
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  display: block;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  text-align: center;
`;
const Situacion = styled.div`
  display: flex;
  justify-content: center;
  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bgcolor};
  }
`;