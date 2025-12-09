import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Specimen, HealthLog, FeedItem } from "../types";

// Initialize the client strictly with process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// -- USE CASE 1: Specimen Health Forecasting --
export const analyzeHealthRisk = async (
  specimen: Specimen,
  logs: HealthLog[],
  speciesName: string
): Promise<string> => {
  const model = "gemini-2.5-flash"; // Fast inference for dashboard
  
  const prompt = `
    Analyze the health risk for this specimen.
    Species: ${speciesName}
    Age: ${new Date().getFullYear() - new Date(specimen.birthDate).getFullYear()} years
    Recent Logs: ${JSON.stringify(logs.slice(0, 5))}
    
    Provide a concise risk assessment (Low, Medium, High) and a specific recommendation for the veterinarian.
    Format: "Risk Level: [Level]. Recommendation: [Action]."
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert veterinary pathologist AI specializing in zoo animals.",
        temperature: 0.2, // Low temperature for factual consistency
      }
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Health analysis failed", error);
    return "AI Analysis temporarily unavailable.";
  }
};

// -- USE CASE 2: Feed Optimization (Inventory) --
export const optimizeFeedStock = async (
  inventory: FeedItem[],
  season: string
): Promise<{ sku: string; recommendation: string }[]> => {
  const model = "gemini-2.5-flash";

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        sku: { type: Type.STRING },
        recommendation: { type: Type.STRING }
      },
      required: ["sku", "recommendation"]
    }
  };

  const prompt = `
    Given the current season is ${season}, analyze these feed items and suggest reorder quantities or reductions based on typical zoo consumption patterns.
    Inventory Data: ${JSON.stringify(inventory)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Feed optimization failed", error);
    return [];
  }
};

// -- USE CASE 3: AI Assistant Contextual (Accounting) --
export const suggestJournalEntry = async (
  description: string
): Promise<{ debitAccount: string; creditAccount: string; explanation: string }> => {
  const model = "gemini-2.5-flash";
  
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      debitAccount: { type: Type.STRING },
      creditAccount: { type: Type.STRING },
      explanation: { type: Type.STRING }
    },
    required: ["debitAccount", "creditAccount", "explanation"]
  };

  const prompt = `
    Based on this transaction description: "${description}", suggest the appropriate General Ledger accounts for a Zoo environment.
    Common accounts: Cash, Ticket Revenue, Feed Expense, Veterinary Expense, Animal Asset, Accounts Payable.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a Senior ERP Accountant. Ensure strict double-entry compliance."
      }
    });

    const text = response.text;
    return text ? JSON.parse(text) : { debitAccount: "Unknown", creditAccount: "Unknown", explanation: "Error" };
  } catch (error) {
    console.error("Accounting suggestion failed", error);
    return { debitAccount: "Manual", creditAccount: "Manual", explanation: "AI Service Offline" };
  }
};

// -- USE CASE 4: Dynamic Pricing (Ticketing) --
export const getDynamicPricing = async (
  visitorCount: number,
  weather: string,
  isHoliday: boolean
): Promise<{ suggestedPrice: number; reasoning: string }> => {
  const model = "gemini-2.5-flash";

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      suggestedPrice: { type: Type.NUMBER },
      reasoning: { type: Type.STRING }
    },
    required: ["suggestedPrice", "reasoning"]
  };

  const prompt = `
    Calculate dynamic ticket pricing. Base price is $25.
    Current Visitor Count: ${visitorCount}
    Weather: ${weather}
    Is Holiday: ${isHoliday}
    
    Goal: Maximize revenue without overcrowding.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : { suggestedPrice: 25, reasoning: "Default pricing due to error." };
  } catch (error) {
    return { suggestedPrice: 25, reasoning: "AI Offline" };
  }
};
