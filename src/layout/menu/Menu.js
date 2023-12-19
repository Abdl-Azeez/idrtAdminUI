import React, { useEffect, useState } from "react";
import adminMenuData from "./adminMenuData";
import agentMenuData from "./agentMenuData";
import merchantMenuData from "./merchantMenuData";
import { NavLink, Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const getMenuData = (role) => {
  switch (role) {
    case "ADMIN":
      return adminMenuData;
    case "AGENT":
      return agentMenuData;
    default:
      return merchantMenuData;
  }
};

const MenuHeading = ({ heading }) => {
  return (
    <li className="nk-menu-heading">
      <h6 className="overline-title text-primary-alt">{heading}</h6>
    </li>
  );
};

const MenuItem = ({ icon, link, text, sub, newTab, mobileView, sidebarToggle, badge, setActiveMenuItem, activeMenuItem, ...props }) => {
  const toggleActionSidebar = (e) => {
    if (!sub && !newTab && mobileView) {
      sidebarToggle(e);
    }
  };

  const handleMenuItemClick = () => {
    setActiveMenuItem(link);
    toggleActionSidebar();
  };

  const menuItemClass = classNames({
    "nk-menu-item": true,
    "has-sub": sub,
    "active current-page": activeMenuItem === link,
  });
  useEffect(() => {
    const currentUrl = window.location.pathname;
    setActiveMenuItem(currentUrl);
  }, []);
  return (
    <li className={menuItemClass} onClick={handleMenuItemClick}>
      {newTab ? (
        <Link
          to={`${process.env.PUBLIC_URL + link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nk-menu-link"
        >
          {icon ? (
            <span className="nk-menu-icon">
              <i className={`${icon}`}></i>
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
        </Link>
      ) : (
        <NavLink
          to={`${process.env.PUBLIC_URL + link}`}
          className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
          onClick={sub ? handleMenuItemClick : null}
        >
          {icon ? (
            <span className="nk-menu-icon">
              <i className={`${icon}`}></i>
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          {badge && <span className="nk-menu-badge">{badge}</span>}
        </NavLink>
      )}
      {sub ? (
        <div className="nk-menu-wrap">
          <MenuSub sub={sub} sidebarToggle={sidebarToggle} mobileView={mobileView} />
        </div>
      ) : null}
    </li>
  );
};

const PanelItem = ({ icon, link, text, subPanel, index, data, setMenuData, ...props }) => {
  const menuItemClass = classNames({
    "nk-menu-item": true,
  });

  if (data === adminMenuData || data === agentMenuData || data === merchantMenuData) {
    return (
      <li className={menuItemClass}>
        <Link
          to={`${process.env.PUBLIC_URL}${link}`}
          className="nk-menu-link"
          onClick={() => setMenuData([data[index]])}
        >
          {icon ? (
            <span className="nk-menu-icon">
              {/* <Icon name={icon} /> */}
            </span>
          ) : null}
          <span className="nk-menu-text">{text}</span>
          <span className="nk-menu-badge">HOT</span>
        </Link>
      </li>
    );
  } else {
    return (
      <React.Fragment>
        {subPanel.map((item) => (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            setActiveMenuItem={() => { }}
            activeMenuItem={null}
          />
        ))}
        <MenuHeading heading="Return to" />
        <li className={menuItemClass}>
          <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(data)}>
            <span className="nk-menu-icon">
              {/* <Icon name="dashlite-alt" /> */}
            </span>
            <span className="nk-menu-text">Main Dashboard</span>
          </Link>
        </li>
        <li className={menuItemClass}>
          <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link" onClick={() => setMenuData(data)}>
            <span className="nk-menu-icon">
              {/* <Icon name="layers-fill" /> */}
            </span>
            <span className="nk-menu-text">All Components</span>
          </Link>
        </li>
      </React.Fragment>
    );
  }
};

const MenuSub = ({ sub, sidebarToggle, mobileView, ...props }) => {
  return (
    <ul className="nk-menu-sub" style={props.style}>
      {sub.map((item) => (
        <MenuItem
          link={item.link}
          icon={item.icon}
          text={item.text}
          sub={item.subMenu}
          key={item.text}
          newTab={item.newTab}
          badge={item.badge}
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
          setActiveMenuItem={() => { }}
          activeMenuItem={null}
        />
      ))}
    </ul>
  );
};

const Menu = ({ sidebarToggle, mobileView }) => {
  const [data, setMenuData] = useState([]);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("idrtRole") ? JSON.parse(localStorage.getItem("idrtRole")) : null;
    const menuData = getMenuData(role);
    setMenuData(menuData);

    // Set initial active menu item based on the current URL path
    setActiveMenuItem(location.pathname);
  }, [location.pathname]);

  return (
    <ul className="nk-menu">
      {data.map((item, index) =>
        item.heading ? (
          <MenuHeading heading={item.heading} key={item.heading} />
        ) : item.panel ? (
          <PanelItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            index={index}
            panel={item.panel}
            subPanel={item.subPanel}
            data={data}
            setMenuData={setMenuData}
          />
        ) : (
          <MenuItem
            key={item.text}
            link={item.link}
            icon={item.icon}
            text={item.text}
            sub={item.subMenu}
            badge={item.badge}
            panel={item.panel}
            subPanel={item.subPanel}
            sidebarToggle={sidebarToggle}
            mobileView={mobileView}
            setActiveMenuItem={setActiveMenuItem}
            activeMenuItem={activeMenuItem}
          />
        )
      )}
    </ul>
  );
};

export default Menu;
