import styled from "styled-components";
import { MdOutlineNavigateNext, MdArrowBackIos } from "react-icons/md";
import { useEffect } from "react";
import { useOperaciones } from "../../index";
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// get user's current date
let 
  date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
export function CalendarLineal({
  value,
  setValue,
  setFormatoDate
}) {
  // style color, month and year selected
  const { colorCategory, setMonth ,setYear} = useOperaciones();
  /**
   * initialize values accordingly to user's current date
   */
  function initiateCalendar() {
    // update display date
    setValue(months[currMonth] + ' ' + currYear);
    // generate a 2 char lenght number month
    //? left pad doesn't work here?
    let months = "";
    if (currMonth + 1 < 10) {
      months = "0" + (currMonth + 1);
    } else {
      months = currMonth + 1;
    }
    // create a formated MM/YY date
    let formatDate = months + "/" + currYear;
    // set values
    setMonth(months);
    setYear(currYear);
    setFormatoDate(formatDate);
  }
  /**
   * updates date accordingly to next month
   */
  function next() {
    // update month
    currMonth += 1;
    // update the other values
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    initiateCalendar();
  }
  function previous() {
    currMonth -= 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    // reload element
    initiateCalendar();
  }

  // call function when initializing page.
  useEffect(() => {
    initiateCalendar();
  }, []);
  return (
    <Container className="wrapper" colortext={colorCategory}>
      <header>
        <div className="subcontainer">
          <span onClick={previous} className="previous">
            <MdArrowBackIos />
          </span>
          <section className="content-value">
            <p>{value.toString()}</p>
          </section>

          <span onClick={next} className="next">
            <MdOutlineNavigateNext />
          </span>
        </div>
      </header>
    </Container>
  );
}
const Container = styled.div`
  width: 450px;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  header {
    display: flex;
    align-items: center;
    padding: 25px 30px 10px;
    justify-content: space-between;
    height: 100%;

    .subcontainer {
      display: flex;
      color: ${(props) => props.colortext};
      align-items: center;
      justify-content: center;
    
      .contentValue {
        border: 2px solid ${(props) => props.colortext};
        border-radius: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        padding: 10px;
      }
      .atras {
        cursor: pointer;
        margin-left: 20px;
        svg {
          width: 30px;
          height: 30px;
        }
      }
      .adelante {
        cursor: pointer;
          margin-right:20px;
        svg {
          width: 45px;
          height: 45px;
        }
      }
    }
    .current-date {
      font-size: 1.45rem;
      font-weight: 500;
    }
  }
`;