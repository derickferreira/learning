// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

// context
import { AppThemeProvider } from "./shared/contexts";
import { DrawerProvider } from "./shared/contexts";

// react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

interface IRoutes {
  path: string;
  element: JSX.Element;
  exact?: boolean;
  children?: IRoutes[];
}

const routes: IRoutes[] = [
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to={"/home"} />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <DrawerProvider>
      <RouterProvider router={router} />
    </DrawerProvider>
  </AppThemeProvider>
);
