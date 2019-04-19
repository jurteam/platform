import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import PageLayout from "../../common/PageLayout";
import Button from "../../common/Button";

import Modal from "../../common/Modal";
import ModalHeader from "../../common/ModalHeader";
import ModalBody from "../../common/ModalBody";
import ModalFooter from "../../common/ModalFooter";

import Step from "../../common/Step";
import Stepper from "../../common/Stepper";

import { steps } from "../../../assets/i18n/en/tutorial.json";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const Home = (props) => {

  const [activeStep, setActiveStep] = useState(0); // first

  const closeTutorial = () => {
    const { setTutorialViewed } = props;
    setTutorialViewed();
  }

  const handleBack = () => {
    if (activeStep - 1 < 0) return;
    setActiveStep(activeStep - 1);
  }

  const handleNext = () => {
    if (activeStep + 1 >= steps.length) {
      closeTutorial();
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  const { labels } = useContext(AppContext);

  const renderStepper = () => {
    const last = activeStep + 1 === steps.length;
    return (
      <>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={`step-${index}`}>
              <ModalHeader title={step.label} />
              <ModalBody dangerouslySetInnerHTML={{ __html: step.body }} />
            </Step>
          ))}
        </Stepper>
        <ModalFooter>
          {activeStep !== 0 && activeStep + 1 !== steps.length && (
            <Button onClick={handleBack} size="medium" variant="raised">{labels.previous}</Button>
          )}
          <Button
            onClick={handleNext}
            size="medium"
            variant={last ? "gradient" : "contained"}
          >
            {last ? labels.finish : labels.next}
          </Button>
        </ModalFooter>
      </>
    );
  }

  const { app } = props;
  const { tutorial } = app;
  return (
    <PageLayout>
      {!tutorial ? (
        <Modal isOpen={true} onRequestClose={closeTutorial} key={`stepper-${activeStep}`}>
          {renderStepper()}
        </Modal>
      ) : (
        <Redirect to="/contracts" />
      )}
    </PageLayout>
  );
}
