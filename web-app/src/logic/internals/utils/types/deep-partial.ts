export type DeepPartial<T> = T extends { [key: string]: unknown }
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
