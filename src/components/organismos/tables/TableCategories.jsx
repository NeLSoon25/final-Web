import styled from "styled-components";
import {
  ContentActionesTable,
  useCategoriesStore,
  Paginacion,
} from "../../../index";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { useState } from "react";
export function TableCategories({
  data,
  setOpenRegister,
  setDataSelect,
  setAction,
}) {
  // it can't be a table if there is no data to display
  if(data.length == 0) return;
  // stores current page selected by user
  const [page, setPage] = useState(1);
  // stores max elements to display per page
  const [perPage, setPerPage] = useState(10);
  // calculate total pages
  //! there is an error to pagination logic here
  // const mx = data.length / porPagina;
  // const maximo = mx < 1 ? 1 : mx;
  const maximum = Math.floor((data.length + 9) / perPage);

  // delete api function
  const { eliminateCategory } = useCategoriesStore();
  /**
   * displays a Swal panel that performs a delete query if yes is answered
   * @param {Object} p    category object to eliminate from database
   */
  function eliminate(p) {
    // display alert panel
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
        // call delete query if yes is pressed
        await eliminateCategory({ id: p.id, idUser: p.idUser });
      }
    });
  }
  /**
   * set variables to open update window
   * @param {Object} data 
   */
  function edit(data) {
    // show update window
    setOpenRegister(true);
    // set old data
    setDataSelect(data);
    // set action to edit
    setAction("Edit");
  }
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Descripcion</th>
              <th scope="col">Icono</th>
              <th scope="col">Color</th>
              <th scope="col">Actiones</th>
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
                    <th scope="row">{item.description}</th>
                    <td data-title="Icon">{item.icon}</td>
                    <td data-title="Color" className="Colordiv">
                      <div className="ColorContent">
                        <Colorcontent
                          color={item.color}
                          $height="25px"
                          $width="25px"
                        />
                      </div>
                    </td>
                    <td data-title="Actions">
                      <ContentActionesTable
                        funcEdit={() => edit(item)}
                        funcEliminate={() => eliminate(item)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {maximum !== 0 && <Paginacion pagina={page} setPagina={setPage} maximo={maximum} />}
      </Container>
    </>
  );
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