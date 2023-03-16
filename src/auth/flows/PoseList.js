import { useContext, useEffect, useState } from "react";
import { FlowContext } from "./FlowProvider";
import { PoseStatic } from "./PoseStatic";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const Title = styled.div`
  padding: 8px;
`;

const YogaList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  min-height: 100px;
`;

export const PoseList = () => {
  const { poses, getPoses, searchTerms } = useContext(FlowContext)
  const [filteredPoses, setFilteredPoses ] = useState([])
  const [cat, setCategory] = useState("0");
  const [showPeak, setShowPeak] = useState(false)

  useEffect(() => {
    getPoses();
  }, []);

  useEffect(() => {
    if (poses.length > 0) {
        if (searchTerms !== "") {
            const subset = poses.filter((pose) => pose.english_name.toLowerCase().includes(searchTerms))
            setFilteredPoses(subset)
            setShowPeak(false)
            setCategory("0")
        } else {
            setFilteredPoses(poses)
        }
    }
  }, [searchTerms, poses])

  useEffect(() => {
    if (cat) {
       const filteredCat = poses.filter(poseByCat => poseByCat.category === cat)
        setFilteredPoses(filteredCat)
        setShowPeak(false)
    }
    if (cat === "0") {
        setFilteredPoses(poses)
    }
  },[cat])

  useEffect(() => {
    if (showPeak) {
    const filteredPeak = poses.filter(peakPose => peakPose.peak)
    setCategory("")
    setFilteredPoses(filteredPeak)
    }
    else {
        setFilteredPoses(poses)
    }
  },[showPeak])

  const handleCategory = (event) => {
    const category = event.target.value
    setCategory(category)
  }

  const handlePeak = (event) => {
    if (showPeak) {
        setShowPeak(false)
    } else {
    setShowPeak(true)
    }
  }

  return (
    <>
        <select id="category" 
        onChange={handleCategory}>
            <option key="" value="0"
            selected={
              showPeak || cat === "0"
              }>Sort by Category</option>
            <option value="standing">Standing</option>
            <option value="seated">Seated</option>
            <option value="supine">Supine</option>
            <option value="prone">Prone</option>
            <option value="inversion">Inversion</option>
        </select>
        Show Only Peak Poses?
        <input type="checkbox" 
        checked={showPeak}
        onClick={handlePeak} 
        />
    <Container>
      <Title>Yoga Poses</Title>
      <YogaList>
        {filteredPoses.map((pose) => (
            <PoseStatic key={pose.id} pose={pose} />
            ))}
      </YogaList>
    </Container>
            </>
  );
};
