import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import { ProfileSettings } from "../PageExamples/ProfileSettings";
import { ProfilePrivacy } from "../PageExamples/ProfilePrivacy";
import { ProfileNotification } from "../PageExamples/ProfileNotification";
import { ProfileFaq } from "../PageExamples/ProfileFaq";
import { ProfileTerms } from "../PageExamples/ProfileTerms";
import { ContractsEmpty } from "../PageExamples/ContractsEmpty";
import { ContractsFull } from "../PageExamples/ContractsFull";
import { CreateContract } from "../PageExamples/CreateContract";
import { SetContractDetails } from "../PageExamples/SetContractDetails";

storiesOf("Layouts", module)
.addDecorator(withInfo)
  .addParameters({
    user: {
      wallet: "0x55fe02aeff02f77364de339a1292923a15844b8"
    }
  })
  .add("Profile page", () => <ProfileSettings />)
  .add("Profile privacy", () => <ProfilePrivacy />)
  .add("Profile notification", () => <ProfileNotification />)
  .add("Profile Faq", () => <ProfileFaq />)
  .add("Profile Terms", () => <ProfileTerms />)
  .add("Contract Empty", () => <ContractsEmpty />)
  .add("Contract Full", () => <ContractsFull user={{
    wallet: "0x55fe02aeff02f77364de339a1292923a15844b8"
  }} />)
  .add("Create Contract", () => <CreateContract />)
  .add("Set contracts details", () => <SetContractDetails />);
