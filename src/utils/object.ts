type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5]; // hạn độ sâu để tránh đệ quy vô hạn

export type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: T[K] extends object
          ? K | Join<K, Paths<T[K], Prev[D]>>
          : K;
      }[keyof T & string]
    : "";

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? T[K] extends object
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

export function get<T, P extends Paths<T>>(obj: T, path: P): PathValue<T, P> {
  // @ts-ignore
  const keys = path.split(".");
  let result: any = obj;

  for (const key of keys) {
    result = result?.[key];
  }

  return result;
}
