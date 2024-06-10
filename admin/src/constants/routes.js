const ROUTES = [
  {
    name: "Dashboard",
    icon: "rectangle-history-circle-user-regular",
    links: [
      { name: "Sales Analytics", path: "/" },
      { name: "Sellers List", path: "/sellers-list" },
      { name: "Sellers Table", path: "/sellers-table" },
      { name: "Sellers Grid", path: "/sellers-grid" },
      { name: "Seller Profile", path: "/seller-profile" },
      { name: "Revenue by Period", path: "/revenue-by-period" },
    ],
  },
  {
    name: "Điều hướng",
    icon: "bars-solid",
    links: [
      { name: "Quản lý danh mục", path: "/categories-management" },
      { name: "Quản lý trang", path: "/pages-management" },
    ],
  },
  {
    name: "Marketing",
    icon: "percent-solid",
    links: [
      { name: "Mã giảm giá", path: "/discounts-management" },
      {
        name: "Chương trình khuyễn mãi",
        path: "/promotions-management",
      },
      { name: "Slider", path: "/sliders-management" },
    ],
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
    name: "Quản lý hãng",
    icon: "shirt-solid",
    path: "/brands-management",
  },
  {
    name: "Sản phẩm",
    icon: "boxes-stacked-regular",
    links: [
      { name: "Products Grid", path: "/products-grid" },
      { name: "Quản lý sản phẩm", path: "/products-management" },
    ],
  },
  {
    name: "Đơn hàng",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Hỗ trợ",
    icon: "envelope-solid",
    path: "/support",
  },

  {
    name: "Reviews",
    icon: "star-half-stroke-solid",
    path: "/reviews",
  },
  {
    name: "Customers",
    icon: "chart-user-regular",
    path: "/customers",
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
