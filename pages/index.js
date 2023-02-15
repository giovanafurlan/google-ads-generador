import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [companyInput, setCompanyInput] = useState("");
  const [audienceInput, setAudienceInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: companyInput, audience: audienceInput, resume: resumeInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setResumeInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
        <input
            type="text"
            name="company"
            placeholder="Enter a company"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
          />
           <input
            type="text"
            name="audience"
            placeholder="Enter a audience"
            value={audienceInput}
            onChange={(e) => setAudienceInput(e.target.value)}
          />
          <input
            type="text"
            name="resume"
            placeholder="Enter a resume"
            value={resumeInput}
            onChange={(e) => setResumeInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
