import { useState } from "react";
import { create } from "zustand";
import { supabase } from "../index";
export const useAuthStore = create((set) => ({
  isAuth:false,
  datauserGoogle: [],
  /**
   * perform a sign in using google's API through supabase.
   * @returns Object   user data from google database
   */
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("A ocurrido un error durante la autenticación");
      // the system recognizes the user as logged in
      set({ isAuth: true });
      //! return data isn't being used
      return data;
    } catch (error) {}
  },
  /**
   * sends a logout signal to google
   */
  signout: async () => {
    const { error } = await supabase.auth.signOut();
    // the system doesn't recognize the user anymore, even if google log out fails.
    set({ isAuth: false });
    if (error)
      throw new Error("A ocurrido un error durante el cierre de sesión");
  },

}));
