import { format, transports } from "winston";
import expressWinston from "express-winston";

const LoggerMiddleware = expressWinston.logger({
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
});

export default LoggerMiddleware;