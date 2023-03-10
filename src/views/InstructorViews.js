import { Outlet, Route, Routes } from "react-router-dom"
import { FlowCreator } from "../auth/flows/FlowCreator"
import { FlowProvider } from "../auth/flows/FlowProvider"


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
                </Route>
        </Routes>
        </FlowProvider>
    )
}