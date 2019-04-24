const validationSchema = [
  {
    name: "amount",
    checks: ["requiredNum"]
  },
  {
    name: "oracle_wallet",
    checks: ["requiredStrict"]
  },
  {
    name: "wallet_part",
    checks: ["requiredStrict"]
  },
  {
    name: "contract_id",
    checks: ["required"]
  },
  {
    name: "category",
    checks: ["required"]
  }
];

export default validationSchema;
