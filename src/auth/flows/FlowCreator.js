import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FlowContext } from "./FlowProvider";
import styled from "styled-components";
import { Column } from "./Column";
import { useNavigate, useParams } from "react-router-dom";
import { PoseSearch } from "./PoseSearch";
import { Button, Flex, HStack, Input, Select } from "@chakra-ui/react";

// define an absolutely empty "initialData" object here


export const FlowCreator = () => {
  const { poses, getPoses, addFlow, getFlowById, flow, searchTerms, setSearchTerms, updateFlow } = useContext(FlowContext);
  const [ filteredPoses, setFilteredPoses ] = useState([])
  const [yogaDndState, setYogaDndState] = useState({
    yogaPoseData: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Pose Picker",
        poseColumnIdList: [],
        difficulty: 0
      },
      "column-2": {
        id: "column-2",
        title: "Flow Creator",
        poseColumnIdList: [],
        difficulty: 0
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const [flowCreate, update] = useState({
    title: "",
    difficulty: 0
  })
  const { flowId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getPoses().then(setSearchTerms(""));
    if (flowId) {
      getFlowById(flowId)
      //when navigating for edit
    }
  }, [flowId]);

  useEffect(() => {
    if (
      // poses are loading
      poses.length > 0 && 
      // flow to edit is loading
      (!flowId || (flowId && flow.title))
    ) {
      // make a copy of the "yogaDndState" (initialData) state:
      const newYogaDndState = { ...yogaDndState };
      // then use that to fill the copy with the data you retrieved
      let poseIdArray = [];
      let yogaPoseList = {};
      poses.forEach((pose) => {
        yogaPoseList[String(pose.id)] = pose;
      });
      poses.forEach((pose) => {
        poseIdArray.push(String(pose.id));
      })
      newYogaDndState.columns["column-1"].poseColumnIdList = poseIdArray;
      newYogaDndState.yogaPoseData = yogaPoseList;
      
      //when searching, updating find only if in column 1

      // when editing, add previously saved info to state
      if (flowId && flow.title) {
        //remove the poseIds that exist in column-2 from column-1 so no weird draggy
        newYogaDndState.columns["column-2"].title = flow.title
        newYogaDndState.columns["column-2"].poseColumnIdList = flow.poseColumnIdList
        newYogaDndState.columns["column-2"].difficulty = flow.difficulty
      } else {
        // clearing state when navigating directly from "edit" to "create"
        newYogaDndState.columns["column-2"].title = "Flow Creator";
        newYogaDndState.columns["column-2"].poseColumnIdList = [];
        newYogaDndState.columns["column-2"].difficulty = 0;
      }

      setYogaDndState(newYogaDndState);
      // set newData into state with setYogaDndState(newData)
    }
  }, [poses, flow, flowId]);

  //from PoseSearch, originally component rendered in Home, filteredPoses used now as the main pose data in above useEffect
  //need to filter the array of ids in column 1 with the search terms instead of the whole pose array
  useEffect(() => {
      let searchedPoseIdArray = []
      const subset = poses.filter((pose) => pose.english_name.toLowerCase().includes(searchTerms) || pose.sanskrit_name.toLowerCase().includes(searchTerms))
      subset.forEach((searchedPose) => {
        searchedPoseIdArray.push(String(searchedPose.id))
      })
     
      const searchedYogaDndState = {...yogaDndState}
      searchedYogaDndState.columns["column-1"].poseColumnIdList = searchedPoseIdArray
      setYogaDndState(searchedYogaDndState)
     
  }, [searchTerms])

  const Container = styled.div`
    display: flex;
  `;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return "";
    } else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return "";
    }
    const startingColumn = yogaDndState.columns[source.droppableId];
    const finishingColumn = yogaDndState.columns[destination.droppableId];

    if (startingColumn === finishingColumn) {
      const newPoseIds = Array.from(startingColumn.poseColumnIdList);
      newPoseIds.splice(source.index, 1);
      newPoseIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startingColumn,
        poseColumnIdList: newPoseIds,
      };

      const newState = {
        ...yogaDndState,
        columns: {
          ...yogaDndState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setYogaDndState(newState);
      return;
    }

    //moving between columns
    const startPoseIds = Array.from(startingColumn.poseColumnIdList);
    startPoseIds.splice(source.index, 1);
    const newStart = {
      ...startingColumn,
      poseColumnIdList: startPoseIds,
    };

    const finishPoseIds = Array.from(finishingColumn.poseColumnIdList);
    finishPoseIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishingColumn,
      poseColumnIdList: finishPoseIds,
    };

    //This creates two children with the same key, plus you cannot add a pose again.
    //STRETCH implement
    // if (startingColumn === yogaDndState.columns["column-1"]) {
    //   const createdState = {
    //     ...yogaDndState,
    //     columns: {
    //       ...yogaDndState.columns,
    //       [newFinish.id]: newFinish,
    //     },
    //   };

    //   //objects still only move from the start column
    //   console.log("saveStartColumn", createdState)
    //   setYogaDndState(createdState);
    //   return;

    // } else {

    const newState = {
      ...yogaDndState,
      columns: {
        ...yogaDndState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setYogaDndState(newState)
    }

    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

    const handleClickSaveFlow = (e) => {
      const difficulty = parseInt(flowCreate.difficulty)
      const flowTitle = flowCreate.title
      if (difficulty === 0 || flowTitle.length < 0) {
        window.alert("Please enter a title and difficulty level")
      } else {
        if (flowId) {
          const updatedPoses = yogaDndState.columns["column-2"].poseColumnIdList
          updateFlow({
            //PUT
            userId: localYogaUserObj.id,
            id: flowId,
            title: flowCreate.title,
            difficulty: flowCreate.difficulty,
            poseColumnIdList: updatedPoses
          }).then(() => navigate("/flow/saved"))
        } else {
          //POST
        const newFlow = {...yogaDndState.columns["column-2"],
        userId: localYogaUserObj.id,
        title: flowCreate.title,
        difficulty: flowCreate.difficulty,
        id: ""
        }
        addFlow(newFlow)
        .then(navigate("/flow/saved"))
      }
    }
  }

  const isLoadingYogaPoses = Object.keys(yogaDndState.yogaPoseData).length === 0 

  if (isLoadingYogaPoses) {
    return null
  }

  return (
    <section>
      <PoseSearch />
      <DragDropContext
        //onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Container>
          {yogaDndState.columnOrder.map((columnId) => {
            const column = yogaDndState.columns[columnId];
            const posesInThisColumn = column.poseColumnIdList.map((poseId) => {
              const thingToReturn = yogaDndState.yogaPoseData[poseId];
              // console.log("thingToReturn", thingToReturn)
              // dealing with undefined in map, so examine each part. Ultimately I had [] around poseIds so it created a nested array,
              return thingToReturn;
            });

            return (
              <Column
                key={column.id}
                column={column}
                yogaChoices={posesInThisColumn}
              />
            );
          })}
        </Container>
      </DragDropContext>
      <Flex flexDirection='row'>
      <form>
        <fieldset>
                <label htmlFor="title">Flow Title</label>
                <Input width={350}
                type="text"
                id="title"
                name="title"
                value={flowCreate.title}
                defaultValue={
                  flowId ? flow.title : ""
                }
                required
                autoFocus
                onChange={
                  (e) => {
                    const copy = {...flowCreate}
                    copy.title = e.target.value
                    update(copy)
                  }
                }></Input>
        </fieldset>
        <fieldset>
          <Select width={200}
          required autoFocus
          type="type"
          value={flowCreate.difficulty}
          onChange={
            (e) => {
              const num = {...flowCreate}
              num.difficulty = parseInt(e.target.value)
              update(num)
            }
          }
          >
            <option value="0">Choose Difficulty</option>
            <option value="1">Novice</option>
            <option value="2">Beginner</option>
            <option value="3">Intermediate</option>
            <option value="4">Proficient</option>
            <option value="5">Advanced</option>
          </Select>
        </fieldset>
      <Button type="button"
      onClick={
        //if flowId is updating make a post request otherwise save
        handleClickSaveFlow}>Save Flow</Button>
      </form>
      </Flex>
    </section>
  );
      
};
