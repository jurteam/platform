const validationSchema = [
  {
    name: "email",
    checks: ["isEmail"]
  },
  {
    name: "accepted_terms",
    checks: ["required"]
  }
];

export default validationSchema;
