import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import DisputeMainAccordions from "./";

storiesOf("DisputeMainAccordions", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <DisputeMainAccordions
      details={{
        kpi: {
          label: "KPI of the contracts",
          message:
            "0x55fe002aeff02f77364de339a1292923a15844b8 should deliver three draft of high quality (reference in the attachments) within 5 days of the acceptance of the contract. The designer has to make 2 revisions for each draft within 3 days. They will be specified within 24 hours from the delivery of the initial drafts. The terms are very clear if 0x55fe002aeff02f77364de339a1292923a15844b8 does not deliver according to the above timeline we should have a complete refund as timeline is very important to us. The logo quality should be comparable to those already present in the designer portfolio.  Deliverables should be uploaded in a shared Google Drive folder and should consists in the following format for each draft: .PDF, .PSD/.AI/.SKETCH, .PNG. In case the work of 0x55fe002aeff02f77364de339a1292923a15844b8 is not appreciated by us but still meets all the above criterias then she should get a reduced payment in the terms described in the signed contract."
        },
        resolution: {
          label: "Resolution Proof",
          message:
            "0x55fe002aeff02f77364de339a1292923a15844b8 should upload all the deliverables in the Google Drive folder at the following link http://goo.gl/logo-design (test here same origin url: http://localhost:9009/testSameOrigin ), which will be made public in case of dispute. Oracles would be able to see each deliverable and can also check email extracts between the parties for the revisions requested."
        }
      }}
      files={[
        {
          name: "hello.pdf"
        }
      ]}
    />
  ));
