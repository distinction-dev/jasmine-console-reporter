import chalk from "chalk";
import { JasmineStartedInfo, Reporter, SuiteResult, SpecResult } from "./types";

export class CustomReporter implements Reporter {
  specCount: number;
  specSuccessCount: number;

  suitsCount: number;

  success: boolean;

  constructor() {
    this.specCount = 0;
    this.specSuccessCount = 0;
    this.suitsCount = 0;
    this.success = true;
  }

  jasmineStarted(suiteInfo: JasmineStartedInfo) {
    console.log(`Executing ${suiteInfo.totalSpecsDefined} defined specs... \n`);
    console.log(chalk.bold("Test Suites & Specs:"));
    console.log(chalk.bold("--------------------\n"));
  }

  suiteStarted(result: SuiteResult) {
    this.suitsCount++;
    console.log(chalk.cyan(`${this.suitsCount}. ${result.description}`));
  }

  specStarted() {
    this.specCount++;
  }

  specDone(result: SpecResult) {
    const status = result.status === "passed" ? "✓" : "✗";
    const output = `\t (${status}) Test case ${this.specCount}: ${chalk.bold(
      result.description
    )}`;

    console.log(
      result.status === "passed" ? chalk.green(output) : chalk.red(output)
    );

    if (result.status === "passed") this.specSuccessCount++;
    else this.success = false;
  }

  suiteDone() {
    console.log("\n");
  }

  jasmineDone() {
    console.log("\n");
    this._finalReport();
  }

  _finalReport() {
    console.log(chalk.underline.bold("Summary :\n"));
    console.log(
      this.success
        ? chalk.bold.green("👊 Passed")
        : chalk.bold.red("❌ Failure")
    );
    console.log(`Total Suites: ${this.suitsCount} `);
    console.log(
      `Success Spec Count : ${this.specSuccessCount} of ${this.specCount}`
    );
    console.log(
      `Failure Spec Count : ${this.specCount - this.specSuccessCount} of ${
        this.specCount
      }`
    );
  }
}
