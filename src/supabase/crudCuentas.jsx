import { supabase } from "../index";
/**
 * performs API request to select user data
 * @param {Object} p    object with user ID
 * @returns Object    object with user account data
 */
export async function ShowAccounts(p) {
  try {
    //query
    const { data } = await supabase
      .from("account")
      .select()
      .eq("idUser", p.idUser)
      .maybeSingle();
    console.log('show accounts response:', data);
    if (data) {
      return data;
    }
    //? why another return outside the if
    return data;
  } catch (error) {}
}