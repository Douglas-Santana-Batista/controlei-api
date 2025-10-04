export class UserValidators {
  static validateFindParams(email: any, id: any): { valid: boolean; error?: string } {
    if (email && id) {
      return { valid: false, error: "Provide only one filter: email OR id" };
    }

    if (!email && !id) {
      return { valid: false, error: "Provide email or id as query parameter" };
    }

    if (email && typeof email !== "string") {
      return { valid: false, error: "Email must be a string" };
    }

    if (id && typeof id !== "string") {
      return { valid: false, error: "ID must be a string" };
    }

    return { valid: true };
  }
}
