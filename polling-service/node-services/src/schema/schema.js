const transactionHashSchema = {
  type: "object",
  required: ["transactionHash"],
  properties: {
    transactionHash: {
      type: "string"
    }
  }
};

const blockNumberSchema = {
  required: ["blockNumber"],
  blockNumber: {
    type: "integer"
  }
};

const bodyJsonSchema = {
  type: "object",
  required: ["block"],
  required: ["contracts"],
  properties: {
    contracts: {
      type: "array",
      minItems: 1,
      items: {
        address: { type: "string" },
        assetName: { type: "string" },
        abi: { type: "array" }
      }
    }
  }
};

const txSchema = {
  body: bodyJsonSchema,
  params: transactionHashSchema
};

const blockSchema = {
  body: bodyJsonSchema,
  params: blockNumberSchema
};

export default {
  txSchema,
  blockSchema
};
