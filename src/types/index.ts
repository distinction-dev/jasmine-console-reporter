export interface JasmineStartedInfo {
  totalSpecsDefined: number;
  order: Order;
}

interface Order {
  new (options: { random: boolean; seed: number | string }): any;
  random: boolean;
  seed: number | string;
  sort<T>(items: T[]): T[];
}

export interface JasmineDoneInfo {
  overallStatus: string;
  totalTime: number;
  incompleteReason: string;
  incompleteCode: string;
  order: Order;
  numWorkers: number;
  failedExpectations: ExpectationResult[];
  deprecationWarnings: ExpectationResult[];
}

interface Result {
  type: string;
}

interface ExpectationResult extends Result {
  matcherName: string;
  message: string;
  stack: string;
  passed: boolean;
  expected: any;
  actual: any;
}

export interface SuiteResult {
  id: string;
  description: string;
  fullName: string;
  parentSuiteId: string | null;
  filename: string;
  failedExpectations: FailedExpectation[];
  deprecationWarnings: DeprecatedExpectation[];
  status: string;
  duration: number | null;
  properties: { [key: string]: unknown } | null;
}

interface FailedExpectation extends CustomReportExpectation {
  actual: string;
  expected: string;
}
interface DeprecatedExpectation {
  message: string;
}

interface CustomReportExpectation {
  matcherName: string;
  message: string;
  passed: boolean;
  stack: string;
}

export interface SpecResult extends SuiteResult {
  passedExpectations: PassedExpectation[];
  pendingReason: string;
  debugLogs: DebugLogEntry[] | null;
}

type PassedExpectation = CustomReportExpectation;

interface DebugLogEntry {
  message: string;
  timestamp: number;
}

export interface Reporter {
  jasmineStarted?(
    suiteInfo: JasmineStartedInfo,
    done?: () => void
  ): void | Promise<void>;
  suiteStarted?(result: SuiteResult, done?: () => void): void | Promise<void>;
  specStarted?(result: SpecResult, done?: () => void): void | Promise<void>;
  specDone?(result: SpecResult, done?: () => void): void | Promise<void>;
  suiteDone?(result: SuiteResult, done?: () => void): void | Promise<void>;
  jasmineDone?(
    runDetails: JasmineDoneInfo,
    done?: () => void
  ): void | Promise<void>;
}
