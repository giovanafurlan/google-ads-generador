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

  const keywords = req.query.keywords;
  const avoidKeywords = req.query.avoidKeywords;

  var data = JSON.stringify({
    model: "text-davinci-003",
    prompt: `Nome da empresa: Google\nAudiência: Jovens\nResumo: empresa de tecnologia multinacional americana com foco em publicidade on-line, tecnologia de mecanismo de pesquisa\nPalavras chaves: Pesquisa,Online\nPalavras para evitar: Devagar,Horrível\nAnúncio Google Ads: A Google é uma empresa de tecnologia multinacional americana focada em publicidade on-line e tecnologia de mecanismo de pesquisa. Alcance jovens de maneira eficaz e obtenha resultados surpreendentes com a Google!/Explore a tecnologia de mecanismo de pesquisa da Google para obter resultados incríveis e alcançar jovens com mais eficiência!\nNome da empresa: ${company}\nAudiência: ${audience}\nResumo: ${resume}\nPalavras chaves: ${keywords}\nPalavras para evitar: ${avoidKeywords}\nnDescrições Anúncio Google Ads: `,
    temperature: 0.5,
    max_tokens: 2000,
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
