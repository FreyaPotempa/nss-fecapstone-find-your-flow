import { useContext } from "react"
import { FlowContext } from "./FlowProvider"


export const FlowSearch = () => {
    const { setSearchTerms } = useContext(FlowContext)

    return (
        <>
            Find a Flow:
            <input
            type="text"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="find a flow..."
            />
        </>
    )
}