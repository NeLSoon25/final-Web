import { supabase } from "./supabase.config";
import Swal from "sweetalert2";
/**
 * performs API request to insert movement object into the database
 * @param {Object} p    movement object to insert
 */
export const InsertarMovimientos = async (p) => {
  try {
    // query
    const { data, error } = await supabase
      .from("movimientos")
      .insert(p)
      .select();
    if (error) {
      // display error window
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
    if (data) {
      // display success message
      Swal.fire({
        icon: "success",
        title: "Registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " insertar movimientos");
  }
};
/**
 * Peroforms API request to delete certain object
 * @param {Object}    object to remove from database 
 */
export async function EliminarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar movimientos");
  }
}
/**
 * Performs API request to fetch user movements within a period of time
 * @param {Object} p    where parameters to fetch data from database
 * @returns Array    array with movement objects fetched from database
 */
export async function MostrarMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("movimientosmesanio", {
      anio: p.año, //! typo
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
    });
    console.log('MostrarMovimientosPorMesAño response', data);
    return data;
  } catch (error) {}
}
/**
 * Performs API request to retreive movements summary within a period of time and grouped by category
 * @param {Object} p    where parameters to fetch data from database
 * @returns Array    array with database movements objects response grouped by category
 */
export async function RptMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_mes", {
      anio: p.año, //! typo
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
    });
    console.log('RptMovimientosPorMesAño response', data);
    return data;
  } catch (error) {}
}