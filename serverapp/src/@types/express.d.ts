import { SessionUser } from "../domain/users/user-model.js";

declare global {
  declare namespace Express {
    export interface Request {
      sessionUser?: SessionUser;
    }
  }
}
