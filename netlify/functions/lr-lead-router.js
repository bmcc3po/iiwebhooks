// Forwards LawRuler webhooks → LR Lead Router v1 (ActivePieces)
// Replaces Hookdeck destination: activepieces-LR-JC-LEAD-ROUTER

exports.handler = async (event) => {
  const AP_URL = "https://cloud.activepieces.com/api/v1/webhooks/XaupLPhDb0yPJo9Tlf2Je";

  try {
    const response = await fetch(AP_URL, {
      method: "POST",
      headers: {
        "Content-Type": event.headers["content-type"] || "application/json",
      },
      body: event.body,
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
