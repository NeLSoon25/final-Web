import { create } from "zustand";
import { MostrarMovimientosPorMesAño,InsertarMovimientos,EliminarMovimientos,RptMovimientosPorMesAño } from "../index";
export const useMovimientosStore = create((set, get) => ({
  // stores movement objects fetched from API
  datamovimientos: [],
  // 
  dataRptMovimientosAñoMes:[],
  // sum of amounts fetched from database
  totalMesAño: 0,
  // sum of amounts (status paid) from database
  totalMesAñoPagados: 0,
  // sum of amounts (status unpaid) from database
  totalMesAñoPendientes: 0,
  // stores parameters from las query fetched
  parametros:{},
  /**
   * calls read function to fetch data from database and sets variables data
   * @param {Object} p    object with parameters to build the query
   * @returns Array    an array with the objects fetched from database
   */
  mostrarMovimientos: async (p) => {
    // call select function
    const response = await MostrarMovimientosPorMesAño(p);
    // store las parameters fetched
    set({ parametros: p })
    const { calcularTotales } = get();
    calcularTotales(response);
    set({ datamovimientos: response });
    return response;
  },
  /**
   * calculates the total sum from response and set variables values
   * @param {Array} response    array with objects fetched from the database
   */
  calcularTotales: (response) => {
    // sort items based on its status (paid/unpaid)
    const dtPagados = response?.filter((item) => item.estado == 1);
    const dtPendientes = response?.filter((item) => item.estado == 0);
    // declare total variables
    let total = 0;
    let tpagados = 0;
    let tpendientes = 0;
    // iterate over the arrays and sum its amounts
    //? we may use one foreach instead of 3.
    response?.forEach((item) => {
      const array = Object.values(item);
      total += array[2];
    });
    dtPagados?.forEach((item) => {
      const array = Object.values(item);
      tpagados += array[2];
    });
    dtPendientes?.forEach((item) => {
      const array = Object.values(item);
      tpendientes += array[2];
    });
    // set total values on variables
    set({ totalMesAño: total });
    set({ totalMesAñoPagados: tpagados });
    set({ totalMesAñoPendientes: tpendientes });
  },
  /**
   * calls crud function to insert a new object into the database
   * @param {Object} p    movement object to insert into the database
   */
  insertarMovimientos: async (p) => {
    // call insert function
    await InsertarMovimientos(p);
    // call fetch function to update data displayed on screen
    const { mostrarMovimientos } = get();
    const {parametros} = get();
    set(mostrarMovimientos(parametros));
  },
  /**
   * calls crud function to delete an object from database
   * @param {Object} p    movement object to delete from database
   */
  eliminarMovimiento: async (p) => {
    // call delete function
    await EliminarMovimientos(p);
    // call fetch function to update data displayed on screen
    const {parametros} = get();
    const { mostrarMovimientos } = get();
    set(mostrarMovimientos(parametros));
  },
  /**
   * calls crud function to get movements grouped by category
   * @param {Object} p    parameters for database query
   * @returns Array    array with user's summary for income/outcome by category
   */
  rptMovimientosAñoMes: async (p) => {
    const response = await RptMovimientosPorMesAño(p);
    set({ dataRptMovimientosAñoMes: response });
    return response;
  },
}));