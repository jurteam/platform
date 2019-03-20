import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

import Logo from "../Logo";
import MainNav from "../MainNav";
import ProfilePreview from "../ProfilePreview";

export const Header = ({ wallet, user, app }) => {
  const renderLogo = () => {
    const { tutorial } = app;
    if (typeof app === "undefined" || tutorial) return <Logo />;
    return (
      <Link to="/">
        <Logo />
      </Link>
    );
  };
  return (
    <header className="jur-header">
      {typeof wallet !== "undefined" ? (
        <>
          {renderLogo()}
          <MainNav />
          <ProfilePreview
            name={user.name || null}
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
