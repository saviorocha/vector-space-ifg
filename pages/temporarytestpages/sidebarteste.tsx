import React, { useRef } from "react";
import { ArrowLeft } from "react-feather";
import style from "../../styles/modules/sidebar.module.css";

const SidebarTeste = () => {
  const sideBarRef = useRef(null);
  const mainRef = useRef(null);
  const openNav = () => {
    sideBarRef.current.style.width = "250px";
    mainRef.current.style.marginLeft = "250px";
  };
  const closeNav = () => {
    sideBarRef.current.style.width = "0";
    mainRef.current.style.marginLeft = "0";
  };
  return (
    <>
      <div id={style.mySidebar} className={style.sidebar} ref={sideBarRef}>
        <a
          href="javascript:void(0)"
          className={style.closebtn}
          onClick={closeNav}
        >
          <ArrowLeft />
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

      <div id={style.main} ref={mainRef}>
        <button className={style.openbtn} onClick={openNav}>
          Open Sidebar
        </button>
        <h2>Collapsed Sidebar</h2>
        <p>
          Click on the hamburger menu/bar icon to open the sidebar, and push
          this content to the right.
        </p>
      </div>
    </>
  );
};

export default SidebarTeste;
