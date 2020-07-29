import t from "./template";
import React from "react";
import { cleanup, render } from "@testing-library/react";

afterAll(cleanup);

describe("template", () => {
  it("returns source if no params", () => {
    const source = "Ciao! {{name}}";
    expect(t(source)).toBe(source);
  });

  it("substitute {{name}}", () => {
    const source = "Ciao! {{name}}";
    const substituted = "Ciao! Mario";
    const params = { name: "Mario" };
    expect(t(source, params)).toBe(substituted);
  });

  it("substitute multiple", () => {
    const source =
      "Welcome {{name}}. You are advocate since {{date}} with balance of {{balance}} JUR";
    const substituted =
      "Welcome Kaze. You are advocate since 27 Jul 2020 with balance of 328.92 JUR";
    const params = {
      name: "Kaze",
      date: "27 Jul 2020",
      balance: 328.92
    };
    expect(t(source, params)).toBe(substituted);
  });

  it("substitute on substituted", () => {
    const sourceOne = "Click {{link}} to know more about {{entity}}";
    const sourceTwo = "on {{link}}";
    const substitutedOne = "Click on {{link}} to know more about Jur";
    const substitutedTwo = "Click on this link, to know more about Jur";
    const paramsOne = {
      link: sourceTwo,
      entity: "Jur"
    };
    const paramsTwo = { link: "this link," };

    const outOne = t(sourceOne, paramsOne);
    expect(outOne).toBe(substitutedOne);
    expect(t(outOne, paramsTwo)).toBe(substitutedTwo);
  });

  it("substitute react element", () => {
    const source = "Click {{link}} to join us";
    const Link = <a href="#here">here</a>;
    const params = { link: Link };
    const { queryByText } = render(
      <p>
        Welcome. <span>{t(source, params)}</span>
      </p>
    );

    expect(queryByText(/Welcome/i)).toBeTruthy();
    expect(queryByText(/click/i)).toBeTruthy();
    expect(queryByText(/here/i)).toBeTruthy();
  });
});
