import { Outlet, Route, Routes } from "react-router-dom";
import { FlowCreator } from "../auth/flows/FlowCreator";
import { FlowDetail } from "../auth/flows/FlowDetail";
import { FlowProvider } from "../auth/flows/FlowProvider";
import { Home } from "../auth/flows/Home";
import { CreatedFlows } from "../auth/flows/CreatedFlows";
import { SavedFlows } from "../auth/flows/SavedFlows";
import { PoseSearch } from "../auth/flows/PoseSearch";
import { FlowSearch } from "../auth/flows/FlowSearch";
import { InstructorProfile } from "../instructors/InstructorProfile";

export const InstructorViews = () => {
  return (
    <FlowProvider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/flow/create" element={<FlowCreator />} />
          <Route
            path="/flow/saved"
            element={
              <>
                <CreatedFlows />
                <SavedFlows />
              </>
            }
          />
          <Route path="/flow/detail/:flowId" element={<FlowDetail />} />
          <Route path="/flow/edit/:flowId" element={<FlowCreator />} />
          <Route path="/profile" element={<InstructorProfile />} />
        </Route>
      </Routes>
    </FlowProvider>
  );
};
