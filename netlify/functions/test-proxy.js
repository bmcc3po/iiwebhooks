exports.handler = async (event) => {
  const AP_URL = "https://cloud.activepieces.com/api/v1/webhooks/XTdNIjYigVYoFZ8CRiuEW";
  
  try {
    const response = await fetch(AP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body || JSON.stringify({ test: "from-netlify", ts: Date.now() }),
    });
    
    const text = await response.text();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        forwarded: true,
        ap_status: response.status,
        ap_response: text,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
