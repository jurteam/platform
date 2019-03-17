const validationSchema = [
  {
    name: "part_a_wallet",
    checks: ["required", "isWallet"]
  },
  {
    name: "part_a_email",
    checks: ["isEmail"]
  },
  {
    name: "part_b_wallet",
    checks: ["required", "isWallet", "isNotEqualTo"],
    targetField: "part_a_wallet"
  },
  {
    name: "part_b_email",
    checks: ["isEmail"]
  }
];

export default validationSchema;
