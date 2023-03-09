import { InstructorNav } from "./InstructorNav"
import { UserNav } from "./UserNav"


export const NavBar = () => {

    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

    if (localYogaUserObj.instructor) {
        return <InstructorNav />
    }
    else {
        return <UserNav />
    }

}