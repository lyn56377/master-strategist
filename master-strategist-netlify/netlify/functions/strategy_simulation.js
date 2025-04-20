// netlify/functions/strategySimulation.js
exports.handler = async (event) => {
  const { actions } = JSON.parse(event.body || "{}");

  // Very basic “simulation”: list each action with a mock outcome
  const simulation = actions.map((act, i) => ({
    action: act,
    predictedOutcome: `Outcome for action #${i+1}: success probability ${(Math.random()*50+50).toFixed(0)}%`
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: "strategySimulation",
      simulation
    })
  };
};
