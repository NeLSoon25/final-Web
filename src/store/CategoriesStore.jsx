import { create } from "zustand";
import {
  EditCategories,
  EliminateCategories,
  EliminateCategoriesAll,
  InsertCategories,
  ShowCategories,
} from "../index";
export const useCategoriesStore = create((set, get) => ({
  // stores category objects fetched from database
  dataCategories: [],
  // stores the last category object selected by the user
  categoryItemSelect: [],
  // stores last query parameters from category fetch request.
  parameters:{},
  /**
   * calls CRUD function to fetch categories data and update values
   * @param {Object} p   object with user data and category type to perform db query
   * @returns Array   category objects fetched from the database
   */
  showCategories: async (p) => {
    // call Select function
    const response = await ShowCategories(p);
    // update last query parameters used
    set({ parameters: p })
    // update category objects
    set({ dataCategories: response });
    // select first category to avoid null errors
    set({ categoryItemSelect: response[0] });
    // return objects fetched
    return response;
  },
  /**
   * setter for category object selected
   * @param {Object} p    category object selected
   */
  selectCategory: (p) => {
    set({ categoryItemSelect: p });
  },
  /**
   * inserts a new category object in the database
   * @param {Object} p    category object to store in database
   */
  insertCategories: async (p) => {
    // call CREATE function
    await InsertCategories(p);
    // update values
    const { showCategories } = get();
    const { parameters } = get();
    set(showCategories(parameters));
  },
  /**
   * calls CRUD function to delete an object from the database
   * @param {Object} p    category object to delete from database
   */
  eliminateCategory: async (p) => {
    // call Delete function
    await EliminateCategories(p);
    // update values
    const { showCategories } = get();
    set(showCategories(p));
  },
  /**
   * calls CRUD function to delete all the user data from the database
   * @param {Object} p    object with user id to reset account
   */
  eliminateCategoriesAll: async (p) => {
    // call the API function
    await EliminateCategoriesAll(p);
    // fetch data from the database to update values with empty user database.
    const { showCategories } = get();
    set(showCategories(p));
  },
  /**
   * calls CRUD function to update object on the database
   * @param {Object} p    object to update on the database
   */
  editCategory: async (p) => {
    // perform update function
    await EditCategories(p);
    // update the data acording to new information stored at the database.
    const { showCategories } = get();
    set(showCategories(p));
  },
}));