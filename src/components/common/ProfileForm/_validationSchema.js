const validationSchema = [
  {
    name: "email",
    checks: ["isEmail"]
  },
  {
    name: "accepted_terms",
    checks: ["required"]
  },
  {
    name: "url",
    checks: ["isWebsiteUrl"]
  },
  {
    name: "linkedin",
    checks: ["isLinkedInUrl"]
  }
];

export default validationSchema;
