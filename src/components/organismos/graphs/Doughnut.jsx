import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
export function Doughnut({ dataGraph, data, title }){
  const style = {
    width:"400px"
  }
  return(
    <Container>
      <section>
        <Doughnut data={dataGraph} style={style} />
      </section>
      <section>
        <h2>{title} por categoria</h2>
        {
          data.map((item,index)=>{return(<ContentCars>
            <div className="content-description">
              <span>{item.icon}</span>
              <span className="description">{item.description}</span>
            </div>
            <span>{item.total}</span>
          </ContentCars>)})
        }
      </section>
    </Container>);
}
const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  gap:18px;
`;
const ContentCars = styled.div`
  display:flex;
  justify-content:space-between;
  .content-description{
    display:flex;
    gap:10px;
  }
`;
