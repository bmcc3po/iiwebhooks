// Forwards LawRuler webhooks → LCA_POSTBACK_v1 chlor (ActivePieces)
// Replaces Hookdeck destination: activepieces (generic-named one feeding LCA postback)

exports.handler = async (event) => {
  const AP_URL = "https://cloud.activepieces.com/api/v1/webhooks/0QM0cJiy8L3xSOY3FcyPX";

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
