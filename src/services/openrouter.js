export const getMovieRecommendations = async (prompt) => {
  try {
    const response = await fetch("/api/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content: "Your system prompt here...",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error("Failed to get recommendations:", error);
    return "System busy calculating the optimal insult... try again later";
  }
};
