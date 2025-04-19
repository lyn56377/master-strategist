// netlify/functions/diagnose.js
const Sentiment = require("sentiment");
const keyword_extractor = require("keyword-extractor");

exports.handler = async (event) => {
  const { challenge, aspects, env, insights } = JSON.parse(event.body || "{}");
  const sentiment = new Sentiment().analyze(challenge).score;
  const keywords = keyword_extractor.extract(challenge + " " + aspects, {
    language: "english", remove_digits: true, return_changed_case:true
  }).slice(0, 10);

  // Basic SWOT heuristics
  const strengths = keywords.filter(w => ["advantage","strength","resource"].includes(w)).join(", ") || "none identified";
  const weaknesses = keywords.filter(w => ["risk","weakness","threat"].includes(w)).join(", ") || "none identified";
  const opportunities = keywords.filter(w => ["opportunity","chance","growth"].includes(w)).join(", ") || "none identified";
  const threats = keywords.filter(w => ["obstacle","challenge","barrier"].includes(w)).join(", ") || "none identified";

  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: "diagnosis",
      sentiment,
      keywords,
      swot: { strengths, weaknesses, opportunities, threats },
      summary: {
        challenge, aspects, environment: env, insights
      }
    })
  };
};
