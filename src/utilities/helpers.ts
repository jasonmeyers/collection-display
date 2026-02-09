import type { RawRecord } from "../types/types";

  export const uniqueCollectionKeys = (data: []) =>
    new Set(data.flatMap((entry) => Object.keys(entry)));

  export const keyValueTypes = (data: Array<RawRecord>) =>
    data.reduce((acc, entry) => {
      for (const [key, value] of Object.entries(entry)) {
        if (!acc.has(key)) acc.set(key, new Set());
        acc.get(key)!.add(typeof value);
      }
      return acc;
    }, new Map<string, Set<string>>());

  export const logInterface = (
    map: Map<string, Set<string>>,
    name = "MyInterface",
  ) => {
    const fields = [...map.entries()]
      .map(([key, types]) => `  ${key}: ${[...types].join(" | ")};`)
      .join("\n");
    console.log(`interface ${name} {\n${fields}\n}`);
  };