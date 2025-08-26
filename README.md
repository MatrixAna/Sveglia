# Sveglia – TypeScript Alarm Library ⏰

A minimalist TypeScript library for managing alarms with support for delayed execution, stopping, and snoozing. Designed with clarity and extensibility in mind, **Sveglia** helps developers easily schedule actions to occur at a specific time or after a delay.

---

## 🧠 Overview

The **Sveglia** library allows you to create alarms that trigger a callback function after a specified delay. It supports:

* **One-time execution**: Trigger an alarm at a given time.
* **Snooze functionality**: Postpone an alarm for a new delay.
* **Manual stopping**: Cancel an active alarm before it goes off.

Ideal for scheduling reminders, timers, or any kind of deferred logic in TypeScript applications.

---

## ✨ Features

* ⏳ **Schedule Alarms**: Execute a callback after a specific time delay.
* 😴 **Snooze Support**: Reschedule alarms dynamically.
* ✋ **Stop Functionality**: Manually cancel active alarms.
* 🧩 **Composable Design**: Easily extend and customize via delegates.


---


## 📁 Project Structure

```
src/

  └── Alarm.ts             # Core Alarm logic and types
tests/
  └── alarm.spec.ts        # Jest test suite for Alarm behavior

.gitignore
jest.config.js             # Jest configuration

package.json
package-lock.json
tsconfig.json              # TypeScript configuration
```

---

## ⚙️ Setup


### 1. Clone the Repository

```bash
git clone https://github.com/MatrixAna/Sveglia.git
cd Sveglia
```


### 2. Install Dependencies


```bash
npm install

```

---


## 🚀 Usage

### Basic Alarm Example

```ts
import { Alarm } from './src/index';

const dueDate = new Date(Date.now() + 5000); // alarm in 5 seconds

const alarm = new Alarm(
  (stop, snooze) => {

    console.log("⏰ Alarm triggered!");
    stop(); // optionally stop after triggering
  },
  dueDate

);
```

### Snoozing the Alarm


```ts

const alarm = new Alarm(
  (stop, snooze) => {

    console.log("⏰ Alarm triggered!");

    snooze(3000); // snooze for another 3 seconds
  },
  new Date(Date.now() + 2000) // alarm in 2 seconds
);

```

### Stopping the Alarm


```ts
const alarm = new Alarm(

  (stop, snooze) => {
    console.log("⏰ Alarm triggered!");
  },
  new Date(Date.now() + 10000)
);


// Stop it before it triggers
setTimeout(() => {

  alarm.stop();
  console.log("🛑 Alarm manually stopped");

}, 3000);
```

---


## 📘 API Reference


### `getTimeoutDelay(dueDate: Date): number`

* Calculates the number of seconds between `Date.now()` and `dueDate`.

---


### `Alarm` class


| Method                         | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |

| `new Alarm(delegate, dueDate)` | Creates an alarm that executes the delegate after the delay |
| `stop()`                       | Stops the alarm and clears the timeout                      |
| `snooze(delay: number)`        | Reschedules the alarm with a new delay (in milliseconds)    |


---

## 🧪 Testing


### Run all tests using Jest:


```bash
npm test

```

Or in watch mode:


```bash
npm run test:watch
```


Tests are located in `tests/alarm.test.ts` and cover:


* Alarm scheduling and execution
* Snooze behavior
* Stop functionality


---


## 🧱 Design Principles

* **Type-Safe**: Built in TypeScript with clear types and interfaces.
* **Encapsulated**: Uses the delegate pattern for composability and reuse.
* **Minimalist**: No external dependencies beyond the TypeScript runtime.


---


## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Write tests if needed
5. Submit a Pull Request


---

## 📄 License


MIT License


---


## 💡 Inspiration


The idea behind **Sveglia** was to create a clean and flexible abstraction for timed events — something useful in alarm apps, reminder systems, or even custom schedulers — using only native TypeScript and Node.js tools.


