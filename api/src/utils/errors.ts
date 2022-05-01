class CustomError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ApiError extends CustomError {
  status: number;
  name: string;

  constructor({ message, name, status = 500 }: { message: any; status: number; name?: string }) {
    super();
    this.message = message;
    this.status = status;
    this.name = name || "";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
