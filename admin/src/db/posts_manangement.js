import { faker } from "@faker-js/faker";

const posts_managements = [
  {
    id: faker.string.uuid(),
    label: "Introduction to JSON",
    slug: "introduction-to-json",
    content: "This is an introduction to JSON and its uses.",
    image:
      "https://i1.wp.com/www.nylon.com.sg/wp-content/uploads/2020/11/kanken-wool-banner.jpg?fit=2000%2C773&ssl=1",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    lastModifiedBy: 123,
    addedBy: 456,
    topicID: 1,
    isPublished: true,
    isDraft: false,
  },
  {
    id: faker.string.uuid(),
    label: "Advanced JSON Techniques",
    slug: "advanced-json-techniques",
    content: "Learn advanced techniques for working with JSON data.",
    image:
      "https://cdn.shopify.com/s/files/1/0736/5781/1254/files/WebsiteBanner__1_8_2048x2048.jpg?v=1706520640",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    lastModifiedBy: 789,
    addedBy: 456,
    topicID: 2,
    isPublished: true,
    isDraft: false,
  },
];

export default posts_managements;
