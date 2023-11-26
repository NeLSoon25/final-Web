import { create } from "zustand";
import {
  EditarCategorias,
  EliminarCategorias,
  EliminarCategoriasTodas,
  InsertarCategorias,
  MostrarCategorias,
} from "../index";
export const useCategoriasStore = create((set, get) => ({
  // stores category objects fetched from database
  datacategoria: [],
  // stores the last category object selected by the user
  categoriaItemSelect: [],
  // stores last query parameters from category fetch request.
  parametros:{},
  /**
   * calls CRUD function to fetch categories data and update values
   * @param {Object} p   object with user data and category type to perform db query
   * @returns Array   category objects fetched from the database
   */
  mostrarCategorias: async (p) => {
    // call Select function
    const response = await MostrarCategorias(p);
    // update last query parameters used
    set({ parametros: p })
    // update category objects
    set({ datacategoria: response });
    // select first category to avoid null errors
    set({ categoriaItemSelect: response[0] });
    // return objects fetched
    return response;
  },
  /**
   * setter for category object selected
   * @param {Object} p    category object selected
   */
  selectCategoria: (p) => {
    set({ categoriaItemSelect: p });
  },
  /**
   * inserts a new category object in the database
   * @param {Object} p    category object to store in database
   */
  insertarCategorias: async (p) => {
    // call CREATE function
    await InsertarCategorias(p);
    // update values
    const { mostrarCategorias } = get();
    const { parametros } = get();
    set(mostrarCategorias(parametros));
  },
  /**
   * calls CRUD function to delete an object from the database
   * @param {Object} p    category object to delete from database
   */
  eliminarCategoria: async (p) => {
    // call Delete function
    await EliminarCategorias(p);
    // update values
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
  /**
   * calls CRUD function to delete all the user data from the database
   * @param {Object} p    object with user id to reset account
   */
  eliminarCategoriasTodas: async (p) => {
    // call the API function
    await EliminarCategoriasTodas(p);
    // fetch data from the database to update values with empty user database.
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
  /**
   * calls CRUD function to update object on the database
   * @param {Object} p    object to update on the database
   */
  editarCategoria: async (p) => {
    // perform update function
    await EditarCategorias(p);
    // update the data acording to new information stored at the database.
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
}));