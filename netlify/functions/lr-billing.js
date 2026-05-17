// Forwards LawRuler webhooks → LR_BILLING SHEET 2 (ActivePieces)
// Replaces Hookdeck destination: COMMISSION-SHEET-2

exports.handler = async (event) => {
  const AP_URL = "https://cloud.activepieces.com/api/v1/webhooks/ZNVtDNS2lshLCKeb8jfGJ";

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
