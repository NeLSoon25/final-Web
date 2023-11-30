import { supabase } from "../index";
import Swal from "sweetalert2";
/**
 * perform an API request to insert a category object
 * @param {Object} p    category object to insert into the database
 */
export async function InsertCategories(p) {
  console.log('insert categorias', p)
  try {
    // query
    const { data, error } = await supabase
      .from("categorias")
      .insert(p)
      .select();
    if (error) {
      console.log('insert error:', error);
      // display an error monthssage if failed
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.description,
        footer: '<a href="">Agregue una nueva description</a>',
      });
    }
    if (data) {
      // display a successful monthssage if completed
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + " insert categorias");
  }
}
/**
 * performs an API request to fetch all categories created by the user with requested type (income or outcome)
 * @param {Object} p    object with user id and category type
 * @returns Object    user account data
 */
export async function ShowCategories(p) {
  try {
    // query
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("idUser", p.idUser)
      .eq("type", p.type)
      .order("id", { ascending: false });
    return data;
  } catch (error) {}
}
/**
 * performs API request to delete a category object
 * @param {Object} p    object with user id and category id
 */
export async function EliminateCategories(p) {
  try {
    // query
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("idUser", p.idUser)
      .eq("id", p.id);
    if (error) {
      // display error monthssage
      console.log('delete error:', error);
      alert("Error al eliminate", error);
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + " eliminate categorias");
  }
}
/**
 * Performs API request to update category object
 * @param {Object} p    category object to edit
 */
export async function EditCategories(p) {
  try {
    //query
    const { error } = await supabase
      .from("categorias")
      .update(p)
      .eq("idUser", p.idUser)
      .eq("id", p.id);
    if (error) {
      // display error monthssage
      console.log('update error:', error);
      alert("Error al editar categoria", error);
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + " editar categorias");
  }
}
/**
 * performs API request to fetch all categories created by the user
 * @param {Object} p    object with user ID
 */
export async function EliminateCategoriesAll(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("idUser", p.idUser)
    if (error) {
      alert("Error al eliminate", error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    alert(error.error_description || error.monthssage + " eliminate categorias");
  }
}