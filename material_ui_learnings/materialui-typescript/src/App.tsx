// react-router-dom
import { Outlet } from "react-router-dom";

// pages
import { DashBoard } from "./pages/";

// material UI /mui
import { Button } from "@mui/material";

// material UI /my
import { useAppThemeContext } from "./shared/contexts/ThemeContext";
import { SideMenu } from "./shared/components/side_menu/SideMenu";

// context
import { useDrawerContext } from "./shared/contexts";

export const App = () => {
  return (
    <div className="">
      <SideMenu>
        <Outlet />
        <DashBoard />
      </SideMenu>
    </div>
  );
};
