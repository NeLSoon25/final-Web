import { supabase } from "../index";
import Swal from "sweetalert2";
/**
 * perform an API request to insert a category object
 * @param {Object} p    category object to insert into the database
 */
export async function InsertarCategorias(p) {
  console.log('insertar categorias', p)
  try {
    // query
    const { data, error } = await supabase
      .from("categorias")
      .insert(p)
      .select();
    if (error) {
      console.log('insert error:', error);
      // display an error message if failed
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
    if (data) {
      // display a successful message if completed
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " insertar categorias");
  }
}
/**
 * performs an API request to fetch all categories created by the user with requested type (income or outcome)
 * @param {Object} p    object with user id and category type
 * @returns Object    user account data
 */
export async function MostrarCategorias(p) {
  try {
    // query
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("idusuario", p.idusuario)
      .eq("tipo", p.tipo)
      .order("id", { ascending: false });
    return data;
  } catch (error) {}
}
/**
 * performs API request to delete a category object
 * @param {Object} p    object with user id and category id
 */
export async function EliminarCategorias(p) {
  try {
    // query
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("idusuario", p.idusuario)
      .eq("id", p.id);
    if (error) {
      // display error message
      console.log('delete error:', error);
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
}
/**
 * Performs API request to update category object
 * @param {Object} p    category object to edit
 */
export async function EditarCategorias(p) {
  try {
    //query
    const { error } = await supabase
      .from("categorias")
      .update(p)
      .eq("idusuario", p.idusuario)
      .eq("id", p.id);
    if (error) {
      // display error message
      console.log('update error:', error);
      alert("Error al editar categoria", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar categorias");
  }
}
/**
 * performs API request to fetch all categories created by the user
 * @param {Object} p    object with user ID
 */
export async function EliminarCategoriasTodas(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("idusuario", p.idusuario)
    if (error) {
      alert("Error al eliminar", error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
}