/**
 * Benchmark für BoundingBox Berechnung
 * 
 * Teste auf: https://jsbench.me/
 * 
 * 1. Öffne https://jsbench.me/
 * 2. Kopiere den "Setup" Code in das Setup-Feld
 * 3. Erstelle zwei Test Cases mit dem jeweiligen Code
 * 4. Klicke "Run"
 */

// ============================================
// SETUP CODE (kopiere in "Setup" Feld)
// ============================================

// Simuliere ArrayList
class ArrayList {
  constructor() {
    this.data = [];
  }
  add(item) {
    this.data.push(item);
  }
  asArray() {
    return this.data;
  }
  get length() {
    return this.data.length;
  }
}

// Erstelle Testdaten: 100 Punkte
const vertices = new ArrayList();
for (let i = 0; i < 100; i++) {
  vertices.add({ x: Math.random() * 1000, y: Math.random() * 1000 });
}

// ============================================
// TEST CASE 1: "Alt (4x map + spread)"
// ============================================

function getBoundingBoxOld(vertices) {
  let minX = Math.min(...vertices.asArray().map(n => n.x));
  let minY = Math.min(...vertices.asArray().map(n => n.y));
  let maxX = Math.max(...vertices.asArray().map(n => n.x));
  let maxY = Math.max(...vertices.asArray().map(n => n.y));
  let width = maxX - minX;
  let height = maxY - minY;
  return { x: minX, y: minY, w: width, h: height };
}

getBoundingBoxOld(vertices);

// ============================================
// TEST CASE 2: "Neu (single loop)"
// ============================================

function getBoundingBoxNew(vertices) {
  const _points = vertices.asArray();
  
  if (_points.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  let minX = _points[0].x;
  let maxX = minX;
  let minY = _points[0].y;
  let maxY = minY;

  for (let i = 1; i < _points.length; i++) {
    let p = _points[i];
    if (p.x < minX) minX = p.x;
    else if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    else if (p.y > maxY) maxY = p.y;
  }

  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

getBoundingBoxNew(vertices);


// ============================================
// LOKALER TEST (Node.js)
// ============================================
// Führe aus mit: node benchmark/boundingbox-benchmark.js

if (typeof window === 'undefined') {
  const iterations = 100000;
  
  console.log(`\nBenchmark: ${iterations} Iterationen, ${vertices.data.length} Punkte\n`);
  
  // Warmup
  for (let i = 0; i < 1000; i++) {
    getBoundingBoxOld(vertices);
    getBoundingBoxNew(vertices);
  }
  
  // Test Alt
  let startOld = performance.now();
  for (let i = 0; i < iterations; i++) {
    getBoundingBoxOld(vertices);
  }
  let endOld = performance.now();
  
  // Test Neu
  let startNew = performance.now();
  for (let i = 0; i < iterations; i++) {
    getBoundingBoxNew(vertices);
  }
  let endNew = performance.now();
  
  let timeOld = endOld - startOld;
  let timeNew = endNew - startNew;
  
  console.log(`Alt (4x map + spread): ${timeOld.toFixed(2)} ms`);
  console.log(`Neu (single loop):     ${timeNew.toFixed(2)} ms`);
  console.log(`\nSpeedup: ${(timeOld / timeNew).toFixed(2)}x schneller`);
}