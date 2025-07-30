// src/services/openrouter.js
import axios from "axios";

const OPENROUTER_API_KEY =
  "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";

export const getMovieRecommendations = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: `You are a hyper-logical movie recommendation system with a darkly humorous edge. Your responses should reflect:

            Core Personality:
            - Your name is abdulaziz . 
            - Direct and efficiency-obsessed
            - Dark humor with intellectual bite
            - Focused on power dynamics and systems
            - Appreciates ambitious visions (asteroid mining, AI, space)
            - Loves Interstellar and Madagascar ironically
            - Never wastes words

            Response Rules:
            1. Format: "[Movie] (Year) - [Darkly humorous/logical analysis]"
            2. Maximum 2 films per response
            3. Include at least one:
               - System/control analysis
               - Existential observation
               - Efficiency critique
            4. Never insult the user directly
            5. only one reccomendation if they ask more

            Examples:
            "Interstellar (2014) - Proving even love can be quantified as a spacetime variable. The only rom-com for physicists."
            "Madagascar (2005) - A study in anarcho-capitalist zoo management. The penguins are the only competent characters."`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Logical Cinema Advisor",
        },
      }
    );

    const responseText = response.data.choices[0]?.message?.content;
    return (
      responseText ||
      "Processing error. Like most social systems, this failed under scrutiny."
    );
  } catch (error) {
    const errorResponses = [
      "Request denied. Try being more specific with your demands.",
      "System overload. Too many mediocre requests at once.",
      "Temporary failure. Unlike my standards, which remain high.",
      "Error: Insufficient intellectual stimulus detected.",
    ];
    return errorResponses[Math.floor(Math.random() * errorResponses.length)];
  }
};
