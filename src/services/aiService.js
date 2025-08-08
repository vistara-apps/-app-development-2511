import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const generatePersonalizedRecommendation = async (userPreferences) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a luxury travel concierge AI specializing in family vacations. Provide personalized recommendations based on user preferences."
        },
        {
          role: "user",
          content: `Based on these preferences: ${JSON.stringify(userPreferences)}, recommend a luxury family vacation experience. Include specific activities, accommodations, and why this would be perfect for their family.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI service error:', error);
    return "I'm having trouble generating recommendations right now. Please try again later or contact our concierge team for personalized assistance.";
  }
};

export const generateItinerary = async (bundle, familySize, interests) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a luxury travel planner. Create detailed daily itineraries for family vacations."
        },
        {
          role: "user",
          content: `Create a detailed itinerary for ${bundle.propertyName} in ${bundle.location} for a family of ${familySize} with interests in: ${interests.join(', ')}. Duration: ${bundle.duration}`
        }
      ],
      max_tokens: 800,
      temperature: 0.6
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI itinerary error:', error);
    return bundle.itinerary.join('\n');
  }
};