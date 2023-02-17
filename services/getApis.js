import axios from "axios";

const getTitles = async (company, resume, audience) => {
  return axios
    .get("/api/generateT", {
      params: { company: company, resume: resume, audience: audience },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

const getDescriptions = async (company, resume, audience) => {
  return axios
    .get("/api/generateD", {
      params: { company: company, resume: resume, audience: audience },
    })
    .then((e) => {
      return e.data;
    })
    .catch((e) => {
      // console.log(e);
      return;
    });
};

export { getTitles, getDescriptions };
