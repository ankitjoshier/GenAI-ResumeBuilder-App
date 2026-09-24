const mongoose = require("mongoose");

/**
 * - job description schema: string
 * - resume text : String
 * - self description : String
 *
 * - matchScore: number
 *
 * - technical questions:
 *          [{
 *             question: String,
 *            answer: String,
 *           intention: String,
 *          }]
 *  - behavioral questions:
 *         [{
 *             question: String,
 *            answer: String,
 *           intention: String,
 *          }]
 *  - skill gaps:
 *       [{skill: String, severity:{type: String, enum: ['low', 'medium', 'high']}}]
 *  - preparation plan:[{day: Number, task: String :[string] focus: String}]
 *
 */

const preparationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: [true, "Day is required"] },
    task: { type: String, required: [true, "Task is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
  },
  { id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, "Skill is required"] },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
  },
  { id: false },
);

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is requied"],
    },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
