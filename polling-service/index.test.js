const fs = require("fs");

describe("Sample test", () => {
  it("checks for canonical true", () => {
    expect(true).toEqual(true);
  });
});

describe("Environment", () => {
  it("checks if .env is present", () => {
    expect(fs.existsSync(".env")).toEqual(true);
  });

  const envContents = fs.readFileSync(".env", "utf-8");
  it("checks if .env has contents", () => {
    expect(envContents).toBeTruthy();
  });

  it("checks if .env has thor", () => {
    expect(envContents).toMatch(/THOR_CONNECTION_URL=http/);
  });

  it("checks if .env has amqp", () => {
    expect(envContents).toMatch(/AMQP_URL=amqp/);
  });

  const lastConsumedContents = fs.readFileSync(
    "config/last-consumed-block.json"
  );
  it("checks if last-consumed-block.js has contents", () => {
    expect(lastConsumedContents).toBeTruthy();
  });

  it("checks if blockNumber is present", () => {
    const blockNumber = JSON.parse(lastConsumedContents).blockNumber;
    expect(blockNumber).toBeTruthy();
  });
});
