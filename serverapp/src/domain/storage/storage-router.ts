import express from "express";
import multer from "multer";
import storageEngine, { isAwsS3Configured } from "./storage-engine.js";

const StorageRouter = express.Router();
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 }, // 1MB
});

// "uploadedMedia" KEEP IN SYNC WITH THE NAME OF THE INPUT FIELD IN THE FRONTEND
StorageRouter.post("/", upload.single("uploadedMedia"), (req, res, next) => {
  const fileUrl = isAwsS3Configured ? (req.file as any).location : `${req.protocol}://${req.get("host")}/${req.file.path}`;
  res.status(200).json({ message: "File uploaded successfully", fileUrl: fileUrl });
});
StorageRouter.use("/uploads", express.static("public/uploads"));


export default StorageRouter;