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
  },
  {
    name: "bio",
    checks: ["compareLength"],
    operation: "lesser",
    than: 1001
  }
];

export default validationSchema;
