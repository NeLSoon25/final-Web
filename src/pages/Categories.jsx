import styled from "styled-components"; //! unused import
import {
  CategoriesTemplate,
  useCategoriesStore,
  useOperaciones,
  useUserStore,
  SpinnerLoader,
  Lottieanimation, //! unused import
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Categories() {
  // operation type identifier
  const { type } = useOperaciones();
  // categories data and fetch function
  const { dataCategories, showCategories } = useCategoriesStore();
  // user
  const { dataUsers } = useUserStore();
  // use API call function to get page content data before rendering
  const { isLoading, error } = useQuery(
    ["show categorias", type],
    () =>
      showCategories({ idUser: dataUsers.id, type: type })
  );
  // display a loading animation if content is not ready yet
  if (isLoading) {
    return <SpinnerLoader />;
  }
  // display an error monthssage if an error occured
  if (error) {
    return <h1>Error...</h1>;
  }
  // else display category content
  return (
    <>
      <CategoriesTemplate data={dataCategories}>
      </CategoriesTemplate>
    </>
  );
}