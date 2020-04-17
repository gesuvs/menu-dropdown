import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const App = () => {
  return (
    <NavBar>
      <NavItem icon={<i className="fas fa-plus"></i>} />
      <NavItem icon={<i className="fab fa-facebook-messenger"></i>} />
      <NavItem icon={<i className="fas fa-bell"></i>} />

      <NavItem icon={<i className="fas fa-caret-down"></i>}>
        <DropDownMenu />
      </NavItem>
    </NavBar>
  );
};

const NavBar = ({ children }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
};

const DropDownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropDownItem = ({ children, leftIcon, rightIcon, goToMenu }) => {
    return (
      <span
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </span>
    );
  };
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem leftIcon={<i className="fas fa-user"></i>}>
            My Profile
          </DropDownItem>

          <DropDownItem
            leftIcon={<i className="fas fa-cog"></i>}
            rightIcon={<i className="fas fa-chevron-right"></i>}
            goToMenu="settings"
          >
            Settings
          </DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem
            goToMenu="main"
            leftIcon={<i className="fas fa-chevron-left"></i>}
          />
          <DropDownItem leftIcon={<i className="fab fa-html5"></i>}>
            HTML
          </DropDownItem>
          <DropDownItem leftIcon={<i className="fab fa-css3-alt"></i>}>
            CSS
          </DropDownItem>
          <DropDownItem leftIcon={<i className="fab fa-js-square"></i>}>
            JavaScript
          </DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

const NavItem = ({ children, icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <span className="icon-button" onClick={() => setOpen(!open)}>
        {icon}
      </span>
      {open && children}
    </li>
  );
};
