import React, { useState, Fragment, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {set_role, set_backoffice_menu} from '../../../redux/backoffice/Actions'
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as data from "./Data";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import profilephoto from "../../../assets/images/users/user.png";

import logo from "../../../assets/images/pampatar/pampatar_color_1.png";
import logoIcon from "../../../assets/images/pampatar/isotipo_color.png";
import { handleLogout, set_notifications } from "../../../redux/session/Actions";
import DefaultUser from "../../../components/files/DefaultUser";

export default () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [collapse, setCollapse] = useState(false);

  const [loading, setloading]   = useState(true);
  const [search, setsearch]     = useState(true);

  const session     = useSelector(state => state.session);
  const settings    = useSelector((state) => state.settings);
  const backoffice  = useSelector((state) => state.backoffice);
  const dispatch    = useDispatch();

  let shopName  = "";
  let role      = backoffice.role.name;
  let roleId    = backoffice.role.id;
  let account   = session.userData.account;
  let logoshop  = '';

  const history = useHistory();

  if(role == 'Vendedor' || role == 'Comprador'){
    shopName = session.userData.shop.name;
  }

  if(role === 'Vendedor' && session.storeLogo !== null){
    logoshop = session.storeLogo.reduce(
      function (data, byte) {
          return data + String.fromCharCode(byte);
      },
      ''
    );
  }

  const getData = () => {
    console.log("Buscando notificaciones");
    dispatch(set_notifications(roleId));

    setloading(false);
  }
  
  const watchChangeRoute = () => {
    history.listen((location) => { 
      getData();
    });
  }

  useEffect(() => {
    if(loading){
      if(search){
        setsearch(false);
        getData();
        watchChangeRoute();
      }
    }
  });

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

  //console.log(session.notifications);

  let countMessages = 0;

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
              <NavLink href="#" className="d-none">
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
              <DropdownToggle id="toggleNotificationsBtn" nav caret>
                <i className="mdi mdi-bell font-18" />
              </DropdownToggle>
              <DropdownMenu right className="mailbox">
                <div className="d-flex no-block align-items-center p-3 border-bottom">
                  <h5 className="mb-0 text-muted">Notificaciones</h5>
                </div>
                <div className="message-center notifications">

                  {typeof session.notifications === "object" && session.notifications.hasOwnProperty("rows") && session.notifications.count > 0 && session.notifications.rows.map((notification, index) => {
                    
                    countMessages++;
                    
                    if(countMessages <= 3){
                      return (
                        <Link onClick={() => document.getElementById("toggleNotificationsBtn").click()} to={`/notifications/view/${notification.id}`} className="message-item" key={index}>
                          <span
                            className={
                              "btn btn-circle btn-primary"
                            }
                          >
                            <i className={"mdi mdi-message"} />
                          </span>
                          <div className="mail-contnet">
                            <h5 className="message-title">
                              {notification.body.title}
                            </h5>
                            <span className="mail-desc">
                              {notification.body.text}
                            </span>
                            <span className="time d-none">{notification.time}</span>
                          </div>
                        </Link>
                      );
                    }else{
                      return ""
                    }
                  })}

                  {typeof session.notifications === "object" && session.notifications.hasOwnProperty("rows") && session.notifications.count <= 0 &&
                    <span href="" className="message-item">
                        <span
                          className={
                            "btn btn-circle btn-info"
                          }
                        >
                          <i className="fa fa-exclamation-triangle" />
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">
                            Sin notificaciones
                          </h5>
                        </div>
                      </span>
                  }


                  {typeof session.notifications === "object" && session.notifications.hasOwnProperty("data") && session.notifications.data.result === false &&
                    <span href="" className="message-item">
                        <span
                          className={
                            "btn btn-circle btn-info"
                          }
                        >
                          <i className="fa fa-exclamation-triangle" />
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">
                            Sin notificaciones
                          </h5>
                        </div>
                      </span>
                  }

                </div>
                <Link to="/notifications/list/" onClick={() => document.getElementById("toggleNotificationsBtn").click()} className="nav-link text-info text-center mb-0 text-dark" href=";">
                    Ver lista completa
                    <i className="ml-3 fa fa-angle-right" />
                </Link>
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
                      <Fragment>
                      {(logoshop !== "")
                        ?
                          <img
                            src={`data:image/png;base64,${logoshop}`}
                            alt="user"
                            className="rounded-circle"
                            width="31"
                            height="31"
                          />
                        :
                          <img
                            src={profilephoto}
                            alt="user"
                            className="rounded-circle"
                            width="31"
                            height="31"
                          />
                      }
                      </Fragment>
                    :
                      <img
                        src={profilephoto}
                        alt="user"
                        className="rounded-circle"
                        width="31"
                        height="31"
                      />
                  }
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
                    <div className="">
                      {(role === 'Vendedor') 
                        ?
                          <Fragment>
                            {(logoshop !== "")
                              ?
                                <img
                                  src={`data:image/png;base64,${logoshop}`}
                                  alt="user"
                                  className="rounded-circle"
                                  width="60"
                                  height="60"
                                />
                              :
                                <img
                                  src={profilephoto}
                                  alt="user"
                                  className="rounded-circle"
                                  width="60"
                                  height="60"
                                />
                            }
                          </Fragment>
                        :
                          <img
                            src={profilephoto}
                            alt="user"
                            className="rounded-circle"
                            width="60"
                            height="60"
                          />
                      }
                    </div>
                    <div className="ml-2">
                      <h4 className="mb-0">
                        {(role === 'Vendedor') ? shopName : account.name}
                      </h4>
                      <p className=" mb-0">
                        {(role === 'Vendedor') ? account.email : account.email}
                      </p>
                      <span className="badge badge-light font-weight-bold text-info">{backoffice.role.name}</span>
                    </div>
                </div>
                <div className="d-none no-block align-items-center p-3 bg-white mb-2">
                
                  <div className="">
                    {(role === 'Vendedor') 
                      ?
                        <Fragment>
                        {(logoshop !== "")
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
                        </Fragment>
                      :
                        <img
                          src={profilephoto}
                          alt="user"
                          className="rounded-circle"
                          width="31"
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
                <DropdownItem onClick={() => goToChangeRol()}>
                    <i className="mdi mdi-shape-plus mr-1 ml-1" /> Cambiar Rol
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => dispatch(handleLogout())}>
                  <i className="fa fa-power-off mr-1 ml-1" /> Cerrar sesión
                </DropdownItem>
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
