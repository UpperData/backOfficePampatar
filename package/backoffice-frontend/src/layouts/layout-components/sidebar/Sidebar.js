import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";

import profile from "../../../assets/images/users/5.jpg";

const Sidebar = (props) => {
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "selected" : "";
  };
  const [state, setState] = useState({
    authentication: activeRoute("/authentication") !== "" ? true : false,
    uicomponents: activeRoute("/ui-components") !== "" ? true : false,
    samplepages: activeRoute("/sample-pages") !== "" ? true : false,
    dashboardpages: activeRoute("/dashboards") !== "" ? true : false,
    iconsPages: activeRoute("/icons") !== "" ? true : false,
    formlayoutPages: activeRoute("/form-layouts") !== "" ? true : false,
    formpickerPages: activeRoute("/form-pickers") !== "" ? true : false,
  });
  const [cstate, csetState] = useState({
    extrapages: activeRoute("/sample-pages/extra-pages") !== "" ? true : false,
  });
  const settings = useSelector((state) => state.settings);

  /*--------------------------------------------------------------------------------*/
  /*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
  /*--------------------------------------------------------------------------------*/
  const expandLogo = () => {
    document.getElementById("logobg").classList.toggle("expand-logo");
  };
  /*--------------------------------------------------------------------------------*/
  /*Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------*/
  /*Its for scroll to to                    */
  /*--------------------------------------------------------------------------------*/

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const toggle = () => {
    setState((state) => ({ collapse: !state.collapse }));
  };

  return (
    <aside
      className="left-sidebar"
      id="sidebarbg"
      data-sidebarbg={settings.activeSidebarBg}
      onMouseEnter={expandLogo.bind(null)}
      onMouseLeave={expandLogo.bind(null)}
    >
      <div className="scroll-sidebar">
        <PerfectScrollbar className="sidebar-nav">
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar Menus will go here                                                */}
          {/*--------------------------------------------------------------------------------*/}
          <Nav id="sidebarnav">
            <li className="sidebar-item user-profile">
              <span
                onClick={toggle}
                className="sidebar-link has-arrow"
                aria-expanded="false"
              >
                <img src={profile} alt="user" />
                <span className="hide-menu">Steave Jobs </span>
              </span>
              <Collapse isOpen={state.collapse}>
                <ul>
                  <li>
                    <a
                      href="/cuenta/perfil"
                      className="sidebar-link p-0"
                    >
                      Mi perfil
                    </a>
                  </li>
                  <li>
                    <a href="/email" className="sidebar-link p-0">
                      Configuración
                    </a>
                  </li>
                  <li>
                    <a
                      href="/authentication/login"
                      className="sidebar-link p-0"
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </Collapse>
            </li>
            {props.routes.map((prop, key) => {
              if (prop.redirect) {
                return null;
              } else if (prop.navlabel) {
                return (
                  <li className="nav-small-cap" key={key}>
                    <i className={prop.icon}></i>
                    <span className="hide-menu">{prop.name}</span>
                  </li>
                );
                /*--------------------------------------------------------------------------------*/
                /* Child Menus wiil be goes here                                                    */
                /*--------------------------------------------------------------------------------*/
              } else if (prop.collapse) {
                let firstdd = {};
                firstdd[prop.state] = !state[prop.state];

                return (
                  <li
                    className={activeRoute(prop.path) + " sidebar-item"}
                    key={key}
                  >
                    <span
                      data-toggle="collapse"
                      className="sidebar-link has-arrow"
                      aria-expanded={state[prop.state]}
                      onClick={() => setState(firstdd)}
                    >
                      <FeatherIcon icon={prop.icon} />
                      {/* <i className={prop.icon} /> */}
                      <span className="hide-menu">{prop.name}</span>
                    </span>
                    <Collapse isOpen={state[prop.state]}>
                      <ul className="first-level">
                        {prop.child.map((prop, key) => {
                          if (prop.redirect) return null;

                          /*--------------------------------------------------------------------------------*/
                          /* Child Sub-Menus wiil be goes here                                                    */
                          /*--------------------------------------------------------------------------------*/

                          if (prop.collapse) {
                            let seconddd = {};
                            seconddd[prop["cstate"]] = !cstate[prop.cstate];
                            return (
                              <li
                                className={
                                  activeRoute(prop.path) + " sidebar-item"
                                }
                                key={key}
                              >
                                <span
                                  data-toggle="collapse"
                                  className="sidebar-link has-arrow"
                                  aria-expanded={cstate[prop.cstate]}
                                  onClick={() => csetState(seconddd)}
                                >
                                  <i className={prop.icon} />
                                  <span className="hide-menu">{prop.name}</span>
                                </span>
                                <Collapse isOpen={cstate[prop.cstate]}>
                                  <ul className="second-level">
                                    {prop.subchild.map((prop, key) => {
                                      if (prop.redirect) return null;
                                      return (
                                        <li
                                          className={
                                            activeRoute(prop.path) +
                                            " sidebar-item"
                                          }
                                          key={key}
                                        >
                                          <NavLink
                                            to={prop.path}
                                            activeClassName="active"
                                            className="sidebar-link"
                                          >
                                            <i className={prop.icon} />
                                            <span className="hide-menu">
                                              {" "}
                                              {prop.name}
                                            </span>
                                          </NavLink>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Collapse>
                              </li>
                            );
                          } else {
                            return (
                              <li
                                onClick={showMobilemenu && scrollTop}
                                className={
                                  activeRoute(prop.path) +
                                  (prop.pro ? " active active-pro" : "") +
                                  " sidebar-item"
                                }
                                key={key}
                              >
                                <NavLink
                                  to={prop.path}
                                  className="sidebar-link"
                                  activeClassName="active"
                                >
                                  <i className={prop.icon} />
                                  <span className="hide-menu">{prop.name}</span>
                                </NavLink>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </Collapse>
                  </li>
                );
              } else {
                return (
                  /*--------------------------------------------------------------------------------*/
                  /* Adding Sidebar Item                                                            */
                  /*--------------------------------------------------------------------------------*/
                  <li
                    onClick={scrollTop}
                    className={
                      activeRoute(prop.path) +
                      (prop.pro ? " active active-pro" : "") +
                      " sidebar-item"
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <FeatherIcon icon={prop.icon} />
                      {/* <i className={prop.icon} /> */}
                      <span className="hide-menu">{prop.name}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </Nav>
        </PerfectScrollbar>
      </div>
    </aside>
  );
};

export default Sidebar;
