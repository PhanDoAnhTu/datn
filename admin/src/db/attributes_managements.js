import { faker } from "@faker-js/faker";

const attributes_managements = [
  {
    _id: faker.string.uuid(),
    attribute_name: "Example attribute 1",
    attribute_list_value: [
      {
        attribute_value: "Attribute 1 value 1",
      },
      {
        attribute_value: "Attribute 1 value 2",
      },
      {
        attribute_value: "Attribute 1 value 3",
      },
    ],
  },
  {
    _id: faker.string.uuid(),
    attribute_name: "Example attribute 2",
    attribute_list_value: [
      {
        attribute_value: "Attribute 2 value 1",
      },
      {
        attribute_value: "Attribute 2 value 2",
      },
      {
        attribute_value: "Attribute 2 value 3",
      },
    ],
  },
  {
    _id: faker.string.uuid(),
    attribute_name: "Example attribute 3",
    attribute_list_value: [
      {
        attribute_value: "Attribute 3 value 1",
      },
      {
        attribute_value: "Attribute 3 value 2",
      },
      {
        attribute_value: "Attribute 3 value 3",
      },
    ],
  },
];
export default attributes_managements;
