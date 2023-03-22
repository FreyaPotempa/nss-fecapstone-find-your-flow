import { InstructorViews } from "./InstructorViews";
import { UserViews } from "./UserViews";

export const ApplicationViews = () => {
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  if (localYogaUserObj.instructor) {
    return <InstructorViews />;
  } else {
    return <UserViews />;
  }
};
