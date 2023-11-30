import { create } from "zustand";
import { ShowAccounts } from "../index";
export const useAccountStore = create((set, get) => ({
  // User current account data
  accountItemSelect: [],
  //! unused variable
  dataAccounts: [],
  /**
   * fetches data from the database to update account variables
   * @param {Object} p    Object with userID to fetch data from the database.
   * @returns Object    an object with user's current account data
   */
  showAccounts: async (p) => {
    const response = await ShowAccounts(p);
    set({ dataAccounts: response });
    set({ accountItemSelect: response });
    return response;
  },
}));