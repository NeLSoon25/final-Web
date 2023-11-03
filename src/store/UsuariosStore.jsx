import { create } from "zustand";
import { MostrarUsuarios,EditarTemaMonedaUser } from "../index";

export const useUsuariosStore = create((set, get) => ({
  datausuarios: [],
  
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ datausuarios: response });
    if(response){
      return response
    }else{
      return [];
    }
    
  },
  editartemamonedauser: async (p) => {
    await EditarTemaMonedaUser(p);
    const {mostrarUsuarios} = get();
    set(mostrarUsuarios)

  },
}));