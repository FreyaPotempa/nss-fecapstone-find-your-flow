import { Outlet, Route, Routes } from "react-router-dom";
import { FlowProvider } from "../auth/flows/FlowProvider";

export const UserViews = () => {
  return (
    <FlowProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Find Your Flow</h1>
              <div>See and save yoga pose flows</div>
              <Outlet />
            </>
          }
        ></Route>
      </Routes>
    </FlowProvider>
  );
};
