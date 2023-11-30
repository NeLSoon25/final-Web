import { createContext, useContext, useEffect, useState } from "react";
import { supabase, InsertUsuarios } from "../index";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(
    /**
     * set a listener to alter context whenever user logs in or out
     * @returns Object   subscription user data
     */
    () => {
      // set listener for auth events
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session == null) {
            // remove user if session has been terminated
            setUser(null);
          } else {
            // set user data received by auth response
            //? to see the contents of user, look for json response called "user"
            setUser(session?.user.user_metadata);
            insertUsuarios(session?.user.user_metadata, session?.user.id);
            console.log("event", event);
            console.log("session", session?.user.user_metadata);
          }
        }
      );
      // returns subscription data from user
      return () => {
        authListener.subscription;
      };
    }, []
  );

  /**
   * function used to register a new user into the database
   * @param {Object} dataProvider    google data provided by sign in
   * @param {String} idAuthSupabase    supabase geneated ID
   */
  const insertUsuarios = async (dataProvider, idAuthSupabase) => {
    // user object to inser
    const p = {
      nombres: dataProvider.name,
      foto: dataProvider.picture,
      idauth_supabase: idAuthSupabase,
    };
    // call insert function
    await InsertUsuarios(p)

  };
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};