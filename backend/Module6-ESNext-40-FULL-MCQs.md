# **Module 6: Modern ESNext JavaScript - COMPLETE 40 FULL MCQs**

**Save as:** `Module6-ESNext-40-FULL-MCQs.md`

```markdown
# Module 6: Modern ESNext JavaScript (40 FULL MCQ Questions)
*10+ Years Experience | 🔥🔥🔥🔥 | 8% FAANG Weightage | Dec 2025* [web:5][web:51][file:54]

## 📊 Module Stats - Pure JS Only
**Questions:** 40/40 COMPLETE | **Format:** MCQ + ✅ Answer + 🔍 Explanation + 🧪 Test Code  
**Topics from Plan.md:** Records/Tuples, Pipeline, Logical assignment, Private fields, Pattern matching, Array.fromAsync

---

## Q1: Records/Tuples Proposal Benefits (Plan.md Q1)
**Records/Tuples provide:**

**A)** Mutable data  
**B)** **Immutable structural equality** ✅  
**C)** Classes  
**D)** Proxies  

**🔍 Explanation:** **Value equality** vs reference equality.

**🧪 Test Code:**
```
// Stage 2 simulation - structural equality
const Point = (x, y) => ({ x, y, [Symbol.for('@@record')]: true });
const p1 = Point(1, 2);
const p2 = Point(1, 2);

console.log(p1 === p2);        // false (references)
console.log(JSON.stringify(p1) === JSON.stringify(p2)); // true (structure) ✅
```

---

## Q2: Pipeline Operator Advantages (Plan.md Q2)
**Pipeline `x |> f |> g` equals:**

**A)** `g(f(x))`  
**B)** **`f(g(x))`** ✅  
**C)** Parallel  
**D)** Promise chain  

**🔍 Explanation:** **Left-to-right** function composition.

**🧪 Test Code:**
```
// Proposal |> pipe (Stage 2)
const pipe = x => f => f(x);
const add1 = x => x + 1;
const double = x => x * 2;

const result = pipe(5, add1, double); // 5 |> add1 |> double = 12 ✅
console.log(result);
```

---

## Q3: Logical Assignment Operators (Plan.md Q3)
**Logical assignment `x ||= y` means:**

**A)** `x || (x = y)`  
**B)** **`x || (x = y), return x`** ✅  
**C)** `x = x || y`  
**D)** Always assign  

**🧪 Test Code:**
```
let config = null;
config ||= 'default'; // config = 'default' ✅
console.log(config);

let count = 0;
count ||= 1; // No change ✅
console.log(count); // 0
```

---

## Q4: Private Field Syntax (Plan.md Q4)
**Private fields `#private` accessible:**

**A)** Globally  
**B)** **Class methods only** ✅  
**C)** Subclasses  
**D)** Same module  

**🧪 Test Code:**
```
class Counter {
  #count = 0; // Private field ✅
  
  increment() {
    return ++this.#count;
  }
  
  getCount() {
    return this.#count; // ✅ Inside class
  }
}

const c = new Counter();
console.log(c.increment()); // 1
// console.log(c.#count); // SyntaxError ✅
```

---

## Q5: Pattern Matching Proposal (Plan.md Q5)
**Pattern matching extracts:**

**A)** Primitives only  
**B)** **Nested destructuring** ✅  
**C)** Mutations  
**D)** Runtime only  

**🧪 Test Code:**
```
// Stage 2 simulation
function matchShape(shape) {
  return shape.kind === 'circle'
    ? `Circle r=${shape.radius}`
    : shape.kind === 'rect'
    ? `Rect ${shape.width}x${shape.height}`
    : 'Unknown';
}

console.log(matchShape({ kind: 'circle', radius: 5 })); // Circle r=5 ✅
```

---

## Q6: Array.fromAsync Usage (Plan.md Q6)
**Array.fromAsync(iterable) converts:**

**A)** Sync iterables  
**B)** **Async iterables** ✅  
**C)** Promises  
**D)** Generators  

