import { makeKey, setSlotState } from "./AdvocateHelpers";
import slots from "../__tests__/slots.mock.json";

describe("AdvocateHelpers", () => {
  it("makes slot key", () => {
    const slot = { activityScId: 12, slotScId: 32 };
    const expectedKey = "12*32";
    expect(makeKey(slot)).toEqual(expectedKey);
  });

  it("sets slot's state", () => {
    const state = "Completed";
    const payload = { activityScId: 15, slotScId: 0 };
    const output = setSlotState(state, payload, slots);
    expect(output[2].attributes.state).toBe(state);
  });
});
