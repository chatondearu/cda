/**
 * Deterministic seed helpers for HUD noise components.
 * Pure integer math only (no Math.random, no floating-point trig) so
 * SSR and client renders stay byte-identical for the same seed.
 */

const FNV_OFFSET_BASIS = 0x811C9DC5
const FNV_PRIME = 0x01000193
const GOLDEN_RATIO_STEP = 0x9E3779B9

/** FNV-1a hash of a string into an unsigned 32-bit integer. */
export function hashSeed(seed: string): number {
  let hash = FNV_OFFSET_BASIS

  for (let index = 0; index < seed.length; index++) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, FNV_PRIME)
  }

  return hash >>> 0
}

/** Deterministic pseudo-random unit interval `[0, 1)` derived from a base hash and index. */
export function seededUnit(base: number, index: number): number {
  let state = (base + Math.imul(index, GOLDEN_RATIO_STEP)) >>> 0

  state = Math.imul(state ^ (state >>> 15), state | 1)
  state ^= state + Math.imul(state ^ (state >>> 7), state | 61)

  return ((state ^ (state >>> 14)) >>> 0) / 0x100000000
}

export function useHudSeed() {
  return {
    hashSeed,
    seededUnit,
  }
}
