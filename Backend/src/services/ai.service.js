const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "The match score between the candidate and the job description, ranging from 0 to 100.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question can be asked during the interview.",
          ),
        intention: z
          .string()
          .describe("The intention behind the asking this question."),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what to avoid, and how to structure the answer.",
          ),
      }),
    )
    .describe("The technical questions can be asked during the interview."),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral question can be asked during the interview.",
          ),
        intention: z
          .string()
          .describe("The intention behind the asking this question."),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what to avoid, and how to structure the answer.",
          ),
      }),
    )
    .describe("The behavioral questions can be asked during the interview."),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of the skill gap, whether it is low, medium, or high.",
          ),
      }),
    )
    .describe(
      "The skill gaps of the candidate, which skills the candidate is lacking and how severe the gap is.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day of the preparation plan, starting from 1."),
        task: z.string().describe("The task to be completed on this day."),
        focus: z
          .string()
          .describe(
            "The focus of the task, what to focus on while completing the task.",
          ),
      }),
    )
    .describe(
      "The preparation plan for the candidate, what tasks to complete on each day and what to focus on while completing the tasks.",
    ),
});

async function generateInterviewReport({
  jobDescription,
  resume,
  selfDescription,
}) {
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error("GOOGLE_GENAI_API_KEY is not configured.");
  }

  const responseJsonSchema = z.toJSONSchema(interviewReportSchema);
  const prompt = `Generate a complete interview report as JSON.

Every array must contain populated objects. Do not return null values.

Candidate resume:
${resume}

Candidate self-description:
${selfDescription}

Job description:
${jobDescription}`;

  let response;
  const models = ["gemini-3.6-flash", "gemini-3.5-flash-lite"];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await ai.models.generateContent({
        model: models[attempt === 1 ? 0 : 1],
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseJsonSchema,
        },
      });
      break;
    } catch (error) {
      const isTemporaryError = error.status === 503 || error.status === 429;

      if (!isTemporaryError || attempt === 3) {
        throw error;
      }

      console.warn(
        `Gemini model was temporarily unavailable. Retrying with ${models[1]}...`,
      );
      await wait(attempt * 2000);
    }
  }

  return interviewReportSchema.parse(JSON.parse(response.text));
}

module.exports = generateInterviewReport;
