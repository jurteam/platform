import React, { Component } from "react";
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

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.closeTutorial = this.closeTutorial.bind(this);
  }
  componentDidMount() {}

  closeTutorial() {
    const { setTutorialViewed } = this.props;
    setTutorialViewed();
  }

  handleBack() {
    const { activeStep } = this.state;
    if (activeStep - 1 < 0) return;
    this.setState({ activeStep: activeStep - 1 });
  }

  handleNext() {
    const { activeStep } = this.state;
    if (activeStep + 1 >= steps.length) {
      this.closeTutorial();
    } else {
      this.setState({ activeStep: activeStep + 1 });
    }
  }

  renderStepper() {
    const { activeStep } = this.state;
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
            <Button onClick={this.handleBack} size="medium" variant="raised">
              Previous
            </Button>
          )}
          <Button
            onClick={this.handleNext}
            size="medium"
            variant={last ? "gradient" : "contained"}
          >
            {last ? "Finish" : "Next"}
          </Button>
        </ModalFooter>
      </>
    );
  }

  render() {
    const { app } = this.props;
    const { tutorial } = app;
    return (
      <PageLayout>
        {!tutorial ? (
          <Modal isOpen={true} onRequestClose={this.closeTutorial}>
            {this.renderStepper()}
          </Modal>
        ) : (
          <Redirect to="/contracts" />
        )}
      </PageLayout>
    );
  }
}
