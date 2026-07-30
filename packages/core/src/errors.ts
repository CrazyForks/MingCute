export class MingcuteCoreError extends Error {
  readonly code: string;

  constructor(code: string, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'MingcuteCoreError';
    this.code = code;
  }
}
