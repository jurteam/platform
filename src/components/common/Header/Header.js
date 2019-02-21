import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

import Logo from "../Logo";
import MainNav from "../MainNav";
import ProfilePreview from "../ProfilePreview";

export const Header = ({ wallet }) => {
  return (
    <header className="jur-header">
      {typeof wallet !== "undefined" ? (
        <>
          <Link to="/">
            <Logo />
          </Link>
          <MainNav />
          <ProfilePreview
            name={wallet.user.name || null}
            seed={wallet.address || ""}
            shouldRenderName
            balance={wallet.balance}
            to="/profile"
          />
        </>
      ) : (
        <Logo />
      )}
    </header>
  );
};

export default Header;
