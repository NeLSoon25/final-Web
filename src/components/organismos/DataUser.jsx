import styled from "styled-components";
import {
  UserAuth,
  BtnCircular,
  v,
  ListaMenuDesplegable,
  DesplegableUser,
  useAuthStore,
} from "../../index";
export function DataUser({ stateConfig }) {
  // get user authentication
  //* const { user } = UserAuth();
  const user = {
    picture: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg?w=170&h=170",
    name: "tester"
  };
  // logout function
  //* const { signout } = useAuthStore();
  const signout = () => {
    window.location.href = "http://localhost:5173/login";
  }
  /**
   * verifies if log out select item was pressed to log out user
   * @param {Object} p    management option object
   */
  const funcionXtipo = async (p) => {
    if (p.tipo === "cerrarsesion") {
      await signout();
    }
  };
  return (
    <Container onClick={stateConfig.setState}>
      <div className="imgContainer">
        <img src={user.picture} />
      </div>

      <BtnCircular
        icono={<v.iconocorona />}
        width="25px"
        height="25px"
        bgcolor={`linear-gradient(15deg, rgba(255, 88, 58, 0.86) 9%, #f8bf5b 100%);`}
        textcolor="#ffffff"
        fontsize="11px"
        translatex="-50px"
        translatey="-12px"
      />
      <span className="nombre">{user.name}</span>
      {stateConfig.state && (
        <ListaMenuDesplegable
          data={DesplegableUser}
          top="62px"
          funcion={(p)=>funcionXtipo(p)}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;