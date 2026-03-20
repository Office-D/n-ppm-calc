export function calcPpm(nGrams, waterLiters) {
  return (nGrams / waterLiters) * 1000;
}

export function calcNitrogenNeeded(targetPpm, waterLiters) {
  return (targetPpm * waterLiters) / 1000;
}

export function calcGap(currentNGrams, targetPpm, waterLiters) {
  const needed = calcNitrogenNeeded(targetPpm, waterLiters);
  return needed - currentNGrams;
}

export function calcFertilizerPpm(fertilizerKg, nPercent, waterLiters) {
  const nGrams = fertilizerKg * (nPercent / 100) * 1000;
  return calcPpm(nGrams, waterLiters);
}

/**
 * 点滴チューブの灌水量を計算
 * @param {number} emitterFlow - エミッター1個あたりの吐出量 (L/h)
 * @param {number} emitterPitch - エミッター間隔 (cm)
 * @param {number} rowLength - 畝の長さ (m)
 * @param {number} linesPerRow - 1畝あたりのチューブ本数
 * @param {number} rowCount - 畝数
 * @param {number} duration - 灌水時間 (分)
 * @returns {{ totalLength: number, emitterCount: number, flowPerHour: number, totalWater: number }}
 */
export function calcDripWater(emitterFlow, emitterPitch, rowLength, linesPerRow, rowCount, duration) {
  const totalLength = rowLength * linesPerRow * rowCount;
  const emitterCount = Math.floor((rowLength * 100) / emitterPitch) * linesPerRow * rowCount;
  const flowPerHour = emitterCount * emitterFlow;
  const totalWater = flowPerHour * (duration / 60);
  return { totalLength, emitterCount, flowPerHour, totalWater };
}

/**
 * 灌水チューブ（散水チューブ）の灌水量を計算
 * @param {number} flowPerM - 1mあたりの散水量 (L/h/m)
 * @param {number} rowLength - 畝の長さ (m)
 * @param {number} linesPerRow - 1畝あたりのチューブ本数
 * @param {number} rowCount - 畝数
 * @param {number} duration - 灌水時間 (分)
 * @returns {{ totalLength: number, flowPerHour: number, totalWater: number }}
 */
export function calcSprinklerWater(flowPerM, rowLength, linesPerRow, rowCount, duration) {
  const totalLength = rowLength * linesPerRow * rowCount;
  const flowPerHour = totalLength * flowPerM;
  const totalWater = flowPerHour * (duration / 60);
  return { totalLength, flowPerHour, totalWater };
}

export function fmt(n, d = 1) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("ja-JP", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}
