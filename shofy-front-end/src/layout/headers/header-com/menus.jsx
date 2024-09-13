'use client';
import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";

const Menus = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  // Maneja la apertura del dropdown al hacer hover
  const handleMouseEnter = (menuId) => {
    setIsDropdownOpen(menuId);
  };

  // Cierra el dropdown cuando se hace clic o cuando el mouse sale del área
  const handleMouseLeave = () => {
    setIsDropdownOpen(null);
  };

  // Cierra el dropdown cuando se selecciona una opción del menú
  const handleLinkClick = () => {
    setIsDropdownOpen(null);
  };

  return (
    <ul>
      {menu_data.map((menu) =>
        menu.homes ? (
          <li
            key={menu.id}
            className={`has-dropdown has-mega-menu ${isDropdownOpen === menu.id ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter(menu.id)}
            onMouseLeave={handleMouseLeave}  // Cierra el dropdown cuando el mouse sale
          >
            <Link href={menu.link}>{menu.title}</Link>
            {isDropdownOpen === menu.id && (
              <div className="home-menu tp-submenu tp-mega-menu">
                <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4">
                  {menu.home_pages.map((home, i) => (
                    <div key={i} className="col">
                      <div className="home-menu-item">
                        <Link href={home.link} onClick={handleLinkClick}>
                          <div className="home-menu-thumb p-relative fix">
                            <Image src={home.img} alt="home img" />
                          </div>
                          <div className="home-menu-content">
                            <h5 className="home-menu-title">{home.title}</h5>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ) : menu.products ? (
          <li
            key={menu.id}
            className={`has-dropdown has-mega-menu ${isDropdownOpen === menu.id ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter(menu.id)}
            onMouseLeave={handleMouseLeave}  // Cierra el dropdown cuando el mouse sale
          >
            <Link href={menu.link}>{menu.title}</Link>
            {isDropdownOpen === menu.id && (
              <ul className="tp-submenu tp-mega-menu mega-menu-style-2">
                {menu.product_pages.map((p, i) => (
                  <li key={i} className="has-dropdown">
                    <Link href={p.link} className="mega-menu-title" onClick={handleLinkClick}>
                      {p.title}
                    </Link>
                    <ul className="tp-submenu">
                      {p.mega_menus.map((m, i) => (
                        <li key={i}>
                          <Link href={m.link} onClick={handleLinkClick}>
                            {m.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ) : menu.sub_menu ? (
          <li
            key={menu.id}
            className={`has-dropdown ${isDropdownOpen === menu.id ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter(menu.id)}
            onMouseLeave={handleMouseLeave}  // Cierra el dropdown cuando el mouse sale
          >
            <Link href={menu.link}>{menu.title}</Link>
            {isDropdownOpen === menu.id && (
              <ul className="tp-submenu">
                {menu.sub_menus.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link} onClick={handleLinkClick}>
                      {b.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ) : (
          <li key={menu.id}>
            <Link href={menu.link} onClick={handleLinkClick}>
              {menu.title}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default Menus;
