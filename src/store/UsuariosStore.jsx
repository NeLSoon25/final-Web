import { create } from "zustand";
import { EditarTemaMonedaUser, MostrarUsuarios } from "../index";

export const useUsuariosStore = create((set, get) => ({
  // user database id
  idusuario:0,
  // user data
  datausuarios: [],
  
  // calls crud function to read user data
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ datausuarios: response });
    if(response){
      console.log('tester response', response);
      set({idusuario:response.id})
      return response
    }else{
      return [];
    }
  },
  /**
   * calls crud function to update user preferences
   * @param {Object} p    object with user preferences
   */
  editartemamonedauser: async (p) => {
    await EditarTemaMonedaUser(p);
    const {mostrarUsuarios} = get();
    set(mostrarUsuarios)
  },
}));