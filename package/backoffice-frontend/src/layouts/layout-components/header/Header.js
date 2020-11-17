import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {set_role, set_backoffice_menu} from '../../../redux/backoffice/Actions'
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Navbar,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledCarousel,
  Progress,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import * as data from "./Data";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logolighticon from "../../../assets/images/logo-light-icon.png";
import logolighttext from "../../../assets/images/logo-light-text.png";
import profilephoto from "../../../assets/images/users/user.png";

import logo from "../../../assets/images/pampatar/pampatar_color_1.png";
import logoIcon from "../../../assets/images/pampatar/isotipo_color.png";
import { handleLogout } from "../../../redux/session/Actions";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const session     = useSelector(state => state.session);
  const settings    = useSelector((state) => state.settings);
  const backoffice  = useSelector((state) => state.backoffice);
  const dispatch    = useDispatch();

  let shopName = session.userData.shop.name;
  let role = backoffice.role.name;
  let account = session.userData.account;
  let logoshop = '';

  if(role === 'Vendedor' && session.storeLogo !== null){
    logoshop = String.fromCharCode.apply(null, session.storeLogo);
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const searchtoggle = () => {
    setCollapse(!collapse);
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const goToChangeRol = () => {
    localStorage.removeItem('role');
    dispatch(set_role({}));
    dispatch(set_backoffice_menu(null));
  }

  const sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  return (
    <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
      <Navbar
        className={
          "top-navbar " +
          (settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
        }
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={settings.activeLogoBg}
        >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="nav-toggler d-block d-md-none"
            onClick={() => showMobilemenu()}
          >
            <i className="ti-menu ti-close" />
          </span>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*-------------------------------------------------------------------------------*/}
          <Link className="navbar-brand" to="/">
            <b className="logo-icon">
              <img src={logoIcon} height="50" alt="homepage" className="dark-logo d-none d-md-inline" />
            </b>
            <span className="logo-text">
              <img src={logo} height="50" alt="homepage" className="dark-logo" />
            </span>
          </Link>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="topbartoggler d-block d-md-none"
            onClick={toggle.bind(null)}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={isOpen}
          navbar
          data-navbarbg={settings.activeNavbarBg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={() => sidebarHandler()}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            <NavItem>
              <NavLink href="#" className="">
                <span onClick={searchtoggle.bind(null)}>
                  <i className="ti-search" />
                </span>
                <Collapse isOpen={collapse}>
                  <form className="app-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search & enter"
                    />
                    <span className="srh-btn" onClick={searchtoggle.bind(null)}>
                      <i className="ti-close"></i>
                    </span>
                  </form>
                </Collapse>
              </NavLink>
            </NavItem>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Notifications Dropdown                                                   */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="mdi mdi-message font-18" />
              </DropdownToggle>
              <DropdownMenu right className="mailbox">
                <div className="d-flex no-block align-items-center p-3 border-bottom">
                  <h4 className="mb-0">4 New Notifications</h4>
                </div>
                <div className="message-center notifications">
                  {/*<!-- Message -->*/}
                  {data.notifications.map((notification, index) => {
                    return (
                      <span href="" className="message-item" key={index}>
                        <span
                          className={
                            "btn btn-circle btn-" + notification.iconbg
                          }
                        >
                          <i className={notification.iconclass} />
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">
                            {notification.title}
                          </h5>
                          <span className="mail-desc">{notification.desc}</span>
                          <span className="time">{notification.time}</span>
                        </div>
                      </span>
                    );
                  })}
                </div>
                <a className="nav-link text-center mb-1 text-dark" href=";">
                  <strong>Check all notifications</strong>{" "}
                  <i className="fa fa-angle-right" />
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Notifications Dropdown                                                     */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Messages Dropdown                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                  {(role === 'Vendedor') 
                    ?
                      <img
                        src={`data:image/png;base64,${logoshop}`}
                        alt="user"
                        className="rounded-circle"
                        width="31"
                      />
                    :
                      <img
                        src={profilephoto}
                        alt="user"
                        className="rounded-circle"
                        width="31"
                      />
                  }
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <div className="d-flex no-block align-items-center p-3 bg-white mb-2">
                  <div className="">
                    {(role === 'Vendedor') 
                    ?
                      <img
                        src={`data:image/png;base64,${logoshop}`}
                        alt="user"
                        className="rounded-circle"
                        width="60"
                      />
                    :
                      <img
                        src={profilephoto}
                        alt="user"
                        className="rounded-circle"
                        width="60"
                      />
                    }
                  </div>
                  <div className="ml-2">
                    <h4 className="mb-0 font-weight-bold">
                      {(role === 'Vendedor') ? shopName : account.name}
                    </h4>
                    <p className=" mb-0">
                      {(role === 'Vendedor') ? account.email : account.email}
                    </p>
                    <span className="badge badge-info">{backoffice.role.name}</span>
                  </div>
                </div>
                <DropdownItem>
                  <Link to="/perfil" className="text-secondary">
                    <i className="ti-user mr-1 ml-1" /> Mi Perfil
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/perfil" className="text-secondary">
                    <i className="ti-settings mr-1 ml-1" /> Configuración
                  </Link>
                </DropdownItem>
                <DropdownItem onClick={() => goToChangeRol()}>
                    <i className="mdi mdi-shape-plus mr-1 ml-1" /> Cambiar Rol
                </DropdownItem>
                <DropdownItem divider />
                  <button onClick={() => dispatch(handleLogout())} className="btn btn-rounded btn-primary mr-3 ml-3">
                    <i className="fa fa-power-off mr-1 ml-1" /> Cerrar sesión
                  </button>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
