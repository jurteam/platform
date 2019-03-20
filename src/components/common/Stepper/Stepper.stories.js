import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { State, Store } from "@sambego/storybook-state";

import Stepper from "./";
import Step from "../Step";
import Button from "../Button";

const store = new Store({
  steps: [
    {
      id: "1",
      label: "step 1"
    },
    {
      id: "2",
      label: "step 2"
    },
    {
      id: "3",
      label: "step 3"
    }
  ],
  activeStep: 0
});

const handleBack = () => {
  const currentActiveStep = store.get("activeStep");
  if (currentActiveStep - 1 < 0) return;
  store.set();
  store.set({ activeStep: store.get("activeStep") - 1 });
};

const handleNext = () => {
  if (store.get("activeStep") + 1 >= store.get("steps").length) {
    alert("Finish event fired");
  } else {
    store.set({ activeStep: store.get("activeStep") + 1 });
  }
};

storiesOf("Stepper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <State store={store}>
      {state => {
        const activeStep = store.get("activeStep");
        const last = activeStep + 1 === store.get("steps").length;
        return (
          <>
            <Stepper activeStep={activeStep}>
              {store.get("steps").map((step, index) => (
                <Step key={step.id.toString()}>{step.label}</Step>
              ))}
            </Stepper>
            {activeStep !== 0 &&
              activeStep + 1 !== store.get("steps").length && (
                <Button onClick={handleBack}>Previous</Button>
              )}
            <Button
              onClick={handleNext}
              variant={last ? "gradient" : "contained"}
            >
              {last ? "Finish" : "Next"}
            </Button>
          </>
        );
      }}
    </State>
  ));
