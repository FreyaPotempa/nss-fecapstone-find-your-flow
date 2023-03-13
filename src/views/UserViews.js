import { Outlet, Route, Routes } from "react-router-dom";
import { FlowDetail } from "../auth/flows/FlowDetail";
import { FlowProvider } from "../auth/flows/FlowProvider";
import { Home } from "../auth/flows/Home";
import { SavedFlows } from "../auth/flows/SavedFlows";

export const UserViews = () => {
  return (
    <FlowProvider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<Home />} />
          <Route path="/flow/detail/:flowId" element={<FlowDetail />} />
          <Route path="/flow/saved" element={<SavedFlows />} />
        </Route>
      </Routes>
    </FlowProvider>
  );
};
