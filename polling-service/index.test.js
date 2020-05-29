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

  const currentBlockContents = fs.readFileSync("config/currentBlock.json");
  it("checks if currentBlock.js has contents", () => {
    expect(currentBlockContents).toBeTruthy();
  });

  it("checks if currentBlock is a number", () => {
    const currentBlock = JSON.parse(currentBlockContents).currentBlock;
    expect(typeof currentBlock).toBe("number");
  });
});
