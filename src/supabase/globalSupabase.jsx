import { supabase } from "../index";
/**
 * returns user id from current session
 * @returns String    supabase user id
 */
export const ObtenerIdAuthSupabase = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log('session', session);
  if (session != null) {
    const { user } = session;
    console.log('user', user);
    const idAuthSupabase = user.id;
    return idAuthSupabase;
  }
};