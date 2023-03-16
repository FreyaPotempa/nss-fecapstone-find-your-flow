import { useContext } from "react"
import { FlowContext } from "./FlowProvider"

export const PoseSearch = () => {
    const { setSearchTerms } = useContext(FlowContext)

    return (
        <>
        Pose Search:
        <input
        type="text"
        className="input"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a pose..."
        />

    
    </>
    )
}