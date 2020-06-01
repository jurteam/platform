const format = require("./transformer").format;

describe("Transformer", () => {
  it("checks that format is a function", () => {
    expect(typeof format).toBe("function");
  });

  it("checks shape of format's return", () => {
    const emptyValidResult = { data: {}, fields: [] };
    expect(format(emptyValidResult)).toBeTruthy();
  });
});
