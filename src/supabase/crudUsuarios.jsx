import Swal from "sweetalert2";
import { supabase, ObtenerIdAuthSupabase } from "../index";

/**
 * Performs API request to insert a new user into the database
 * @param {Object} p    user object to insert into the database
 * @returns Object    object with user data
 */
export const InsertUsuarios= async(p)=>{
  try {
    // query
    const { data }= await supabase.from("usuarios").insert(p).select();
    return data;
  } catch (error) {

  }
};
/**
 * performs API request to fetch user data
 * @returns Object    object with user data
 */
export const ShowUsuarios = async () => {
  try {
    // get user id
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    // query
    const { error, data } = await supabase
    .from('usuarios')
    .select()
    .eq("idauth_supabase", idAuthSupabase)
    .maybeSingle();
    
    if(data){
      return data;
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + "Show usuarios");
  }
};
/**
 * performs API request to update user preferences
 * @param {Object} p    object with user preferences
 */
export async function EditThemeMonedaUser(p){
  try {
    const{error} = await supabase.from("usuarios").update(p).eq("id",p.id);
    if(error){
      alert("Error al editar usuarios",error)
    }
    Swal.fire({
      icon : "success",
      title: "Datos modificados",
      showConfirmButton : false,
      timer : 1500,
    });
  } catch (error) {
    alert(error.error_description || error.monthssage + "Show ThemeMonedaUser");
  }
}