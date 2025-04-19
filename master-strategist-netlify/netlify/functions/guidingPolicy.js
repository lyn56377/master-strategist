exports.handler = async (event) => {
  const data = JSON.parse(event.body || "{}");
  // TODO: implement guiding policy logic using diagnosis data
  return {
    statusCode: 200,
    body: JSON.stringify({
      stage: "guidingPolicy",
      received: data,
      recommendation: "Placeholder guiding policy result"
    })
  };
};