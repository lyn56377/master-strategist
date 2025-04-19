// netlify/functions/coherentActions.js
exports.handler = async (event) => {
  const { policy } = JSON.parse(event.body || "{}");

  // Break policy into steps by sentences
  const actions = policy.split(".").map(s => s.trim()).filter(Boolean);

  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: "coherentActions",
      actions
    })
  };
};
