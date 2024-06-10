import { faker } from "@faker-js/faker";
import img1 from "@assets/products/electronics/1.webp";
import img2 from "@assets/products/fashion/1.webp";
import img3 from "@assets/products/electronics/3.webp";

const sliders_managements = [
  {
    _id: faker.string.uuid(),
    slider_name: "Example Slider 1",
    slider_link: "gfsdgshgjfbvxbn",
    slider_description: "cvxb",
    slider_summary: "tegdfsst",
    slider_position: "header",
    slider_image: img1,
    slider_is_active: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: faker.string.uuid(),
    slider_name: "Example Brand 2",
    slider_link: "gfsdgsfbvxhjfgjbn",
    slider_description: "fdsffgsdfds",
    slider_summary: "test",
    slider_position: "footer",
    slider_image: img3,
    slider_is_active: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    _id: faker.string.uuid(),
    slider_name: "Example Brand 3",
    slider_link: "gfsdgsfbvxbhgfjn",
    slider_description: "ghvcx",
    slider_summary: "testdfg",
    slider_position: "header",
    slider_image: img2,
    slider_is_active: true,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
];
export default sliders_managements;
