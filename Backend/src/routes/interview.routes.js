const { Router } = require("express");

const interviewController = require("../controller/interview.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { upload } = require("../middleware/file.middleware");

const interviewRouter = Router();

interviewRouter.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  interviewController.generateReportController,
);

module.exports = interviewRouter;
