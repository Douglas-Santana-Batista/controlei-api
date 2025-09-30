import { v4 as uuidv4 } from "uuid";
import { IIdProvider } from "../../domain/services/IIdProvider";

export class UuidIdProvider implements IIdProvider {
  generate(): string {
    return uuidv4();
  }
}
