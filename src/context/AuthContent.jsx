import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(
    //! this function is not complete, return statement is not being used.
    /**
     * set a listener to alter context whenever user logs in or out
     * @returns Object   subscription user data
     */
    () => {
      // set listener for auth events
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event,session) => {
          if (session == null) {
            // remove user if session has been terminated
            setUser(null);
          } else {
            // set user data received by auth response
            setUser(session?.user.user_metadata);
            console.log("event",event);
            console.log("session",session?.user.user_metadata
            );
          }
        }
      );
      // returns subscription data from user
      //! data returned is not being used yet
      return () => {
        authListener.subscription;
      };
    }, []
  );
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
