import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);






  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar image={''} icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">""</div>
            <div className="user-name dropdown-indicator">ADMIN TEST</div>
          </div>
        </div>
      </DropdownToggle>
      {/* <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              {userInfo.name && (
                <span>{`${userInfo.name.split(" ")[0].charAt(0).toUpperCase()}${userInfo.name
                  .split(" ")[1]
                  .charAt(0)
                  .toUpperCase()}`}</span>
              )}
            </div>
            <div className="user-info">
              <span className="lead-text">{userInfo && userInfo.name}</span>
              <span className="sub-text">{userInfo && userInfo.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu> */}
    </Dropdown>
  );
};

export default User;
