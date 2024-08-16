import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/lib/integration/react.js";

import Error from "./components/Error/Error.jsx";
import Loader from "./components/Loader/Loader.jsx";

import AppLayout from "./pages/AppLayout/AppLayout.jsx";
import CustomLayout from "./pages/CustomLayout/CustomLayout.jsx";

const Homepage = lazy(() => import("./pages/Home/Homepage.jsx"));
const Products = lazy(() => import("./pages/Products/Products.jsx"));
const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const User = lazy(() => import("./pages/User/User.jsx"));
const Order = lazy(() => import("./pages/Order/Order.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/products/:category/:subcategory",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/",
    element: <CustomLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
    ],
  },
  { path: "/user", element: <User />, errorElement: <Error /> },
]);

const queryClient = new QueryClient();
let persistor = persistStore(store);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router}></RouterProvider>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
