import React from "react";
import LogoLight2x from "../../images/hotak.png";
import LogoSmall from "../../images/hotak.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      <img className="logo-dark " style={{ width: '150px' }} src={LogoLight2x} alt="logo" />
      <img className="logo-small logo-img logo-img-small d-none" src={LogoSmall} alt="logo" />
    </Link>
  );
};

export default Logo;
