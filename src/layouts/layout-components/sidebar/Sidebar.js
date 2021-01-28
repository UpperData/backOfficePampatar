import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";

import DefaultUser from "../../../components/files/DefaultUser";

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; 

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
  const session = useSelector(state => state.session);
  const backoffice = useSelector(state => state.backoffice);
  //const dispatch = useDispatch();


  //VARIABLES
  let shopName = session.userData.shop.name;
  let role = backoffice.role.name;
  //let account = session.userData.account;


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

  /*
  const toggle = () => {
    setState((state) => ({ collapse: !state.collapse }));
  };
  */

  useEffect(() => {
    tippy('[data-tippy-content]',{
      theme: 'pampatar'    
    });
  });

  /*
  function slugify(str)
  {
      str = str.replace(/^\s+|\s+$/g, '');

      // Make the string lowercase
      str = str.toLowerCase();

      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '') 
      // Collapse dashes
      .replace(/-+/g, ''); 

      return str;
  }
  */

  //console.log(backoffice.menu);

  const formatRoutesByRoleToSidebar = (routes) => {
    let formattedRoutes = [];

    for (let i = 0; i < routes.length; i++) {
      const thisRoute = routes[i];
      const thisRouteData = thisRoute;

      //console.log(thisRouteData);
      //console.log(slugify(thisRouteData.module));

      let thisRouteFormatted        = {};
      thisRouteFormatted.navlabel   = null;
      thisRouteFormatted.collapse   = (thisRouteData.sModule.length > 0) ? true : false;
      thisRouteFormatted.path       = '/';
      thisRouteFormatted.name       = thisRouteData.module;
      thisRouteFormatted.icon       = thisRouteData.icon;

      if(thisRouteData.sModule.length > 0){
        let subpages = [];
        thisRouteFormatted.state = thisRouteData.module;

        for (let j = 0; j < thisRouteData.sModule.length; j++) {
          let thisSubPage         = thisRouteData.sModule[j];
          let thisSubPageData     = {};
          thisSubPageData.icon    = '';
          thisSubPageData.name    =  thisSubPage.name;
          //277
          thisSubPageData.desc    =  thisSubPage.desc;
          thisSubPageData.subkey  =  thisSubPage.id;
          thisSubPageData.path    =  thisSubPage.route;

          subpages.push(thisSubPageData);
        }

        thisRouteFormatted.child = subpages;
      }

      formattedRoutes.push(thisRouteFormatted);
    }

    return formattedRoutes;
  }

  let renderRoutes = props.routes;
  let routesByRole = null;

  if(backoffice.menu !== null){
    routesByRole = formatRoutesByRoleToSidebar(backoffice.menu);
    renderRoutes = renderRoutes.concat(routesByRole);
  }

  let logoshop = '';
  if(role === 'Vendedor' && session.storeLogo !== null){
    //logoshop = String.fromCharCode.apply(null, session.storeLogo);
    logoshop = session.storeLogo.reduce(
        function (data, byte) {
            return data + String.fromCharCode(byte);
        },
        ''
    );
    //console.log(session.storeLogo);
    //console.log(logoshop);
  }

  return (
    <Fragment>
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
            <li className="nav-small-cap d-none">
              <i className=""></i>
              <span className="hide-menu">Mi tienda</span>
            </li>
            <li className="sidebar-item user-profile" id="sidebarstorename">
                <NavLink
                  to="/perfil"
                  activeClassName="active"
                  className="sidebar-link p-0"
                >
                {
                (role === 'Vendedor') 
                  ?
                    <img
                      src={`data:image/png;base64,${logoshop}`}
                      alt="user"
                      className="rounded-circle mr-3"
                      width="30"
                    />
                  :
                    <img
                      src={`data:image/png;base64,${DefaultUser}`}
                      alt="user"
                      className="rounded-circle mr-3"
                      width="30"
                    />
                }
                <span className="hide-menu">
                  {(role === 'Vendedor') ? shopName : role}
                </span>
              </NavLink>
            </li>
            {renderRoutes.map((prop, key) => {
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
              } else if (prop.onlyRoute) {
                return null;
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
                      <i className={prop.icon} />
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
                              <Fragment key={key}>
                                <li
                                  onClick={showMobilemenu && scrollTop}
                                  className={
                                    activeRoute(prop.path) +
                                    (prop.pro ? " active active-pro" : "") +
                                    " sidebar-item content-sidebar-tooltip-faded"
                                  }
                                  data-tippy-content={prop.desc}
                                  data-tippy-placement='right'
                                >
                                  <NavLink
                                    to={prop.path}
                                    className="sidebar-link"
                                    activeClassName="active"
                                  >
                                      <i className={prop.icon} />
                                      <span className="hide-menu">
                                        {prop.name}
                                      </span>
                                  </NavLink>
                                </li>
                              </Fragment>
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

    {/*
      <UncontrolledTooltip 
        placement="left" 
        className="super-tooltip"
        target="sidebarstorename"
        trigger="click"
      >
        Nombre de la tienda
      </UncontrolledTooltip>
    */}
    
    {/*renderRoutes.map((prop, key) => {
        if (prop.collapse) {
          return prop.child.map((subprop, subkey) => {
              //console.log(subprop);
              if (!subprop.collapse) {
                  //console.log(`tooltip-nav-${subprop.subkey}`);
                  return  <UncontrolledTooltip 
                            key={subkey} 
                            placement="left" 
                            className="super-tooltip"
                            trigger="click"
                            target={`tooltip-nav-${subprop.subkey}`}
                          >
                            {subprop.desc}
                          </UncontrolledTooltip>
              }
          })
        }
      })*/}
    </Fragment>
  );
};

export default Sidebar;
