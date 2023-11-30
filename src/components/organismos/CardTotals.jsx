import styled from "styled-components";
import { v, useUserStore, BtnCircular } from "../../index";
export function CardTotals({ color, total, title, icon }) {
  // user data
  const { dataUsers } = useUserStore();
  return (
    <Container>
      <div className="content-texts">
        <section>
          <span className="title">{title}</span>
          <b>{<v.iconArrowDown />}</b>
        </section>
        <span className="total">
          {dataUsers.currency} {total}
        </span>
      </div>
      <div className="contentIcono">
        <BtnCircular
          height="50px"
          width="50px"
          bgcolor={color}
          fontsize="25px"
          icon={icon}
          textcolor="#ffffff"
          translatex="-45px"
          translatey="-15px"
        />
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  .content-texts {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
    }
    .total {
      font-size: 22px;
      font-weight: 500;
    }
    section{
      display:flex;
      gap:10px;
      display:flex;
      align-items:center;
    }
  }
  .contentIcono {
    display: flex;
  }
`;