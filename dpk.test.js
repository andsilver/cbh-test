const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the string when given integer partition key", () => {
    const event = {partitionKey: 123};
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toEqual("123");
  });

  it("Returns the hash digest when given invalid partitionKey", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);

    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");

    expect(trivialKey).toEqual(candidate);
  });

  it("Returns the hash digest when given partitionKey with more than maximum length", () => {
    const length = 300;
    const partitionKey = Array(length).fill(1).join("");
    const event = {partitionKey};
    const trivialKey = deterministicPartitionKey(event);

    candidate = crypto.createHash("sha3-512").update(partitionKey).digest("hex");

    expect(trivialKey).toEqual(candidate);
  });
});
