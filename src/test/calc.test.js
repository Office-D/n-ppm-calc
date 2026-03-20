import { describe, it, expect } from 'vitest'
import { calcPpm, calcNitrogenNeeded, calcGap, calcFertilizerPpm, calcDilution, calcDripWater, calcSprinklerWater, fmt } from '../utils/calc'

describe('calcPpm', () => {
  it('233.5g / 4000L = 58.375 ppm', () => {
    expect(calcPpm(233.5, 4000)).toBeCloseTo(58.375, 2)
  })
  it('400g / 4000L = 100 ppm', () => {
    expect(calcPpm(400, 4000)).toBe(100)
  })
})

describe('calcNitrogenNeeded', () => {
  it('100ppm × 4000L = 400g', () => {
    expect(calcNitrogenNeeded(100, 4000)).toBe(400)
  })
  it('58ppm × 4000L = 232g', () => {
    expect(calcNitrogenNeeded(58, 4000)).toBe(232)
  })
})

describe('calcGap', () => {
  it('現在233.5g → 100ppm目標 → 不足166.5g', () => {
    expect(calcGap(233.5, 100, 4000)).toBeCloseTo(166.5, 1)
  })
  it('現在500g → 100ppm目標 → 超過-100g', () => {
    expect(calcGap(500, 100, 4000)).toBe(-100)
  })
})

describe('calcFertilizerPpm', () => {
  it('20kg × 14% / 4000L = 700 ppm', () => {
    expect(calcFertilizerPpm(20, 14, 4000)).toBeCloseTo(700, 2)
  })
  it('1.5kg × 10% / 4000L = 37.5 ppm', () => {
    expect(calcFertilizerPpm(1.5, 10, 4000)).toBeCloseTo(37.5, 2)
  })
})

describe('calcDilution', () => {
  it('N10% × 1000倍 = 100ppm, 4000Lなら液肥4L', () => {
    const r = calcDilution(10, 1000, 4000)
    expect(r.ppm).toBe(100)
    expect(r.fertLiters).toBe(4)
  })
  it('N5% × 500倍 = 100ppm, 2000Lなら液肥4L', () => {
    const r = calcDilution(5, 500, 2000)
    expect(r.ppm).toBe(100)
    expect(r.fertLiters).toBe(4)
  })
  it('N8% × 200倍 = 400ppm, 4000Lなら液肥20L', () => {
    const r = calcDilution(8, 200, 4000)
    expect(r.ppm).toBe(400)
    expect(r.fertLiters).toBe(20)
  })
})

describe('calcDripWater', () => {
  it('1.6L/h, 20cmピッチ, 50m×1本×20畝, 30分', () => {
    const r = calcDripWater(1.6, 20, 50, 1, 20, 30)
    expect(r.totalLength).toBe(1000)
    expect(r.emitterCount).toBe(5000)
    expect(r.flowPerHour).toBe(8000)
    expect(r.totalWater).toBe(4000)
  })
  it('2.0L/h, 30cmピッチ, 30m×2本×10畝, 60分', () => {
    const r = calcDripWater(2.0, 30, 30, 2, 10, 60)
    expect(r.totalLength).toBe(600)
    expect(r.emitterCount).toBe(2000)
    expect(r.flowPerHour).toBe(4000)
    expect(r.totalWater).toBe(4000)
  })
})

describe('calcSprinklerWater', () => {
  it('4.0L/h/m, 50m×1本×20畝, 30分', () => {
    const r = calcSprinklerWater(4.0, 50, 1, 20, 30)
    expect(r.totalLength).toBe(1000)
    expect(r.flowPerHour).toBe(4000)
    expect(r.totalWater).toBe(2000)
  })
  it('6.0L/h/m, 30m×2本×10畝, 60分', () => {
    const r = calcSprinklerWater(6.0, 30, 2, 10, 60)
    expect(r.totalLength).toBe(600)
    expect(r.flowPerHour).toBe(3600)
    expect(r.totalWater).toBe(3600)
  })
})

describe('fmt', () => {
  it('数値を小数1桁でフォーマット', () => {
    expect(fmt(58.375)).toBe('58.4')
  })
  it('null → "—"', () => {
    expect(fmt(null)).toBe('—')
  })
  it('NaN → "—"', () => {
    expect(fmt(NaN)).toBe('—')
  })
  it('小数桁指定', () => {
    expect(fmt(58.375, 2)).toBe('58.38')
  })
})
