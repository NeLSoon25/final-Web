import { create } from "zustand";
import { MostrarCuentas } from "../index";
export const useCuentaStore = create((set, get) => ({
  // User current account data
  cuentaItemSelect: [],
  //! unused variable
  datacuentas: [],
  /**
   * fetches data from the database to update account variables
   * @param {Object} p    Object with userID to fetch data from the database.
   * @returns Object    an object with user's current account data
   */
  mostrarCuentas: async (p) => {
    const response = await MostrarCuentas(p);
    set({ datacuentas: response });
    set({ cuentaItemSelect: response });
    return response;
  },
}));