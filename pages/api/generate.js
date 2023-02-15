import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const company = req.body.company || "";
  if (company.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid company",
      },
    });
    return;
  }

  const resume = req.body.resume || "";
  if (resume.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid resume",
      },
    });
    return;
  }

  const audience = req.body.audience || "";
  if (audience.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid audience",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(company,resume,audience),
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(company, resume, audience) {
  const capitalizedCompany =
  company[0].toUpperCase() + company.slice(1).toLowerCase();
  const capitalizedResume =
    resume[0].toUpperCase() + resume.slice(1).toLowerCase();
  const capitalizedAudience =
    audience[0].toUpperCase() + audience.slice(1).toLowerCase();
  return `Write a creative ad for the following company who does a certain service to run on Google Ads aimed at ${capitalizedAudience}}:
  Company: ${capitalizedCompany}
  Service: ${capitalizedResume}`;
}
