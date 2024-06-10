import { faker } from "@faker-js/faker";

const topics_management = [
  {
    id: faker.string.uuid(),
    label: "Fashion",
    description: "Topic about fashion",
    slug: "fashion",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: "1",
    addedBy: "2",
    status: "publish",
  },
  {
    id: faker.string.uuid(),
    label: "Celebreties",
    description: "Topic about celebreties",
    slug: "celebreties",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: "1",
    addedBy: "2",
    status: "publish",
  },
  {
    id: faker.string.uuid(),
    label: "Materials",
    description: "Topic about material for our products",
    slug: "materials",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: "1",
    addedBy: "2",
    status: "draft",
  },
  {
    id: faker.string.uuid(),
    label: "Events",
    description: "Topic about events",
    slug: "events",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: "1",
    addedBy: "2",
    status: "trash",
  },
];

export default topics_management;
