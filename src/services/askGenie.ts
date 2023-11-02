import { helpers } from "../helpers";

export async function askGenie(prompt: string) {
  try {
    const response = await fetch(`${helpers.apiURL}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
