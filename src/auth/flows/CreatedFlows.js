import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FlowContext } from "./FlowProvider";

export const CreatedFlows = () => {
  const { flows, getFlows } = useContext(FlowContext);
  const [filterdFlows, setFilteredFlows] = useState([]);

  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getFlows();
  }, []);

  useEffect(() => {
    const myFlows = flows.filter((flow) => flow.userId === localYogaUserObj.id);
    setFilteredFlows(myFlows)
  }, [flows]);

  return (
    <>
      <section>
        <h2>My Created Flows</h2>
        {filterdFlows.map((flow) => (
          <>
            <div key={`flowList-${flow.id}`}>
              <Link to={`/flow/detail/${flow.id}`}>
                {flow.title}
                <br />
              </Link>
                Difficulty: {flow.difficulty}/5
                <br />
            </div>
          </>
        ))}
      </section>
    </>
  );
};
