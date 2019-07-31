import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // App Context

import Page from "../../../components/common/Page";
import Content from "../../../components/common/Content";
import { FakeHeader } from "../../../components/common/Header";
import Unlock from "../../../components/auth/Unlock";

const CometRequired = () => {
  const { cometLoading } = useContext(AppContext);

  return !cometLoading ? (
    <Page>
      <FakeHeader />
      <Content>
        <Unlock />
      </Content>
    </Page>
  ) : null;
};

export default CometRequired;
