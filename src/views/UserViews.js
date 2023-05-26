import { Outlet, Route, Routes } from "react-router-dom";
import { FlowDetail } from "../auth/flows/FlowDetail";
import { FlowProvider } from "../auth/flows/FlowProvider";
import { FlowSearch } from "../auth/flows/FlowSearch";
import { Home } from "../auth/flows/Home";
import { PoseList } from "../auth/flows/PoseList";
import { PoseSearch } from "../auth/flows/PoseSearch";
import { SavedFlows } from "../auth/flows/SavedFlows";
import { UserProfile } from "../students/UserProfile";
import { UserProvider } from "../userProvider";

export const UserViews = ({ token, setToken }) => {
  return (
    <FlowProvider setToken={setToken}>
      <UserProvider setToken={setToken}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path="/poses" element={<PoseList />} />
            <Route path="/flow/detail/:flowId" element={<FlowDetail />} />
            <Route path="/flow/saved" element={<SavedFlows />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </UserProvider>
    </FlowProvider>
  );
};
