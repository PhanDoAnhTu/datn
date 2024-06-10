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

const categories_management = [
  {
    _id: "test1",
    category_image: img1,
    category_parent_id: null,
    category_name: "Women",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: "test2",
    category_image: img2,
    category_parent_id: null,
    category_name: "Men",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: faker.string.uuid(),
    category_image: img3,
    category_parent_id: "test1",
    category_name: "Backpack",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: faker.string.uuid(),
    category_image: img4,
    category_parent_id: "test2",
    category_name: "Mask",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: faker.string.uuid(),
    category_image: img5,
    category_parent_id: "test1",
    category_name: "Shirt",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: "test3",
    category_image: img6,
    category_parent_id: "test2",
    category_name: "Bracelet",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
  {
    _id: faker.string.uuid(),
    category_image: img7,
    category_parent_id: "test3",
    category_name: "Bracelet123",
    category_description: "test",
    category_icon: "icon",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    isDraft: false,
    isPublished: true,
    isDeleted: false,
  },
];

export default categories_management;
