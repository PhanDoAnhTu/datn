// GA
import ReactGA from "react-ga4";

// utils
import { lazy, Suspense } from "react";

// styles
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "@styles/theme";

// fonts
import "@fonts/icomoon/icomoon.woff";

// contexts
import { SidebarProvider } from "@contexts/sidebarContext";
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

// components
import ScrollToTop from "@components/ScrollToTop";
import Loader from "@components/Loader";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@layout/Sidebar";
import Copyright from "@components/Copyright";
import AppBar from "@layout/AppBar";

// pages
const Login = lazy(() => import("@pages/Login"));
const SalesAnalytics = lazy(() => import("@pages/SalesAnalytics"));
const SellersList = lazy(() => import("@pages/SellersList"));
const SellersTable = lazy(() => import("@pages/SellersTable"));
const SellersGrid = lazy(() => import("@pages/SellersGrid"));
const SellerProfile = lazy(() => import("@pages/SellerProfile"));
const RevenueByPeriod = lazy(() => import("@pages/RevenueByPeriod"));
const TopProducts = lazy(() => import("@pages/TopProducts"));
const ProductsGrid = lazy(() => import("@pages/ProductsGrid"));
const ProductsManagement = lazy(() => import("@pages/ProductsManagement"));
const ProductEditor = lazy(() => import("@pages/EditProduct"));
const ProductDetail = lazy(() => import("@pages/ProductDetail"));
const NewAttribute = lazy(() => import("@pages/NewAttribute"));
const ProductEdit = lazy(() => import("@pages/EditingProduct"));
const Banners = lazy(() => import("@pages/Banners"));
const Orders = lazy(() => import("@pages/Orders"));
const Statistics = lazy(() => import("@pages/Statistics"));
const Reviews = lazy(() => import("@pages/Reviews"));
const Customers = lazy(() => import("@pages/Customers"));
const Transactions = lazy(() => import("@pages/Transactions"));
const GeneralSettings = lazy(() => import("@pages/GeneralSettings"));
const ConnectedApps = lazy(() => import("@pages/ConnectedApps"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));
const CategoriesManagement = lazy(() => import("@pages/CategoriesManagement"));
const CategoryEditor = lazy(() => import("@pages/NewCategory"));
const CategoryEdit = lazy(() => import("@pages/EditCategory"));
const CategoryDetail = lazy(() => import("@pages/CategoryDetail"));
const PagesManagement = lazy(() => import("@pages/PagesManagement"));
const PageEditor = lazy(() => import("@pages/EditPage"));
const PageDetail = lazy(() => import("@pages/PageDetail"));
const PageEdit = lazy(() => import("@pages/PageEdit"));
const TopicsManagement = lazy(() => import("@pages/TopicsManagement"));
const TopicEditor = lazy(() => import("@pages/EditTopic"));
const TopicEdit = lazy(() => import("@pages/TopicEdit"));
const TopicDetail = lazy(() => import("@pages/TopicDetail"));
const PostsManagement = lazy(() => import("@pages/PostsManagement"));
const PostEditor = lazy(() => import("@pages/EditPost"));
const PostDetail = lazy(() => import("@pages/DetailPost"));
const ContactsManagement = lazy(() => import("@pages/ContactsManagement"));
const ContactResponse = lazy(() => import("@pages/ContactResponse"));
const BrandsManagement = lazy(() => import("@pages/BrandsManagement"));
const BrandEditor = lazy(() => import("@pages/EditBrand"));
const EditBrand = lazy(() => import("@pages/BrandEdit"));
const DetailBrand = lazy(() => import("@pages/DetailBrand"));
const DiscountsManagement = lazy(() => import("@pages/DiscountsManagement"));
const PromotionsManagement = lazy(() => import("@pages/PromotionsManagement"));
const AddDiscount = lazy(() => import("@pages/AddDiscount"));
const AddPromotion = lazy(() => import("@pages/AddPromotion"));
const SlidersManagement = lazy(() => import("@pages/SlidersManagement"));
const SliderNew = lazy(() => import("@pages/NewSlider"));
const SliderEdit = lazy(() => import("@pages/EditSlider"));
const SliderDetail = lazy(() => import("@pages/DetailSlider"));
const OrderDetail = lazy(() => import("@pages/OrderDetail"));

const MenusManagement = lazy(() => import("@pages/MenusManagement"));
const NewMenu = lazy(() => import("@pages/NewMenu"));
const MenuDetail = lazy(() => import("@pages/MenuDetail"));
const MenuEdit = lazy(() => import("@pages/MenuEdit"));

