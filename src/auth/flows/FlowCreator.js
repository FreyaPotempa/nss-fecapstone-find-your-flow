import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FlowContext } from "./FlowProvider";
import styled from "styled-components";
import { Column } from "./Column";
import { useNavigate } from "react-router-dom";

// define an absolutely empty "initialData" object here


export const FlowCreator = () => {
  const { poses, getPoses, addFlow } = useContext(FlowContext);
  const [yogaDndState, setYogaDndState] = useState({
    yogaPoseData: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Pose Picker",
        poseColumIdList: [],
      },
      "column-2": {
        id: "column-2",
        title: "Flow Creator",
        poseColumIdList: [],
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const [flowCreate, update] = useState({
    title: "",
    difficulty: 0
  })

  const navigate = useNavigate()

  useEffect(() => {
    getPoses();
  }, []);

  useEffect(() => {
    if (poses.length > 0) {
      // make a copy of the "yogaDndState" (initialData) state:
      const newYogaDndState = { ...yogaDndState };
      // then use what you have below to fill this copy with the data you retrieved
      // (rather than putting that into separate states)
      let poseIdArray = [];
      let yogaPoseList = {};
      poses.forEach((pose) => {
        yogaPoseList[String(pose.id)] = pose;
        poseIdArray.push(String(pose.id));
      });

      newYogaDndState.columns["column-1"].poseColumIdList = poseIdArray;
      newYogaDndState.yogaPoseData = yogaPoseList;

      setYogaDndState(newYogaDndState);
      // set newData into state with setYogaDndState(newData)
    }
  }, [poses]);

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
      const newPoseIds = Array.from(startingColumn.poseColumIdList);
      newPoseIds.splice(source.index, 1);
      newPoseIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startingColumn,
        poseColumIdList: newPoseIds,
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
    const startPoseIds = Array.from(startingColumn.poseColumIdList);
    startPoseIds.splice(source.index, 1);
    const newStart = {
      ...startingColumn,
      poseColumIdList: startPoseIds,
    };

    const finishPoseIds = Array.from(finishingColumn.poseColumIdList);
    finishPoseIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishingColumn,
      poseColumIdList: finishPoseIds,
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

        const newFlow = {...yogaDndState.columns["column-2"],
        userId: localYogaUserObj.id,
        title: flowCreate.title,
        difficulty: flowCreate.difficulty,
        id: ""
        
    }
        addFlow(newFlow)
        .then(navigate("/flow/saved"))
        
    }
  
  return (
    <section>
      <h2>Poses</h2>
      <DragDropContext
        //onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Container>
          {yogaDndState.columnOrder.map((columnId) => {
            const column = yogaDndState.columns[columnId];
            const posesInThisColumn = column.poseColumIdList.map((poseId) => {
              // console.log("poseId", poseId)
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
      <form>
        <fieldset>
            <div>
                <label htmlFor="title">Flow Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={flowCreate.title}
                required
                autoFocus
                onChange={
                  (e) => {
                    const copy = {...flowCreate}
                    copy.title = e.target.value
                    update(copy)
                  }
                }></input>
            </div>
        </fieldset>
        <fieldset>
          <label htmlFor="difficulty">Difficulty</label>
          <select
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
            <option value="0">Choose</option>
            <option value="1">Novice</option>
            <option value="2">Beginner</option>
            <option value="3">Intermediate</option>
            <option value="4">Proficient</option>
            <option value="5">Advanced</option>
          </select>
        </fieldset>
      <button type="button"
      onClick={handleClickSaveFlow}>Save Flow</button>
      </form>
    </section>
  );
};
