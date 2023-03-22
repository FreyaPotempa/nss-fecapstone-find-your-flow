import { useContext, useEffect, useState } from "react";
import { FlowContext } from "./FlowProvider";
import { PoseStatic } from "./PoseStatic";
import styled from "styled-components";
import { Checkbox, Container, Flex, Heading, Select, SimpleGrid } from "@chakra-ui/react";
import { PoseSearch } from "./PoseSearch"

// const Container = styled.div`
//   margin: 8px;
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   min-height: 100px;
// `;

const Title = styled.div`
  padding: 8px;
`;

export const PoseList = () => {
  const { poses, getPoses, searchTerms, setSearchTerms } = useContext(FlowContext)
  const [filteredPoses, setFilteredPoses ] = useState([])
  const [cat, setCategory] = useState("Sort by Category");
  const [showPeak, setShowPeak] = useState(false)

  useEffect(() => {
    getPoses().then(setSearchTerms(""));
  }, []);

  useEffect(() => {
    if (poses.length > 0) {
        if (searchTerms !== "") {
            const subset = poses.filter((pose) => pose.english_name.toLowerCase().includes(searchTerms) || pose.sanskrit_name.toLowerCase().includes(searchTerms))
            setFilteredPoses(subset)
            setShowPeak(false)
            setCategory("Sort by Category")
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
    setCategory("Sort by Category")
    setFilteredPoses(filteredPeak)
    }
    else {
        setFilteredPoses(poses)
    }
  },[showPeak])

  const handleCategory = (event) => {
    const category = event.target.value
    setCategory(category)
    setShowPeak(false)
  }

  const handlePeak = (event) => {
    if (showPeak) {
        setShowPeak(false)
    } else {
    setShowPeak(true)
    }
  }

  return (
    <Container maxW='8xl'>
        <Heading as="h3" m='4'>Yoga Poses</Heading>
      <Flex>
        <PoseSearch />
        <Select p="4px" m='2' width={250} id="category" 
        onChange={handleCategory}>
            <option key="cat0"
            defaultValue={
              showPeak || cat === "Sort by Category"
              }>Sort by Category</option>
            <option key="cat1"value="standing">Standing</option>
            <option key="cat2" value="seated">Seated</option>
            <option key="cat3" value="supine">Supine</option>
            <option key="cat4" value="prone">Prone</option>
            <option key="cat5" value="inversion">Inversion</option>
        </Select>
        <Checkbox 
        isChecked={showPeak}
        onChange={handlePeak} 
        >Show Only Peak Poses?</Checkbox>
        </Flex>
    <Container maxW='8xl' border='1px' p='3' borderColor='gray.200'>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(175px, 1fr))'>
        {filteredPoses.map((pose) => (
          <PoseStatic key={`poseStatic--${pose.id}`} pose={pose} />
          ))}
          </SimpleGrid>
    </Container>
            </Container>
  );
};
