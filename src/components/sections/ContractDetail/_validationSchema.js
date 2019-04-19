const validationSchema = [
  {
    name: "kpi",
    checks: ["requiredStrict"]
  },
  {
    name: "resolutionProof",
    checks: ["requiredStrict"]
  },
  {
    name: "value",
    checks: ["requiredNum"]
  },
  {
    name: "whoPays",
    checks: ["requiredStrict"]
  },
  {
    name: "category",
    checks: ["required"]
  },
  {
    name: "duration",
    checks: ["duration"],
    days: "duration.days",
    hours: "duration.hours",
    minutes: "duration.minutes"
  }
];

export default validationSchema;
