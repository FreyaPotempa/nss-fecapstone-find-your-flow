import { Input } from "@chakra-ui/react"
import { useContext } from "react"
import { FlowContext } from "./FlowProvider"


export const FlowSearch = () => {
    const { setSearchTerms } = useContext(FlowContext)

    return (
            <Input p="6px" mt="4px" width={300}
            type="text"
            onKeyUp={(event) => setSearchTerms(event.target.value)}
            placeholder="find a flow..."
            />
    )
}