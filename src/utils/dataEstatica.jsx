import { v } from "../styles/variables";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri"
import { TbPig } from "react-icons/tb"

export const DesplegableUser = [
  {
    text: "Mi perfil",
    icon: <v.iconUser/>,
    type: "miperfil",
  },
  {
    text: "Configuracion",
    icon: <v.iconSettings/>,
    type: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icon: <v.iconCloseSettings/>,
    type: "close-session",
  },
];

export const DataDesplegableType = [
  {
    text: "Categories gastos",
    color:  v.colorOutcome,
    type: "g",
    bgcolor:  v.colorbgOutcome,
  },
  {
    text: "Categories ingresos",
    color: v.colorIncome,
    type: "i",
    bgcolor:  v.colorbgingresos,
  },
];
export const DataDropdownMovements = [
  {
    text: "Outcome",
    color:  v.colorOutcome,
    type: "g",
    bgcolor:  v.colorbgOutcome,
  },
  {
    text: "Income",
    color: v.colorIncome,
    type: "i",
    bgcolor:  v.colorbgingresos,
  },
];

//data SIDEBAR
export const LinksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Categories",
    icon: <MdOutlineAnalytics />,
    to: "/categories",
  },
  {
    label: "Movements",
    icon: <AiOutlineApartment />,
    to: "/movements",
  },
  {
    label: "Informs",
    icon: <MdOutlineAnalytics />,
    to: "/informs",
  },
];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/configuration",
  },
  {
    label: "Acerca de",
    icon: <TbPig />,
    to: "/",
  },
];
//themonths
export const ThemonthsData = [
  {
    icon: "🌞",
    description: "light",
  },
  {
    icon: "🌚",
    description: "dark",
  },
];