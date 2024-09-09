export type Awaitable<T> = T | Promise<T>

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>
