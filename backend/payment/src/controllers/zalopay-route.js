const express = require("express");
const router = express.Router();
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const dotEnv = require("dotenv");
const qs = require("qs");
dotEnv.config();

router.post("/", async (req, res) => {
  const { order_trackingNumber, orderInfo, amount } = req.body;
  const embed_data = {
    redirecturl: "http://localhost:3000/kiem-tra-thanh-toan",
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: process.env.ZALOPAY_APP_ID,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount,
    expire_duration_seconds: 300,
    description: `OUTRUNNER - Thanh toán cho đơn hàng #${order_trackingNumber}`,
    bank_code: "",
    callback_url:
      "https://b2d4-113-161-95-60.ngrok-free.app/api/payment/zalopay/callback",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    process.env.ZALOPAY_APP_ID +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, process.env.ZALOPAY_KEY1).toString();

  try {
    const result = await axios.post(
      "https://sb-openapi.zalopay.vn/v2/create",
      null,
      { params: order }
    );
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/callback", async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, process.env.ZALOPAY_KEY2).toString();
    console.log("mac =", mac);

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      // update don hang o day
      let dataJson = JSON.parse(dataStr, process.env.ZALOPAY_KEY2);
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson["app_trans_id"]
      );

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
});

router.post("/transaction-status", async (req, res) => {
  const { apptransid } = req.body;

  let postData = {
    app_id: process.env.ZALOPAY_APP_ID,
    app_trans_id: apptransid, // Input your app_trans_id
  };

  let data =
    postData.app_id +
    "|" +
    postData.app_trans_id +
    "|" +
    process.env.ZALOPAY_KEY1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, process.env.ZALOPAY_KEY1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
