import { faker } from "@faker-js/faker";

const discounts_manangement = [
  {
    discount_name: "Back to School Sale",
    discount_description: "Get 30% off on all school supplies",
    discount_type: "percentage",
    discount_value: 30,
    discount_max_value: 20000,
    discount_code: "BTS2024",
    discount_start_date: "2024-08-15 9:00:00",
    discount_end_date: "2024-08-16 9:00:00",
    discount_max_uses: 50,
    discount_uses_count: 3,
    discount_users_used: [
      faker.string.uuid(),
      faker.string.uuid(),
      faker.string.uuid(),
    ],
    discount_max_person_uses: 10,
    discount_max_user_uses: 50,
    discount_min_order_value: 100000,
    discount_is_active: true,
    discount_applies_to: "all",
    discount_product_ids: [],
  },
  {
    discount_name: "Summer Fashion Sale",
    discount_description: "Get $20 off on all summer clothing",
    discount_type: "fixed_amount",
    discount_value: 20,
    discount_max_value: 20000,
    discount_code: "SUMMER2024",
    discount_start_date: "2024-07-01 9:00:00",
    discount_end_date: "2024-07-31 9:00:00",
    discount_max_uses: 100,
    discount_uses_count: 0,
    discount_users_used: [],
    discount_max_person_uses: 20,
    discount_max_user_uses: 10,
    discount_min_order_value: 50000,
    discount_is_active: false,
    discount_applies_to: "all",
    discount_product_ids: [],
  },
];

export default discounts_manangement;
