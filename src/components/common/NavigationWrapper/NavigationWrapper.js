import React from "react";

import MainNav from "../MainNav";
import ProfilePreview from "../ProfilePreview";

export const NavigationWrapper = ( props ) => (
  <>
    <MainNav />
    <ProfilePreview {...props} />
  </>
);
