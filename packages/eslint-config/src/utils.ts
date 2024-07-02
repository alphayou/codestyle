import type { Awaitable } from '@/types/utils'

// MIT License @antfu/eslint-config
export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  // eslint-disable-next-line ts/no-explicit-any
  return (resolved as any).default || resolved
}

// MIT License @antfu/eslint-config
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

// MIT License @antfu/eslint-config
// eslint-disable-next-line ts/no-explicit-any
export function renameRules(rules: Record<string, any>, map: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(`${from}/`))
            return [to + key.slice(from.length), value]
        }
        return [key, value]
      }),
  )
}
