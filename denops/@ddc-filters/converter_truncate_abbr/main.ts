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
      return str.length <= len ? str : (str.substring(0, len) + "...");
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
