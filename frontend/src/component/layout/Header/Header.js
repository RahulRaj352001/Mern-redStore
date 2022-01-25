import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

export default function Header() {
  return (
    <ReactNavbar
      logo={logo}
      burgerColor="#eb4034"
      burgerColorHover="#a62d24"
      logowidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.2vmax"
      link1Color="rgba(35,35,35,0.7"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1.5vmax"
      profileIconUrl="/login"
      profileIconColor="rgba(35,35,35,0.7)"
      searchIconColor="rgba(35,35,35,0.7)"
     cartIconColor="rgba(35,35,35,0.7)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
     cartIconColorHover="#eb4034"
     cartIconMargin="1.5vmax"

    />
  );
}