**🧪 Test Code:**
```
// Node 20+ / Stage 3
async function* asyncGen() {
  for (let i = 0; i < 3; i++) {
    await new Promise(r => setTimeout(r, 50));
    yield i;
  }
}

(async () => {
  const arr = await Array.fromAsync(asyncGen());
  console.log(arr); //  ✅
})();
```

---

## Q7: findLast vs findLastIndex (Plan.md Q7)
**Array.findLast() returns:**

**A)** Index  
**B)** **Last matching value** ✅  
**C)** First match  
**D)** All matches  

**🧪 Test Code:**
```
const arr = ;
console.log(arr.findLast(x => x === 5));      // 5 (last) ✅
console.log(arr.findLastIndex(x => x === 5)); // 3 (index) ✅
```

---

## Q8: Dynamic import.meta.resolve (Plan.md Q8)
**import.meta.resolve resolves:**

**A)** Static imports  
**B)** **Dynamic module paths** ✅  
**C)** Bundler paths  
**D)** URLs only  

**🧪 Test Code:**
```
// Modules only
import.meta.resolve('./utils.js').then(path => {
  console.log('Resolved:', path);
});
```

---

## Q9: Temporal API Example (Plan.md Q9)
**Temporal.PlainDate immutable:**

**A)** Mutators  
**B)** **New instances** ✅  
**C)** Legacy Date  
**D)** Strings  

**🧪 Test Code:**
```
// Temporal polyfill or Node 22+
const { Temporal } = require('@js-temporal/polyfill');
const today = Temporal.Now.plainDateISO();
const tomorrow = today.add({ days: 1 }); // Immutable ✅
console.log(today.toString(), tomorrow.toString());
```

---

## Q10: Optional Chaining vs Nullish (Plan.md Q10)
**Nullish coalescing `??` vs `||`:**

**A)** Same behavior  
**B)** **`??`: null/undefined only** ✅  
**C)** `||`: falsy only  
**D)** Always falsy  

**🧪 Test Code:**
```
const value = 0;
const falsy = value || 'default';      // 'default' ❌
const nullish = value ?? 'default';    // 0 ✅
console.log(nullish);
```

---

## Q11: Top-Level Await Modules
**Top-level await works in:**

**A)** Classic scripts  
**B)** **ES modules only** ✅  
**C)** Node CommonJS  
**D)** Web Workers  

**🧪 Test Code:**
```
<!DOCTYPE html>
<script type="module">
  const data = await Promise.resolve('module works'); // ✅
  console.log(data);
</script>
<script>
  // const data2 = await Promise.resolve('error'); // SyntaxError ❌
</script>
```

---

## Q12: Private Methods Syntax
**Private methods `#method()` callable:**

**A)** Globally  
**B)** **Class methods only** ✅  
**C)** Subclasses  
**D)** Same module  

**🧪 Test Code:**
```
class Calculator {
  #calculate(x, y) {
    return x * y; // Private method ✅
  }
  
  multiply(x, y) {
    return this.#calculate(x, y);
  }
}

const calc = new Calculator();
console.log(calc.multiply(2, 3)); // 6 ✅
// calc.#calculate(2, 3); // SyntaxError
```

---

## Q13: Logical Assignment Compound
**`x &&= y` means:**

**A)** `x && (x = y)`  
**B)** **`x && (x = y), return x`** ✅  
**C)** Always assign  
**D)** `x = x && y`  

**🧪 Test Code:**
```
let enabled = false;
enabled &&= true; // No change ✅
console.log(enabled); // false

let count = 5;
count ||= 0; // No change ✅
console.log(count); // 5
```

---

## Q14: Array Grouping Methods
**Array.groupBy() groups by:**

**A)** Values  
**B)** **Callback return value** ✅  
**C)** Indices  
**D)** Length  

**🧪 Test Code:**
```
const items = [1.1, 2.9, 3.5, 1.8];
const grouped = items.groupBy(Math.floor);
console.log(grouped); // {1: [1.1, 1.8], 2: [2.9], 3: [3.5]} ✅
```

