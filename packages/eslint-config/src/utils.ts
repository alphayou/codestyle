import type { Awaitable } from '@/types/utils'

// Forked from @antfu/eslint-config
export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default || resolved
}
