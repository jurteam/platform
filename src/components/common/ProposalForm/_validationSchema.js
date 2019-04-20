const validationSchema = [
  {
    name: "proposal_part_a",
    checks: ["requiredStrict"]
  },
  {
    name: "proposal_part_b",
    checks: ["requiredStrict"]
  }
];

export default validationSchema;
