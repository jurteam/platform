const format = require("./transformer").format;

const emptyValidTransaction = { data: {}, fields: [] };
const mockTransaction = { data: {}, contractName: "Test 1", fields: [] };
const expectedTransaction = { assetIdentifier: "Test 1" };

describe("Transformer", () => {
  it("checks that format is a function", () => {
    expect(typeof format).toBe("function");
  });

  it("checks if works with minimal record", () => {
    expect(format(emptyValidTransaction)).toBeTruthy();
  });

  it("checks if transforms the record", () => {
    expect(format(mockTransaction)).toEqual(
      expect.objectContaining(expectedTransaction)
    );
  });
});
