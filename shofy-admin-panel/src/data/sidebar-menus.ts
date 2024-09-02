import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Coupons,
  Orders,
  Pages,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Productos",
    subMenus: [
      { title: "Lista de productos", link: "/product-list" },
      { title: "Grid de productos", link: "/product-grid" },
      { title: "Agregar producto", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Categorias",
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Ventas",
  },
  {
    id: 5,
    icon: Leaf,
    link: "/brands",
    title: "Marcas",
  },
  {
    id: 6,
    icon: Reviews,
    link: "/reviews",
    title: "Comentarios",
  },
  {
    id: 7,
    icon: Coupons,
    link: "/coupon",
    title: "Cupones",
  },
  {
    id: 8,
    icon: Profile,
    link: "/profile",
    title: "Perfil",
  },
  {
    id: 10,
    icon: StuffUser,
    link: "/our-staff",
    title: "Usuarios",
  },
];

export default sidebar_menu;
