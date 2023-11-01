import { helpers } from "@/helpers";

// In your React component or JavaScript file
export async function askGenie() {
  try {
    const response = await fetch(`${helpers.apiURL}/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content:
              'Translate the following English text to French: "Hello, how are you?"',
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    console.log(data); // Handle the OpenAI response here
  } catch (error) {
    console.error("Error:", error);
  }
}
