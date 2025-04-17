import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ShoppingCartContext } from "../utils/context";
import {
  ArchiveBoxIcon,
  InboxIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
const NavBar = () => {
  const context = useContext(ShoppingCartContext);
  const closeEveryThing = () => {
    context.closeCheckOutSideMenu();
    context.closeProductDetail();
    setUserMenuIsActive(false);
  };
  const activeStyle = "underline underline-offset-8";
  const location = useLocation();
  return (
    <div className="bg-white border-b-2 border-gray-400 flex justify-between items-center fixed top-0 z-10 w-full h-18 px-8 text-sm font-normal">
      <ul className="flex items-center gap-4 font-manrope font-normal text-sm">
        <li className="font-bold text-lg hidden md:inline font-roboto">
          <NavLink
            to="/"
            onClick={() => {
              context.cleanTitlebarState();
              context.setSearchByCategory("");
              closeEveryThing();
            }}
          >
            <p>Shopsy</p>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            to="/"
            onClick={() => {
              context.setSearchByCategory("");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>All</p>
          </NavLink>
        </li>
        {context.categoryItems &&
        Object.keys(context.categoryItems).length > 0 ? (
          Object.entries(context.categoryItems).map(([cat, item]) => {
            const categoryPath = `/${cat}`;
            const isActive = location.pathname === categoryPath;

            return (
              <li className="" key={cat}>
                <NavLink
                  to={`/:${cat.toLowerCase()}`}
                  onClick={() => {
                    context.setActiveCategory(cat);
                    context.setSearchByCategory(cat);
                    closeEveryThing();
                  }}
                  className={isActive ? activeStyle : undefined}
                >
                  <p>{cat}</p>
                </NavLink>
              </li>
            );
          })
        ) : (
          <></>
        )}
        {/* <li>
          <NavLink
            to="/clothes"
            onClick={() => {
              context.setSearchByCategory("shoes");
              closeEveryThing();
            }}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Clothes</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Furnitures</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/miscellaneous"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>Miscellaneous</p>
          </NavLink>
        </li> */}
      </ul>
      <ul className=" items-center gap-4  hidden md:flex">
        <li>
          <NavLink
            to="/Vite-E-commerce/my-orders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>My Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Vite-E-commerce/my-account"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <p>My Account</p>
          </NavLink>
        </li>
        <li>
          <p className="flex gap-2">
            <ShoppingCartIcon className="h-6 w-6 text-black-500 cursor-pointer" />
            0
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
