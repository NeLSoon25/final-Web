import { useState } from "react"; //! unused import
import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
export const useAuthStore = create((set) => ({
  // boolean used to verify is user is authenticated or not
  isAuth:false,
  // user data from google's database
  datauserGoogle: [],
  /**
   * perform a sign in using google's API through supabase.
   * @returns Object   user data from google database
   */
  signInWithGoogle: async () => {
    try {
      // perform login to google through supabase
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("A ocurrido un error durante la autenticación");
      // set user as authenticated
      set({ isAuth: true });
      return data;
    } catch (error) {}
  },
  /**
   * sends a logout signal to google
   */
  signout: async () => {
    // perform logout to google through supabase
    const { error } = await supabase.auth.signOut();
    // set user as unauthenticated
    set({ isAuth: false });
    if (error)
      throw new Error("A ocurrido un error durante el cierre de sesión");
  },

}));
