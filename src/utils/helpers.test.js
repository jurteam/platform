import { to, from } from "./helpers";

describe("Pagination to and from", () => {
  it("total is zero", () => {
    expect(from(1, 10, 0)).toBe(0);
    expect(to(1, 10, 0)).toBe(0);
  });

  it("total is less than perPage", () => {
    expect(from(1, 10, 2)).toBe(1);
    expect(to(1, 10, 2)).toBe(2);

    expect(from(1, 10, 9)).toBe(1);
    expect(to(1, 10, 9)).toBe(9);
  });

  it("total is more than perPage", () => {
    expect(from(1, 10, 23)).toBe(1);
    expect(to(1, 10, 23)).toBe(10);
    expect(from(3, 10, 23)).toBe(21);
    expect(to(3, 10, 23)).toBe(23);

    expect(from(1, 10, 58)).toBe(1);
    expect(to(1, 10, 58)).toBe(10);
    expect(from(2, 10, 58)).toBe(11);
    expect(to(2, 10, 58)).toBe(20);
    expect(from(3, 10, 58)).toBe(21);
    expect(to(3, 10, 58)).toBe(30);
    expect(from(4, 10, 58)).toBe(31);
    expect(to(4, 10, 58)).toBe(40);
    expect(from(5, 10, 58)).toBe(41);
    expect(to(5, 10, 58)).toBe(50);
    expect(from(6, 10, 58)).toBe(51);
    expect(to(6, 10, 58)).toBe(58);
  });

  it("total is multiple of perPage", () => {
    expect(from(1, 10, 30)).toBe(1);
    expect(to(1, 10, 30)).toBe(10);

    expect(from(3, 10, 30)).toBe(21);
    expect(to(3, 10, 30)).toBe(30);
  });
});
