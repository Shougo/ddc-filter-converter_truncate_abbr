import { assertEquals } from "jsr:@std/assert";
import type { Item } from "@shougo/ddc-vim/types";
import { Filter } from "./main.ts";

Deno.test("filter(): does not truncate when within maxAbbrWidth", async () => {
  const filter = new Filter();
  const items = [{ word: "abc" } as Item];
  const result = await filter.filter({
    filterParams: { maxAbbrWidth: 3 },
    completeStr: "",
    items,
  });

  assertEquals(result[0].abbr, "abc");
});

Deno.test("filter(): truncates with ellipsis within maxAbbrWidth", async () => {
  const filter = new Filter();
  const items = [{ word: "abcdef" } as Item];
  const result = await filter.filter({
    filterParams: { maxAbbrWidth: 5 },
    completeStr: "",
    items,
  });

  assertEquals(result[0].abbr, "ab...");
});

Deno.test("filter(): truncates surrogate pairs safely", async () => {
  const filter = new Filter();
  const items = [{ word: "😀abcde" } as Item];
  const result = await filter.filter({
    filterParams: { maxAbbrWidth: 4 },
    completeStr: "",
    items,
  });

  assertEquals(result[0].abbr, "😀...");
});

Deno.test("filter(): handles very small maxAbbrWidth", async () => {
  const filter = new Filter();
  const widths = [0, 1, 2, 3];
  const expected = ["", ".", "..", "..."];

  for (const [index, width] of widths.entries()) {
    const items = [{ word: "abcdef" } as Item];
    const result = await filter.filter({
      filterParams: { maxAbbrWidth: width },
      completeStr: "",
      items,
    });

    assertEquals(result[0].abbr, expected[index]);
  }
});
