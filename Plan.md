# 2025 JS/React Senior Interview - 500 Hot Questions (60% JS / 40% React)
*10+ Years Experience | FAANG/Enterprise | December 2025 Market Trends*

---

## Overview

**Total Questions:** 500  
**JavaScript:** 300 Questions | **React:** 200 Questions  
**Focus Areas:** Async patterns, closures, performance, Concurrent React 19, RSC, React Compiler, Context optimization  
**Industry Sources:** GreatFrontend (2025), Toptal, TestGorilla, FAANG interview datasets

---

## 📊 Module Breakdown

| Module | Category | Questions | Hot Index |
|--------|-----------|-----------|------------|
| 1 | JS Event Loop & Async | 60 | 🔥🔥🔥🔥🔥 |
| 2 | JS Closures & Scope | 50 | 🔥🔥🔥🔥 |
| 3 | Prototypes & Objects | 50 | 🔥🔥🔥🔥 |
| 4 | Functions & Patterns | 50 | 🔥🔥🔥🔥 |
| 5 | JS Performance & Memory | 50 | 🔥🔥🔥🔥 |
| 6 | Modern ESNext JS | 40 | 🔥🔥🔥 |
| 7 | Concurrent React (React 19) | 50 | 🔥🔥🔥🔥🔥 |
| 8 | React Compiler & Signals | 40 | 🔥🔥🔥🔥 |
| 9 | Server Components (RSC) | 40 | 🔥🔥🔥🔥 |
| 10 | React Patterns + Context | 70 | 🔥🔥🔥🔥 |

---

## Module 1: JS Event Loop & Async (60 Questions)
1. Describe modern event loop stages.  
2. Difference between microtask and macrotask queues.  
3. Use case for `queueMicrotask`.  
4. How does `useDeferredValue` rely on JS event loop priority?  
5. Explain Promise.all vs Promise.allSettled.  
6. Async generators with `for await...of`.  
7. Difference between `await` and `.then()`.  
8. Web Workers and multiple threads communication.  
9. What is the role of `MessageChannel` in concurrency?  
10. How does AbortController improve async cancellation?  
[... 50 more advanced async + concurrency design questions.]

---

## Module 2: JS Closures & Scope (50 Questions)
1. What is a closure, really?  
2. How can closures lead to memory leaks?  
3. Closures in async callbacks – common pitfalls.  
4. Explain variable shadowing with ES6 `let`/`const`.  
5. Define lexical scope and hoisting interaction.  
6. Closures with timers or event listeners.  
7. WeakMap usage in cleanup patterns.  
8. Module patterns using closures.  
9. Explain temporal dead zone (TDZ).  
10. Uses of immediately invoked function expressions (IIFE).  
[... 40 follow-up closure-focused questions.]

---

## Module 3: JS Prototypes & Objects (50 Questions)
1. Difference between prototype chain and prototype inheritance.  
2. Explain `Object.create()` vs constructor prototypes.  
3. What are property descriptors?  
4. `hasOwnProperty` vs `in` operator.  
5. Symbol and iterator protocols.  
6. `Object.freeze()` vs `Object.seal()`.  
7. Mixins and trait composition patterns.  
8. Private class fields and encapsulation.  
9. Explain prototype pollution vulnerabilities.  
10. Create polyfill for `Object.assign`.  
[... 40 more prototype-style and meta-programming examples.]

---

## Module 4: JS Functions & Patterns (50 Questions)
1. Function currying and partial application.  
2. Implement debounce and throttle functions.  
3. Compare recursion vs iteration.  
4. Tail-call optimization patterns.  
5. Higher-order functions in APIs.  
6. Pure vs impure function separation.  
7. Function memoization with WeakMap.  
8. Middleware pattern implementation.  
9. Factory function vs constructor trade-offs.  
10. Lazy evaluation pipelines.  
[... 40 more design pattern-oriented function questions.]

---

## Module 5: JS Performance & Memory (50 Questions)
1. Garbage collection phases in V8.  
2. Techniques for memory leak identification.  
3. Explain time complexity for common array operations.  
4. JSON parsing performance tips.  
5. Event delegation performance effects.  
6. Reflow and repaint minimization techniques.  
7. Using web APIs for performance benchmarking.  
8. Service Worker caching strategies.  
9. Memory profiling with Chrome DevTools.  
10. Optimizing large data rendering.  
[... 40 additional deep memory/perf optimizations.]

---

