import { create } from "zustand";
import { ShowMovementsPerMonthYear, InsertMovements, EliminateMovements, RptMovementsPerMonthYear } from "../index";
export const useMovementsStore = create((set, get) => ({
  // stores movement objects fetched from API
  dataMovements: [],
  // 
  dataRptMovementsYearMonth:[],
  // sum of amounts fetched from database
  totalMonthYear: 0,
  // sum of amounts (status paid) from database
  totalMonthYearPaid: 0,
  // sum of amounts (status unpaid) from database
  totalMonthYearUnpaid: 0,
  // stores parameters from las query fetched
  parameters:{},
  /**
   * calls read function to fetch data from database and sets variables data
   * @param {Object} p    object with parameters to build the query
   * @returns Array    an array with the objects fetched from database
   */
  showMovements: async (p) => {
    // call select function
    const response = await ShowMovementsPerMonthYear(p);
    // store las parameters fetched
    set({ parameters: p })
    const { calculateTotals } = get();
    calculateTotals(response);
    set({ dataMovements: response });
    return response;
  },
  /**
   * calculates the total sum from response and set variables values
   * @param {Array} response    array with objects fetched from the database
   */
  calculateTotals: (response) => {
    // sort items based on its status (paid/unpaid)
    const dtPaid = response?.filter((item) => item.state == 1);
    const dtUnpaid = response?.filter((item) => item.state == 0);
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
    dtPaid?.forEach((item) => {
      const array = Object.values(item);
      tpagados += array[2];
    });
    dtUnpaid?.forEach((item) => {
      const array = Object.values(item);
      tpendientes += array[2];
    });
    // set total values on variables
    set({ totalMonthYear: total });
    set({ totalMonthYearPaid: tpagados });
    set({ totalMonthYearUnpaid: tpendientes });
  },
  /**
   * calls crud function to insert a new object into the database
   * @param {Object} p    movement object to insert into the database
   */
  insertMovements: async (p) => {
    // call insert function
    await InsertMovements(p);
    // call fetch function to update data displayed on screen
    const { showMovements } = get();
    const {parameters} = get();
    set(showMovements(parameters));
  },
  /**
   * calls crud function to delete an object from database
   * @param {Object} p    movement object to delete from database
   */
  eliminateMovement: async (p) => {
    // call delete function
    await EliminateMovements(p);
    // call fetch function to update data displayed on screen
    const {parameters} = get();
    const { showMovements } = get();
    set(showMovements(parameters));
  },
  /**
   * calls crud function to get movements grouped by category
   * @param {Object} p    parameters for database query
   * @returns Array    array with user's summary for income/outcome by category
   */
  rptMovementsYearMonth: async (p) => {
    const response = await RptMovementsPerMonthYear(p);
    set({ dataRptMovementsYearMonth: response });
    return response;
  },
}));