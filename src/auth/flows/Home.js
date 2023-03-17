import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";

export const Home = () => {
  const { flows, getFlows, users, getUsers, poses, getPoses, searchTerms, setSearchTerms } =
    useContext(FlowContext);
  const [filteredFlows, setFilteredFlows] = useState([])
  const [instructorFlows, setInstructorFlows] = useState(0)
  const [difficultyFlows, setDifficultyFlows ] = useState(0)

  useEffect(() => {
    getFlows().then(getUsers()).then(getPoses()).then(setSearchTerms(""));
  }, []);

  useEffect(() => {
      const subset = flows.filter((flow) =>
        flow.title.toLowerCase().includes(searchTerms)
      );
      setFilteredFlows(subset);
  }, [poses, searchTerms]);

  useEffect(() => {
 let newFilteredFlows = [...flows]
      if (difficultyFlows > 0) {
      newFilteredFlows = newFilteredFlows.filter(
        (flow) => flow.difficulty === difficultyFlows
      );
    }
    if (instructorFlows > 0) {
      newFilteredFlows = newFilteredFlows.filter(
        (flow) => flow.userId === instructorFlows
      );
    } 
    setFilteredFlows(newFilteredFlows);
  },[instructorFlows, difficultyFlows])

  const handleInstructorChange = (event) => {
    const selected = parseInt(event.target.value);
    setInstructorFlows(selected)
  };

  const handleDifficultyChange = (event) => {
    const selected = parseInt(event.target.value)
    setDifficultyFlows(selected)
  }

  return (
    <>
      <h1>Find Your Flow</h1>
      <div>Create and share yoga pose flows</div>
      <h2>All Created Flows</h2>
      <section>
        <select id="difficulty" onChange={handleDifficultyChange}>
          <option key="diff0" value="0">Choose a Difficulty</option>
          <option key="diff1" value="1">Novice</option>
          <option key="diff2" value="2">Beginner</option>
          <option key="diff3" value="3">Intermediate</option>
          <option key="diff4" value="4">Proficient</option>
          <option key="diff5" value="5">Advanced</option>
        </select>
        <select id="instructor" onChange={handleInstructorChange}>
          <option value="0">Choose an Instructor</option>
          {users.map((user) => {
            if (user.isInstructor) {
              return <option key={`instructor__${user.id}`} value={`${user.id}`}>{user.name}</option>;
            }
          })}
        </select>
        <section>
          {filteredFlows.map((flow) => {
            return <div key={`Flows-${flow.id}`}>
                <Link to={`/flow/detail/${flow.id}`}>
                  {flow.title}
                  <br />
                </Link>
                Difficulty: {flow.difficulty}/5
                <br />
                Created by: {flow?.user?.name}
              </div>
          })}
        </section>
      </section>
    </>
  );
};
