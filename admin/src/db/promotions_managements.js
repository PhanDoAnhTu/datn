import { faker } from "@faker-js/faker";

const promotions_manangement = [
  {
    _id: faker.string.uuid(),
    special_offer_name: "ct giam gia 1",
    special_offer_image: [],
    special_offer_start_date: faker.date.past(),
    special_offer_end_date: faker.date.recent(),
    special_offer_is_active: false,
    special_offer_description: "chuong trinh ra mat san pham",
    special_offer_spu_list: [
      {
        product_id: "664dc4cb26632c0a5c32ee0e",
        max_user_uses: 20,
        sku_list: [
          {
            sku_id: "664dc4cb26632c0a5c32ee10",
            sku_tier_idx: [0, 0],
            price_sale: 300000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee11",
            sku_tier_idx: [0, 1],
            price_sale: 400000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee12",
            sku_tier_idx: [1, 0],
            price_sale: 500000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee13",
            sku_tier_idx: [1, 1],
            price_sale: 600000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
        ],
      },
    ],
  },
  {
    _id: faker.string.uuid(),
    special_offer_name: "ct giam gia 2",
    special_offer_image: [],
    special_offer_start_date: faker.date.future(),
    special_offer_end_date: faker.date.future(),
    special_offer_is_active: true,
    special_offer_description: "chuong trinh khuyen mai cuoi nam",
    special_offer_spu_list: [
      {
        product_id: "664dc4cb26632c0a5c32ee0e",
        max_user_uses: 20,
        sku_list: [
          {
            sku_id: "664dc4cb26632c0a5c32ee10",
            sku_tier_idx: [0, 0],
            price_sale: 300000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee11",
            sku_tier_idx: [0, 1],
            price_sale: 400000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee12",
            sku_tier_idx: [1, 0],
            price_sale: 500000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee13",
            sku_tier_idx: [1, 1],
            price_sale: 600000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
        ],
      },
    ],
  },
  {
    _id: faker.string.uuid(),
    special_offer_name: "ct giam gia 3",
    special_offer_image: [],
    special_offer_start_date: faker.date.past(),
    special_offer_end_date: faker.date.future(),
    special_offer_is_active: true,
    special_offer_description: "chuong trinh ra mat ban cuong",
    special_offer_spu_list: [
      {
        product_id: "664dc4cb26632c0a5c32ee0e",
        max_user_uses: 20,
        sku_list: [
          {
            sku_id: "664dc4cb26632c0a5c32ee10",
            sku_tier_idx: [0, 0],
            price_sale: 300000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee11",
            sku_tier_idx: [0, 1],
            price_sale: 400000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee12",
            sku_tier_idx: [1, 0],
            price_sale: 500000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
          {
            sku_id: "664dc4cb26632c0a5c32ee13",
            sku_tier_idx: [1, 1],
            price_sale: 600000,
            percentage: 50, //giá gốc 100.000
            quantity: 100, // số lượng sp khuyến mãi, mặc định không chọn thì lấy giá trị kho hàng,
            quantity_sold: 0, //số lượng đã bán(lấy giá trị mặc định ko cần thêm)
            is_active: true, //bật tắt
          },
        ],
      },
    ],
  },
];

export default promotions_manangement;
