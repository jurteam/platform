import React, { useState } from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { State, Store } from "@sambego/storybook-state";

import Modal from "./";
import Button from "../Button";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";

const store = new Store({
  isOpen: false
});

storiesOf("Modal", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("default", () => (
    <div>
      {/* Trigger Modal open state */}
      <Button onClick={() => store.set({ isOpen: true })}>Open Modal</Button>
      <State store={store}>
        {/* Modal start */}
        <Modal
          isOpen={store.get("isOpen")}
          onRequestClose={() => store.set({ isOpen: false })}
        >
          <ModalHeader title="Welcome to JUR">
            <p>Please take some time to understand this for your own safety.</p>
          </ModalHeader>
          <ModalBody>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Proin eu nisl pellentesque, vestibulum urna
              eget, fermentum dui. Mauris eget lacinia quam, at tincidunt nisl.
              Phasellus ultricies lectus vitae volutpat.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button size="medium" variant="raised">
              Previous
            </Button>
            <Button size="medium" variant="contained">
              Next
            </Button>
            <Button size="medium" variant="gradient">
              Finish
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal end */}
      </State>
    </div>
  ));
