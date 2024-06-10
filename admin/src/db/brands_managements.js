import { faker } from "@faker-js/faker";

const brands_managements = [
  {
    id: faker.string.uuid(),
    label: "Example Brand 1",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: 0,
    addedBy: 0,
    isPublished: 0,
    isDraft: 0,
  },
  {
    id: faker.string.uuid(),
    label: "Example Brand 2",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: 0,
    addedBy: 0,
    isPublished: 0,
    isDraft: 0,
  },
  {
    id: faker.string.uuid(),
    label: "Example Brand 3",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    modifiedBy: 0,
    addedBy: 0,
    isPublished: 0,
    isDraft: 0,
  },
];
export default brands_managements;
