import styled from "styled-components"; //! unused import
import {
  CategoriasTemplate,
  useCategoriasStore,
  useOperaciones,
  useUsuariosStore,
  SpinnerLoader,
  Lottieanimacion, //! unused import
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Categorias() {
  // operation type identifier
  const { tipo } = useOperaciones();
  // categories data and fetch function
  const { datacategoria, mostrarCategorias } = useCategoriasStore();
  // user
  const { datausuarios } = useUsuariosStore();
  // use API call function to get page content data before rendering
  const { isLoading, error } = useQuery(
    ["mostrar categorias", tipo],
    () =>
      mostrarCategorias({ idusuario: datausuarios.id, tipo: tipo })
  );
  // display a loading animation if content is not ready yet
  if (isLoading) {
    return <SpinnerLoader />;
  }
  // display an error message if an error occured
  if (error) {
    return <h1>Error...</h1>;
  }
  // else display category content
  return (
    <>
      <CategoriasTemplate data={datacategoria}>
      </CategoriasTemplate>
    </>
  );
}