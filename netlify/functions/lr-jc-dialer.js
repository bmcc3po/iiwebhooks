// Forwards LawRuler webhooks → JC Dialer Router (ActivePieces)
// Replaces Hookdeck destination: anew-lead-to-ap-to-jc-all-dialers-4-8-26

exports.handler = async (event) => {
  const AP_URL = "https://cloud.activepieces.com/api/v1/webhooks/eh3mgOy7yorB9FbujfClN";

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
