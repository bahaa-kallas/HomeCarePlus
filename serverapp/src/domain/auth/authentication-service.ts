import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserService from "../users/user-service.js";
import EmailSendingService from "../email/email-service.js";
import { randomUUID } from "node:crypto";
import { SessionUserSchema, UserType } from "../users/user-model.js";

class AuthenticationService {
  private readonly userService: UserService;
  private readonly emailSendingService: EmailSendingService;

  constructor(userService: UserService, emailSendingService: EmailSendingService) {
    this.userService = userService;
    this.emailSendingService = emailSendingService;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.hashedPassword) {
      const sessionUser = SessionUserSchema.parse(user);
      return jwt.sign(sessionUser, process.env.JWT_SECRET, { expiresIn: "15d" });
    }
    return null;
  }

  async signup(name: string, email: string, password: string, type: UserType): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const emailVerificationToken = randomUUID();

    await this.userService.create({
      createdAt: new Date(),
      addresses: [],
      email,
      emailVerificationToken,
      emailVerified: false,
      hashedPassword,
      id: randomUUID(),
      name,
      salt,
      type,
    });
    const verificationLink = `http://localhost:3000/auth/verifyEmail/${emailVerificationToken}`;
    console.log("Sending verification email to: ${email}");
    //await this.emailSendingService.sendVerificationEmail(email, verificationLink);
    console.log(`User signed up successfully: ${email}`);
  }

  async verifyEmail(verificationToken: string): Promise<void> {
    const user = await this.userService.getByVerificationToken(verificationToken);
    if (!user) {
      console.error("Invalid verification token");
      throw new Error("Invalid verification token");
    }
    await this.userService.update(user.id, { emailVerified: true, emailVerificationToken: null });
    console.log("Email verification successful");
  }
}

export default AuthenticationService;