const App = () => {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar = path !== "/login" && path !== "/404";

  // Google Analytics init
  const gaKey = import.meta.env.VITE_GA;
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider theme={{ theme: theme }}>
        <ThemeStyles />
        <ToastContainer
          theme={theme}
          autoClose={2000}
          style={{ padding: "20px" }}
        />
        {width < 1280 && withSidebar && <AppBar />}
        <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
          <ScrollToTop />
          {withSidebar && <Sidebar />}
          <div className="app_content">
            {width >= 1280 && withSidebar && <AppBar />}
            <Suspense fallback={<Loader />}>
              <div className="main">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<SalesAnalytics />} />
                  <Route path="sellers-list" element={<SellersList />} />
                  <Route path="sellers-table" element={<SellersTable />} />
                  <Route path="sellers-grid" element={<SellersGrid />} />
                  <Route
                    path="products-management"
                    element={<ProductsManagement />}
                  />
                  {/* Category */}
                  <Route
                    path="categories-management"
                    element={<CategoriesManagement />}
                  />
                  <Route path="category-editor" element={<CategoryEditor />} />
                  <Route
                    path="category-editor/:id"
                    element={<CategoryEdit />}
                  />
                  <Route
                    path="category-detail/:id"
                    element={<CategoryDetail />}
                  />
                  {/* Page */}
                  <Route
                    path="pages-management"
                    element={<PagesManagement />}
                  />
                  <Route path="page-editor" element={<PageEditor />} />
                  <Route path="page-detail/:id" element={<PageDetail />} />
                  <Route path="page-editor/:id" element={<PageEdit />} />
                  {/* Topic */}
                  <Route
                    path="topics-management"
                    element={<TopicsManagement />}
                  />
                  <Route path="topic-editor" element={<TopicEditor />} />
                  <Route path="topic-detail/:id" element={<TopicDetail />} />
                  <Route path="topic-editor/:id" element={<TopicEdit />} />
                  {/* Post */}
                  <Route
                    path="posts-management"
                    element={<PostsManagement />}
                  />
                  <Route path="post-editor" element={<PostEditor />} />
                  <Route path="post-detail/:id" element={<PostDetail />} />
                  {/* Contact */}
                  <Route path="support" element={<ContactsManagement />} />
                  <Route path="support/res" element={<ContactResponse />} />
                  {/* Brand */}
                  <Route
                    path="brands-management"
                    element={<BrandsManagement />}
                  />
                  <Route path="brand-editor" element={<BrandEditor />} />
                  <Route path="brand-detail/:id" element={<DetailBrand />} />
                  <Route path="brand-editor/:id" element={<EditBrand />} />
                  {/* Discount */}
                  <Route
                    path="discounts-management"
                    element={<DiscountsManagement />}
                  />
                  <Route path="discount-editor" element={<AddDiscount />} />

                  {/* Promotion */}
                  <Route
                    path="promotions-management"
                    element={<PromotionsManagement />}
                  />

                  <Route path="promotion-editor" element={<AddPromotion />} />

                  <Route
                    path="sliders-management"
                    element={<SlidersManagement />}
                  />
                  <Route path="slider-editor" element={<SliderNew />} />
                  <Route path="slider-editor/:id" element={<SliderEdit />} />
                  <Route path="slider-detail/:id" element={<SliderDetail />} />

                  <Route path="menu-editor" element={<NewMenu />} />
                  <Route path="menu-detail/:id" element={<MenuDetail />} />
                  <Route path="menu-editor/:id" element={<MenuEdit />} />
                  <Route
                    path="menus-management"
                    element={<MenusManagement />}
                  />

                  <Route
                    path="revenue-by-period"
                    element={<RevenueByPeriod />}
                  />
                  <Route path="seller-profile" element={<SellerProfile />} />

                  <Route path="top-products" element={<TopProducts />} />

                  {/* PRODUCTS */}
                  <Route path="products-grid" element={<ProductsGrid />} />
                  <Route path="product-editor" element={<ProductEditor />} />
                  <Route path="attribute-editor" element={<NewAttribute />} />
                  <Route path="product-editor/:id" element={<ProductEdit />} />
                  <Route
                    path="product-detail/:id"
                    element={<ProductDetail />}
                  />

                  <Route path="banners" element={<Banners />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="order-detail/:id" element={<OrderDetail />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route
                    path="general-settings"
                    element={<GeneralSettings />}
                  />
                  <Route path="connected-apps" element={<ConnectedApps />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                  <Route path="/404" element={<PageNotFound />} />
                </Routes>
              </div>
              {withSidebar && <Copyright />}
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;
