
export enum Status {
  Active, Inactive
}

export class Task {
  status: Status;
  description: string;

  constructor(status: Status, description: string) {
    this.status = status;
    this.description = description;
  }
}
