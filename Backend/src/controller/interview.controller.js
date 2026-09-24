const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");
const { PDFParse } = require("pdf-parse");

async function generateReportController(req, res) {
  try {
    const { jobDescription, selfDescription } = req.body;

    // Validate request
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload your resume PDF.",
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        message: "jobDescription is required.",
      });
    }

    if (!selfDescription) {
      return res.status(400).json({
        message: "selfDescription is required.",
      });
    }

    // Read PDF
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const parsedResume = await parser.getText();

    await parser.destroy();

    const resumeContent = parsedResume.text;

    if (!resumeContent || !resumeContent.trim()) {
      return res.status(400).json({
        message: "Could not extract text from the resume PDF.",
      });
    }

    console.log("Generating interview report...");

    // Generate AI report
    const interviewReportByAi = await generateInterviewReport({
      jobDescription,
      resume: resumeContent,
      selfDescription,
    });

    // Save report to MongoDB
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res.status(201).json({
      message: "Interview report generated successfully.",
      report: interviewReport,
    });
  } catch (error) {
    console.error("Interview report error:", error);

    return res.status(500).json({
      message: "Unable to generate interview report.",
      error: error.message,
    });
  }
}

module.exports = {
  generateReportController,
};
