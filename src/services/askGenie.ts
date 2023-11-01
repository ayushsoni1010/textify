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
            role: "user",
            content:
              "Write a program in C language for finding the factorial of 100",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    console.log(data);
    return data; // Handle the OpenAI response here
  } catch (error) {
    console.error("Error:", error);
  }
}
