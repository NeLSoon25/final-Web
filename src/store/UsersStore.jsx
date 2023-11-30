import { create } from "zustand";
import { EditThemeMonedaUser, ShowUsuarios } from "../index";

export const useUserStore = create((set, get) => ({
  // user database id
  idUser:0,
  // user data
  dataUsers: [],
  
  // calls crud function to read user data
  showUsuarios: async () => {
    const response = await ShowUsuarios();
    set({ dataUsers: response });
    if(response){
      console.log('tester response', response);
      set({idUser:response.id})
      return response
    }else{
      return [];
    }
  },
  /**
   * calls crud function to update user preferences
   * @param {Object} p    object with user preferences
   */
  editThemeCurrencyUser: async (p) => {
    await EditThemeMonedaUser(p);
    const {showUsuarios} = get();
    set(showUsuarios)
  },
}));