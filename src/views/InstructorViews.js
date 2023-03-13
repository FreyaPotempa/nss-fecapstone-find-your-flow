import { Outlet, Route, Routes } from "react-router-dom"
import { FlowCreator } from "../auth/flows/FlowCreator"
import { FlowDetail } from "../auth/flows/FlowDetail"
import { FlowProvider } from "../auth/flows/FlowProvider"
import { SavedFlows } from "../auth/flows/SavedFlows"


export const InstructorViews = () => {
    return (
        <FlowProvider>
        <Routes>
            <Route
                path="/"
                element={
                    <>
                    <h1>Find Your Flow</h1>
                    <div>Create and share yoga pose flows</div>
                    <Outlet />
                    </>
                }
                >
                <Route path="/flow/create" element={<FlowCreator />} />
                <Route path="/flow/saved" element={<SavedFlows />} />
                <Route path="/flow/detail/:flowId" element={<FlowDetail />} />
                </Route>
        </Routes>
        </FlowProvider>
    )
}