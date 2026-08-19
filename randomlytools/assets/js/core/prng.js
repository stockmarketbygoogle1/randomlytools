/**
 * Core PRNG & Sampling Utilities for RandomlyTools
 * High-performance, cryptographically supported client-side sampling.
 */

export const PRNG = {
  /**
   * Generates a random integer between min and max (inclusive).
   */
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min > max) {
      [min, max] = [max, min];
    }
    
    // Prefer crypto.getRandomValues if supported
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const range = max - min + 1;
      if (range <= 0) return min;
      const maxUint32 = 0xFFFFFFFF;
      const bucketSize = Math.floor(maxUint32 / range) * range;
      const array = new Uint32Array(1);
      let rand;
      do {
        window.crypto.getRandomValues(array);
        rand = array[0];
      } while (rand >= bucketSize);
      return min + (rand % range);
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Pick one random element from an array.
   */
  pickOne(array) {
    if (!array || array.length === 0) return null;
    const idx = this.randomInt(0, array.length - 1);
    return array[idx];
  },

  /**
   * Sample multiple items with or without replacement.
   */
  sample(array, count, allowRepeats = false) {
    if (!array || array.length === 0 || count <= 0) return [];
    
    if (allowRepeats) {
      const results = [];
      for (let i = 0; i < count; i++) {
        results.push(this.pickOne(array));
      }
      return results;
    }

    // Without repeats: Clone array and Fisher-Yates partial shuffle
    const pool = [...array];
    const n = Math.min(count, pool.length);
    const results = [];

    for (let i = 0; i < n; i++) {
      const j = this.randomInt(i, pool.length - 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
      results.push(pool[i]);
    }

    return results;
  },

  /**
   * Pick numbers in range [min, max] with or without repeats.
   */
  pickNumbers(min, max, count, allowRepeats = false) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    count = parseInt(count, 10);

    if (isNaN(min)) min = 1;
    if (isNaN(max)) max = 100;
    if (isNaN(count) || count < 1) count = 1;
    if (min > max) [min, max] = [max, min];

    const rangeSize = max - min + 1;

    if (!allowRepeats) {
      // If pool is reasonably sized, generate array and sample
      if (rangeSize <= 100000) {
        const pool = [];
        for (let i = min; i <= max; i++) {
          pool.push(i);
        }
        return this.sample(pool, Math.min(count, rangeSize), false);
      } else {
        // Large range: Set-based sampling
        const picked = new Set();
        const maxPicks = Math.min(count, rangeSize);
        let attempts = 0;
        while (picked.size < maxPicks && attempts < maxPicks * 10) {
          picked.add(this.randomInt(min, max));
          attempts++;
        }
        return Array.from(picked);
      }
    } else {
      const results = [];
      for (let i = 0; i < count; i++) {
        results.push(this.randomInt(min, max));
      }
      return results;
    }
  }
};
