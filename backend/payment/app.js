const { default: axios } = require("axios");
const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//tao duong link thanh toan

var accessKey = "F8BBA842ECF85";
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
app.post("/payment", async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  var ipnUrl = "https://d6a0-112-197-100-135.ngrok-free.app/callback";
  var requestType = "payWithMethod";
  var amount = "200000";
  var orderExpireTime = 5;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
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
    .createHmac("sha256", secretKey)
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
    return res.status(500).json({ statusCode: 500, message: "server error" });
  }
});
const asynchandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
app.use("/", require("./route"));

app.post("/callback", async (req, res) => {
  console.log("callback::");
  console.log(req.body);
  //cap nhat trang thai don hang

  return res.status(200).json(req.body);
});

app.post("/transaction-status", async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
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

app
  .listen(6000, () => {
    console.log("server is running at port 6000");
  })
  .on("error", (err) => {
    console.log(err);
    process.exit();
  });
