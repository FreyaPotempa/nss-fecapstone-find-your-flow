import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";

export const Home = () => {
  const { flows, getFlows, users, getUsers, poses, getPoses, searchTerms } =
    useContext(FlowContext);
  const [filteredFlows, setFilteredFlows] = useState([])
  const [instructorFlows, setInstructorFlows] = useState(0)
  const [difficultyFlows, setDifficultyFlows ] = useState(0)

  useEffect(() => {
    getFlows().then(getUsers()).then(getPoses());
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = flows.filter((flow) =>
        flow.title.toLowerCase().includes(searchTerms)
      );
      setFilteredFlows(subset);
    } else {
      setFilteredFlows(flows);
    }
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
      {/* Want to sort flows by difficulty, and also by instructor 
    
*/}
      <section>
        <select id="difficulty" onChange={handleDifficultyChange}>
          <option value="0">Choose a Difficulty</option>
          <option value="1">Novice</option>
          <option value="2">Beginner</option>
          <option value="3">Intermediate</option>
          <option value="4">Proficient</option>
          <option value="5">Advanced</option>
        </select>
        <select id="instructor" onChange={handleInstructorChange}>
          <option value="0">Choose an Instructor</option>
          {users.map((user) => {
            if (user.isInstructor) {
              return <option value={`${user.id}`}>{user.name}</option>;
            }
          })}
        </select>
        <section>
          {filteredFlows.map((flow) => {
            return (
              <div key={`Flows-${flow.id}`}>
                <Link to={`/flow/detail/${flow.id}`}>
                  {flow.title}
                  <br />
                </Link>
                Difficulty: {flow.difficulty}/5
                <br />
                Created by: {flow?.user?.name}
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};
