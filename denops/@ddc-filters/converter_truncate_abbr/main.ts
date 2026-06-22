import type { Item } from "@shougo/ddc-vim/types";
import { BaseFilter } from "@shougo/ddc-vim/filter";

type Params = {
  maxAbbrWidth: number;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const truncate = (str: string, len: number): string => {
      const maxLength = Math.max(0, Math.floor(len));
      const chars = Array.from(str);
      const ellipsis = "...";

      if (chars.length <= maxLength) {
        return str;
      }

      if (maxLength <= ellipsis.length) {
        return ellipsis.slice(0, maxLength);
      }

      return chars.slice(0, maxLength - ellipsis.length).join("") + ellipsis;
    };

    for (const item of args.items) {
      item.abbr = truncate(
        item.abbr ?? item.word,
        args.filterParams.maxAbbrWidth,
      );
    }

    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
      maxAbbrWidth: 80,
    };
  }
}
