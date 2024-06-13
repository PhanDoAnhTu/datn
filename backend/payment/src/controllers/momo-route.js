const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const crypto = require("crypto");
const dotEnv = require("dotenv");
dotEnv.config();

router.post("/", async (req, res) => {
  const { orderInfo, amount } = req.body;
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var partnerCode = "MOMO";
  var redirectUrl = "http://localhost:3000/kiem-tra-thanh-toan";
  var ipnUrl =
    "https://7bd6-112-197-100-135.ngrok-free.app/api/payment/momo/callback";
  var requestType = "payWithMethod";
  var orderExpireTime = 5;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";
  // console.log(process.env.ACCESS_KEY);
  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    process.env.MOMO_ACCESS_KEY +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  var signature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY)
    .update(rawSignature)
    .digest("hex");

  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    orderExpireTime: orderExpireTime,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });
  console.log("requestBody", requestBody);
  //options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error });
  }
});

router.post("/callback", async (req, res) => {
  console.log("callback::");
  console.log(req.body);

  //update order
});

router.post("/transaction-status", async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${process.env.MOMO_ACCESS_KEY}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId,
    signature,
    lang: "vi",
  });

  //options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  let result = await axios(options);

  return res.status(200).json(result.data);
});

module.exports = router;
