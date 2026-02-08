import { GoogleGenAI } from "@google/genai";
import { AppState, Domain } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAttendanceInsights = async (state: AppState, domainStats: any[]) => {
  const statsString = domainStats
    .map(d => `${d.name}: ${d.members} members (${d.present} present, ${d.absent} absent)`)
    .join('\n');

  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this club attendance data for "CodeKrafters" and provide a witty, motivating 2-sentence summary.
    Overall Stats:
    Total Members: ${state.members.length}
    Current Session Data:
    ${statsString}`,
    config: {
      temperature: 0.8,
      systemInstruction: "You are the AI assistant of CodeKrafters. Use tech-themed metaphors (e.g., 'high uptime', 'zero-latency attendance', 'compiling greatness'). Be energetic and focus on the domain-specific performance provided.",
    }
  });

  try {
    const response = await model;
    return response.text || "Systems stable. Every Krafter present is a commit towards our collective deployment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The insights engine is currently compiling. Keep pushing code and marking presence!";
  }
};
