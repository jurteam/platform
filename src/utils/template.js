import React from "react";

export default function t(source, params) {
  if (!params) return source;
  return Object.entries(params).reduce((acc, [key, value]) => {
    const type = typeof value;
    if (["string", "number"].includes(type))
      return acc.replace(formKey(key), value);

    const [first, second] = acc.split(formKey(key));
    return (
      <>
        {first} {value} {second}
      </>
    );
  }, source);
}

function formKey(key) {
  return "{{" + key + "}}";
}
