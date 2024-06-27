// links: [
//   { name: "Sales Analytics", path: "/" },
//   { name: "Sellers List", path: "/sellers-list" },
//   { name: "Sellers Table", path: "/sellers-table" },
//   { name: "Sellers Grid", path: "/sellers-grid" },
//   { name: "Seller Profile", path: "/seller-profile" },
//   { name: "Revenue by Period", path: "/revenue-by-period" },
// ]

const ROUTES = [
  {
    name: "Dashboard",
    icon: "rectangle-history-circle-user-regular",
    path: "/",
  },
  {
    name: "Điều hướng",
    icon: "bars-solid",
    links: [
      { name: "Quản lý danh mục", path: "/categories-management" },
      { name: "Quản lý menu", path: "/menus-management" },
    ],
  },
  {
    name: "Sản phẩm",
    icon: "boxes-stacked-regular",
    path: "/products-management",
  },
  {
    name: "Đơn hàng",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Marketing",
    icon: "percent-solid",
    links: [
      { name: "Mã giảm giá", path: "/discounts-management" },
      {
        name: "Chương trình khuyến mãi",
        path: "/promotions-management",
      },
      { name: "Slider", path: "/sliders-management" },
    ],
  },
  {
    name: "Quản lý hãng",
    icon: "shirt-solid",
    path: "/brands-management",
  },
  {
    name: "Bài đăng & Chủ đề",
    icon: "pen-solid",
    links: [
      { name: "Quản lý chủ đề", path: "/topics-management" },
      { name: "Quản lý bài đăng", path: "/posts-management" },
    ],
  },

  {
    name: "Khách hàng",
    icon: "chart-user-regular",
    links: [
      { name: "Quản lý khách hàng", path: "/customers" },
      { name: "Hỗ trơ", path: "/support" },
    ],
  },
  {
    name: "Pages",
    icon: "layer-group-regular",
    links: [
      { name: "Login", path: "/login" },
      { name: "Page 404", path: "/404" },
    ],
  },
  {
    name: "Settings",
    icon: "gear-regular",
    links: [
      { name: "General Settings", path: "/general-settings" },
      { name: "Connected Apps", path: "/connected-apps" },
    ],
  },
];

export default ROUTES;
