import { Outlet, Route, Routes } from "react-router-dom";
import { FlowDetail } from "../auth/flows/FlowDetail";
import { FlowProvider } from "../auth/flows/FlowProvider";
import { FlowSearch } from "../auth/flows/FlowSearch";
import { Home } from "../auth/flows/Home";
import { PoseList } from "../auth/flows/PoseList";
import { PoseSearch } from "../auth/flows/PoseSearch";
import { SavedFlows } from "../auth/flows/SavedFlows";
import { UserProfile } from "../students/UserProfile";

export const UserViews = () => {
  return (
    <FlowProvider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={
          <>
          <Home />
          <FlowSearch />
          </>
          } />
          <Route path="/poses" element={
          <>
          <PoseSearch />
          <PoseList />
          </>
          } />
          <Route path="/flow/detail/:flowId" element={<FlowDetail />} />
          <Route path="/flow/saved" element={<SavedFlows />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </FlowProvider>
  );
};
