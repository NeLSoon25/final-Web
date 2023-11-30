import { supabase } from "./supabase.config";
import Swal from "sweetalert2";
/**
 * performs API request to insert movement object into the database
 * @param {Object} p    movement object to insert
 */
export const InsertMovements = async (p) => {
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
        text: "Ya existe un registro con " + p.description,
        footer: '<a href="">Agregue una nueva description</a>',
      });
    }
    if (data) {
      // display success monthssage
      Swal.fire({
        icon: "success",
        title: "Registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + " insert movimientos");
  }
};
/**
 * Peroforms API request to delete certain object
 * @param {Object}    object to remove from database 
 */
export async function EliminateMovements(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminate", error);
    }
  } catch (error) {
    alert(error.error_description || error.monthssage + " eliminate movimientos");
  }
}
/**
 * Performs API request to fetch user movements within a period of time
 * @param {Object} p    where parameters to fetch data from database
 * @returns Array    array with movement objects fetched from database
 */
export async function ShowMovementsPerMonthYear(p) {
  try {
    const { data } = await supabase.rpc("movimientosmonthsanio", {
      anio: p.year, //! typo
      months: p.months,
      iduser: p.idUser,
      typecategoria: p.typecategoria,
    });
    console.log('ShowMovementsPerMonthYear response', data);
    return data;
  } catch (error) {}
}
/**
 * Performs API request to retreive movements summary within a period of time and grouped by category
 * @param {Object} p    where parameters to fetch data from database
 * @returns Array    array with database movements objects response grouped by category
 */
export async function RptMovementsPerMonthYear(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_months", {
      anio: p.year, //! typo
      months: p.months,
      iduser: p.idUser,
      typecategoria: p.typecategoria,
    });
    console.log('RptMovementsPerMonthYear response', data);
    return data;
  } catch (error) {}
}