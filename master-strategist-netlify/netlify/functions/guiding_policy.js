// netlify/functions/guidingPolicy.js
exports.handler = async (event) => {
  const diag = JSON.parse(event.body || "{}");
  const { strengths, opportunities } = diag.swot;

  // Heuristic: focus policy on converting strengths + opportunities
  const policy = `Leverage your strengths (${strengths}) to capitalize on opportunities (${opportunities}). 
  Allocate resources accordingly and reduce the impact of identified weaknesses and threats.`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: "guidingPolicy",
      policy
    })
  };
};
