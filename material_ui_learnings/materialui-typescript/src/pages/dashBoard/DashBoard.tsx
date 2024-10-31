import { BasicPageLyaout } from "../../shared/layouts";

// component
import { ToolBar } from "../../shared/components";

export const DashBoard = () => {
  return (
    <BasicPageLyaout title="Home" toolBar={<ToolBar showSearchInput={true} />}>
      testing...
    </BasicPageLyaout>
  );
};
