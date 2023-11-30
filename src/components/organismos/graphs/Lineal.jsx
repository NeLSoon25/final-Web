import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export function Lineal({ dataGraph, data, title }){
  const style = {
    width:"400px"
  }
  return(
    <Container>
      <section>
        <Line data={dataGraph} style={style} />
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
