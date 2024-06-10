import { faker } from "@faker-js/faker";

const contacts_management = [
  {
    id: 1,
    label: "Query Product",
    content: "I have a question about the product specifications.",
    email: "john.doe@example.com",
    fullName: "John Doe",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    isSolved: 0,
    staffID: 0,
  },
  {
    id: 2,
    label: "Technical Issue",
    content: "Experiencing technical difficulties with the software.",
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    isSolved: 1,
    staffID: 0,
  },
  {
    id: 3,
    label: "Feedback",
    content: "Just wanted to share some feedback on the service.",
    email: "sam.wilson@example.com",
    fullName: "Sam Wilson",
    dateAdded: faker.date.past(),
    dateModified: faker.date.recent(),
    isSolved: 1,
    staffID: 0,
  },
];

export default contacts_management;
