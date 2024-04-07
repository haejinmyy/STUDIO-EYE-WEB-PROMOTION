import { Outlet } from "react-router-dom";
import Navigator from "../../../Components/Common/Navigator";
import DetailNavigator from "./Components/DetailNavigator";

function FAQMainPage() {
  return (
    <>
      <Navigator />
      <DetailNavigator />
      <Outlet />
    </>
  );
}

export default FAQMainPage;
