var axios = require("axios");

export default function handler(req, res) {
  const company = req.query.company || "";
  if (company.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma empresa válida",
      },
    });
    return;
  }

  const resume = req.query.resume || "";
  if (resume.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira um resumo válido",
      },
    });
    return;
  }

  const audience = req.query.audience || "";
  if (audience.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Insira uma audiência válida",
      },
    });
    return;
  }

  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt: `Escreva em formato de lista ordenada, três criativos títulos com no máximo 30 caracteres cada, para a referente empresa com seu respectivo resumo que irá rodar no Google Ads com público alvo ${audience}
    Empresa: ${company}
    Descrição: ${resume}`,
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var config = {
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
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
    });
}