import { faker } from "@faker-js/faker";
import img1 from "@assets/products/electronics/3.webp";
import img2 from "@assets/products/electronics/7.webp";
import img3 from "@assets/products/food/3.webp";
import img4 from "@assets/products/services/1.webp";
import img5 from "@assets/products/fashion/4.webp";
import img6 from "@assets/products/food/18.webp";
import img7 from "@assets/products/electronics/16.webp";
import img8 from "@assets/products/electronics/24.webp";
import img9 from "@assets/products/electronics/1.webp";
import img10 from "@assets/products/food/12.webp";
import img11 from "@assets/products/food/13.webp";
import img12 from "@assets/products/fashion/10.webp";
import img13 from "@assets/products/services/1.webp";
import img14 from "@assets/products/fashion/2.webp";
import img15 from "@assets/products/electronics/2.webp";
import img16 from "@assets/products/electronics/8.webp";

const products_management = [
  {
    _id: "product1",
    product_name: "Xiaomi WiFI Repeater Pro",
    product_slug: "xiaomi-wifi-repeater-pro",
    product_thumb: img1,
    product_description: "test test test test",
    product_brand: "663fc259d1665c7e45e8401c",
    product_category: [
      "663f9d30220d580c7b4cbc9e",
      "663f9e62220d580c7b4cbca8",
      "663f9e9c220d580c7b4cbcaa",
    ],
    product_variations: [
      { images: [], name: "color", options: ["green", "yellow"] },
      { images: [], name: "size", options: ["S", "M"] },
    ],
    product_attributes: [
      {
        _id: faker.string.uuid(),
        attribute_name: "Phong cách",
        attribute_value_list: [
          {
            attribute_value: "đường phố",
          },
          {
            attribute_value: "hàn quốc",
          },
          {
            attribute_value: "cổ điển",
          },
        ],
      },
      {
        _id: faker.string.uuid(),
        attribute_name: "Chất liệu",
        attribute_value_list: [
          {
            attribute_value: "Trượt nước",
          },
          {
            attribute_value: "Thân thiện môi trường",
          },
          {
            attribute_value: "Vải mềm",
          },
        ],
      },
    ],

    product_price: 254,
    product_quantity: 15,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: faker.string.uuid(),
    product_name: "Highclass test",
    product_slug: "hightclass-test",
    product_thumb: img2,
    product_description: "test test test test",
    product_brand: "663fc259d1665c7e45e8401c",
    product_category: [
      "663f9d30220d580c7b4cbc9e",
      "663f9e62220d580c7b4cbca8",
      "663f9e9c220d580c7b4cbcaa",
    ],
    product_variations: [
      { images: [], name: "color", options: ["green", "rose"] },
      { images: [], name: "size", options: ["S", "M"] },
    ],
    product_attributes: [
      {
        _id: faker.string.uuid(),
        attribute_name: "Phong cách",
        attribute_value_list: [
          {
            attribute_value: "đường phố",
          },
          {
            attribute_value: "hàn quốc",
          },
          {
            attribute_value: "cổ điển",
          },
        ],
      },
      {
        _id: faker.string.uuid(),
        attribute_name: "Chất liệu",
        attribute_value_list: [
          {
            attribute_value: "Trượt nước",
          },
          {
            attribute_value: "Thân thiện môi trường",
          },
          {
            attribute_value: "Vải mềm",
          },
        ],
      },
    ],

    product_price: 254,
    product_quantity: 15,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: "product2",
    product_name: "Highclass test34",
    product_slug: "hightclass-test35",
    product_thumb: img3,
    product_description: "test test test test",
    product_brand: "663fc259d1665c7e45e8401c",
    product_category: [
      "663f9d30220d580c7b4cbc9e",
      "663f9e62220d580c7b4cbca8",
      "663f9e9c220d580c7b4cbcaa",
    ],
    product_variations: [
      { images: [], name: "color", options: ["black", "white"] },
      { images: [], name: "size", options: ["S", "M"] },
    ],
    product_attributes: [
      {
        _id: faker.string.uuid(),
        attribute_name: "Phong cách",
        attribute_value_list: [
          {
            attribute_value: "đường phố",
          },
          {
            attribute_value: "hàn quốc",
          },
          {
            attribute_value: "cổ điển",
          },
        ],
      },
      {
        _id: faker.string.uuid(),
        attribute_name: "Chất liệu",
        attribute_value_list: [
          {
            attribute_value: "Trượt nước",
          },
          {
            attribute_value: "Thân thiện môi trường",
          },
          {
            attribute_value: "Vải mềm",
          },
        ],
      },
    ],

    product_price: 254,
    product_quantity: 15,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: "product3",
    product_name: "Highclass test32",
    product_slug: "hightclass-test32",
    product_thumb: img4,
    product_description: "test test test test",
    product_brand: "663fc259d1665c7e45e8401c",
    product_category: [
      "663f9d30220d580c7b4cbc9e",
      "663f9e62220d580c7b4cbca8",
      "663f9e9c220d580c7b4cbcaa",
    ],
    product_variations: [
      { images: [], name: "color", options: ["red", "green"] },
      { images: [], name: "size", options: ["S", "M"] },
    ],
    product_attributes: [
      {
        _id: faker.string.uuid(),
        attribute_name: "Phong cách",
        attribute_value_list: [
          {
            attribute_value: "đường phố",
          },
          {
            attribute_value: "hàn quốc",
          },
          {
            attribute_value: "cổ điển",
          },
        ],
      },
      {
        _id: faker.string.uuid(),
        attribute_name: "Chất liệu",
        attribute_value_list: [
          {
            attribute_value: "Trượt nước",
          },
          {
            attribute_value: "Thân thiện môi trường",
          },
          {
            attribute_value: "Vải mềm",
          },
        ],
      },
    ],

    product_price: 254,
    product_quantity: 15,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
];

export default products_management;
