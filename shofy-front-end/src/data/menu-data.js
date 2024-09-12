import home_1 from '@assets/img/menu/menu-home-1.png';
import home_2 from '@assets/img/menu/menu-home-2.png';
import home_3 from '@assets/img/menu/menu-home-3.png';
import home_4 from '@assets/img/menu/menu-home-4.png';
import homeIcon from '@assets/img/icon/menu/home.svg';
import glassesIcon from '@assets/img/icon/menu/glasses.svg';
import storeIcon from '@assets/img/icon/menu/store.svg';
import contactIcon from '@assets/img/icon/menu/contact.svg';
import settingsIcon from '@assets/img/icon/menu/settings.svg';

const menu_data = [
  {
    id: 1,
    single_link: true,
    title: 'Inicio',
    link: '/',
  },
  {
    id: 2,
    homes: true,
    title: 'Lentes',
    link: '#',
    home_pages: [
      {
        img: home_2,
        title: 'Hombre',
        link: '/shop?category=hombre'
      },
      {
        img: home_1,
        title: 'Mujer',
        link: '/shop?category=mujer'
      },
      {
        img: home_3,
        title: 'Niños',
        link: '/shop?category=niños'
      },
      {
        img: home_4,
        title: 'Ver todo',
        link: '/shop'
      }
    ],
  },
  {
    id: 3,
    title: 'Catalogo',
    link: '/shop',
  },
  {
    id: 6,
    single_link: true,
    title: 'Contacto',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    icon: homeIcon,
    single_link: true,
    title: 'Inicio',
    link: '/',
  },
  {
    id: 2,
    icon: glassesIcon,
    sub_menu: true,
    title: 'Lentes',
    link: '#',
    sub_menus: [
      { title: 'Hombre', link: '/shop?category=hombre' },
      { title: 'Mujer', link: '/shop?category=mujer' },
      { title: 'Niños', link: '/shop?category=niños' },
      { title: 'Ver todo', link: '/shop' },
    ],
  },
  {
    id: 3,
    icon: storeIcon,
    single_link: true,
    title: 'Catalogo',
    link: '/shop',
  },
  {
    id: 4,
    icon: contactIcon,
    single_link: true,
    title: 'Contacto',
    link: '/contact',
  },
  /*{
    id: 5,
    icon: settingsIcon,
    sub_menu: true,
    title: 'Opciones',
    link: '#',
    sub_menus: [
      { title: 'Mi Pefil', link: '/profile' },
      { title: 'Favoritos', link: '/wishlist' },
      { title: 'Carrito de compras', link: '/cart' },
    ],
  },*/
]