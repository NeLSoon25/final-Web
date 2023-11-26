import { create } from "zustand";
import { v } from "../styles/variables";
export const useOperaciones = create((set, get) => ({
  //todo: o for outcome?
  // type of view. i for income. database uses enum attribute
  tipo: "i",
  // type of view complete name (for category page)
  //? is this variable really necessary? can't we just concatenate the next variable?
  tituloBtnDes: "Categorias ingresos",
  // type of view complete name
  tituloBtnDesMovimientos: "Ingresos",
  // colors used for text based on selected type
  colorCategoria:  v.colorIngresos,
  // color variable for background based on selected type
  bgCategoria:  v.colorbgingresos,
  // stores user's last year search
  año: null,
  // stores user's last month search
  mes: null,
  /**
   * setter for month variable
   * @param {String} p 
   */
  setMes: (p) => {
    set({ mes: p });
  },
  /**
   * setter for year variable
   * @param {String} p 
   */
  setAño: (p) => {
    set({ año: p });
  },
  /**
   * setter to update category values to display on screen (for other screens??)
   * @param {Object} p    category styles object
   */
  setTipoMovimientos:(p) => {
    // set type for database
    set({tipo: p.tipo})
    // set category type text to display
    set({
      tituloBtnDesMovimientos: p.text
    });
    // set text color for intergace
    set({
      colorCategoria: p.color,
    });
    // set bacground color for interface
    set({
      bgCategoria: p.bgcolor,
    });
  },
  /**
   * setter to update category values to display on screen (for category screens??)
   * @param {Object} p    category styles object
   */
  //? whats the difference between this one and the past one?
  setTipo: (p) => {
    // set type for database
    set({tipo:p.tipo})
    // set text values
    set({
      tituloBtnDes: p.text,
      tituloBtnDesMovimientos: p.text
    });
    // set text color for interface
    set({
      colorCategoria: p.color,
    });
    // set background color for interface
    set({
      bgCategoria: p.bgcolor,
    });
  },
}));