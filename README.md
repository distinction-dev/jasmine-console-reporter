# Jasmine Console Reporter

> Jasmine Console Reporter class for detailed test results into console.

## Install

```bash
npm install jasmine-console-reporter
```

or

```bash
yarn add jasmine-console-reporter
```

## Usage

```ts
import Jasmine from "jasmine";
import ConsoleReporter from "jasmine-console-reporter";

const jasmine: Jasmine = new Jasmine();
const consoleReporter: ConsoleReporter = new ConsoleReporter();

jasmine.loadConfigFile("test/support/jasmine.json");
jasmine.addReporter(consoleReporter);
jasmine.configureDefaultReporter({
  showColors: true,
});

jasmine.execute();
```
