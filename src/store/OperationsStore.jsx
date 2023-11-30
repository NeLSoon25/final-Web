import { create } from "zustand";
import { v } from "../styles/variables";
export const useOperaciones = create((set, get) => ({
  //todo: o for outcome?
  // type of view. i for income. database uses enum attribute
  type: "i",
  // type of view complete name (for category page)
  //? is this variable really necessary? can't we just concatenate the next variable?
  titleBtnDes: "Categories ingresos",
  // type of view complete name
  titleBtnDesMovements: "Income",
  // colors used for text based on selected type
  colorCategory:  v.colorIncome,
  // color variable for background based on selected type
  bgCategory:  v.colorbgingresos,
  // stores user's last year search
  year: null,
  // stores user's last month search
  months: null,
  /**
   * setter for month variable
   * @param {String} p 
   */
  setMonth: (p) => {
    set({ months: p });
  },
  /**
   * setter for year variable
   * @param {String} p 
   */
  setYear: (p) => {
    set({ year: p });
  },
  /**
   * setter to update category values to display on screen (for other screens??)
   * @param {Object} p    category styles object
   */
  setTypeMovements:(p) => {
    // set type for database
    set({type: p.type})
    // set category type text to display
    set({
      titleBtnDesMovements: p.text
    });
    // set text color for intergace
    set({
      colorCategory: p.color,
    });
    // set bacground color for interface
    set({
      bgCategory: p.bgcolor,
    });
  },
  /**
   * setter to update category values to display on screen (for category screens??)
   * @param {Object} p    category styles object
   */
  //? whats the difference between this one and the past one?
  setType: (p) => {
    // set type for database
    set({type:p.type})
    // set text values
    set({
      titleBtnDes: p.text,
      titleBtnDesMovements: p.text
    });
    // set text color for interface
    set({
      colorCategory: p.color,
    });
    // set background color for interface
    set({
      bgCategory: p.bgcolor,
    });
  },
}));