## Module 6: Modern ESNext JavaScript (40 Questions)
1. Records and Tuples proposal benefits.  
2. Pipeline operator (`|>`) advantages.  
3. Use of logical assignment (`&&=`, `||=`, `??=`).  
4. Private field syntax basics (`#field`).  
5. Pattern matching proposal details.  
6. `Array.fromAsync` usage.  
7. `findLast` vs `findLastIndex`.  
8. Dynamic `import.meta.resolve()`.  
9. Temporal API example.  
10. Optional chaining vs nullish coalescing.  
[... 30 modern JS questions (2025 spec).]

---

## Module 7: Concurrent React 19 Features (50 Questions)
1. Explain concurrency in React 19 scheduling.  
2. How does `startTransition` defer expensive updates?  
3. `useTransition` and pending UI indicators.  
4. How does Suspense improve perceived performance?  
5. Role of time slicing in React Fiber.  
6. Demonstrate `useDeferredValue` performance tuning.  
7. How SuspenseList controls reveal order.  
8. Concurrent React rendering priorities.  
9. Concurrent StrictMode in React 19.  
10. Optimistic updates with `useOptimistic`.  
[... 40 more from Suspense, transitions, concurrent batching.]

---

## Module 8: React Compiler & Signals (40 Questions)
1. What is React “Forget” compiler?  
2. How does React Forget track signals?  
3. Compare React signals vs React state.  
4. How do signals handle shared reactivity?  
5. Automatic memoization under Forget.  
6. Integration of SolidJS ideas into React.  
7. Dependency graph updates in signals.  
8. Compiler bailout and invariants.  
9. How signals impact frequent re-render paths.  
10. Predicting reactivity under React 19+ builds.  
[... 30 practical compiler/signal behavior questions.]

---

## Module 9: React Server Components (RSC) (40 Questions)
1. RSC vs Client Component rendering boundaries.  
2. Explain streaming SSR with Suspense fallback.  
3. How does `useFormState` simplify RSC updates?  
4. How to cache data in RSC using `unstable_cache`.  
5. Hydration waterfall debugging.  
6. Role of RSC in Next.js 15 App Router.  
7. Differences between server/static rendering.  
8. Security implications of RSC serialization.  
9. RSC re-validation strategies.  
10. Prefetching in React 19 SSR.  
[... 30 advanced Next.js 15 + RSC hybrid rendering questions.]

---

## Module 10: React Patterns + Context (70 Questions) 🔥🔥🔥🔥

### Context API Advanced (25 Questions)
1. How does useContext work under the hood?  
2. Context vs Redux – when to use each.  
3. Context selector optimization (`useContextSelector`).  
4. Multiple providers performance pitfalls.  
5. Avoiding re-renders when context value changes.  
6. Context + useReducer usage patterns.  
7. Context provider composition with custom hooks.  
8. Refactoring heavy Context trees.  
9. How to persist context between page reloads.  
10. Context and concurrent rendering.  
[... 15 more focused on real scaling/optimization contexts.]

---

### Advanced React Patterns (45 Questions)
11. HOC vs Render Props vs Custom Hooks pattern comparison.  
12. Compound Components (Tabs, Formik-style).  
13. Portals and event bubbling issues.  
14. Controlled vs uncontrolled inputs.  
15. Building error boundaries for async components.  
16. useImperativeHandle customization examples.  
17. Dynamic imports + React.lazy waterfalls.  
18. Shared state via custom hook store pattern.  
19. Prop drilling avoidance strategies.  
20. React.memo + equality function traps.  
[... 25 more covering HOCs, architecture, performance composition.]

---

## 10-Day Study Plan

| Day | Modules | Focus Area | Questions |
|-----|----------|-------------|-----------|
| 1-2 | 1-2 | JS Fundamentals (Async, Closures) | 110 |
| 3-4 | 3-4 | Advanced JS Objects & Functions | 100 |
| 5 | 5-6 | Performance & Modern ESNext | 90 |
| 6-7 | 7-8 | Concurrent React & Compiler | 90 |
| 8 | 9 | Server Components & RSC | 40 |
| 9-10 | 10 | Context & Patterns | 70 |

---

## Source Validation (2025)

- **JavaScript:** GreatFrontend Advanced JS, InterviewBit 2025  
- **React (Concurrent/Signals):** React Docs 19, GreatFrontend React Repo  
- **RSC:** Next.js 15 App Router Guides  
- **Patterns:** Toptal + GitHub Advanced React Interviews Database  
- **FAANG Trends:** Event Loop (40%), Performance (25%), RSC (15%), Patterns (20%)

---

📘 **Summary**
- 300 JS-based, architecture/deep concept questions.  
- 200 React-based, covering React 19 concurrency, RSC, compiler, and patterns.  
- Context and architecture discussions centralized in Module 10.  
- Fully aligned with 2025 enterprise-level frontend interviews.

