export class NotFound extends Error {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found.`);
    this.name = 'NotFound';
  }
}

