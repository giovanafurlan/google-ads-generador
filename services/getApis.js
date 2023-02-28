import axios from "axios";

const getTitles = async (company, resume, audience, keywords, avoidKeywords) => {
  return axios
    .get("/api/generateTitle", {
      params: { company: company, resume: resume, audience: audience, keywords: keywords, avoidKeywords: avoidKeywords },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

const getDescriptions = async (company, resume, audience, keywords, avoidKeywords) => {
  return axios
    .get("/api/generateDescription", {
      params: { company: company, resume: resume, audience: audience, keywords: keywords, avoidKeywords: avoidKeywords },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

export { getTitles, getDescriptions };
