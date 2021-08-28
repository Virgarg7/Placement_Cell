import React from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiPanel,
  euiDragDropReorder,
} from "@elastic/eui";
import { RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";

function DraggableDataPanel({ data, setData, handleDelete, handleUpdate }) {
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(data, source.index, destination.index);
      setData(items);
    }
  };

  return (
    <EuiFlexItem grow={false} style={{ maxWidth: "40%" }}>
      <EuiDragDropContext onDragEnd={onDragEnd}>
        <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
          {data.map(({ name, id }, idx) => (
            <EuiDraggable
              spacing="m"
              key={id}
              index={idx}
              draggableId={id}
              customDragHandle={true}
            >
              {(provided) => (
                <EuiPanel className="custom" paddingSize="m">
                  <EuiFlexGroup>
                    <EuiFlexItem grow={false}>
                      <div {...provided.dragHandleProps}>
                        <EuiIcon type="grab" />
                      </div>
                    </EuiFlexItem>
                    <EuiFlexItem>{name}</EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <RiEditBoxLine
                        onClick={() => handleUpdate(id)}
                        style={{
                          color: "orange",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <RiDeleteBin7Line
                        onClick={() => handleDelete(id)}
                        style={{
                          color: "red",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              )}
            </EuiDraggable>
          ))}
        </EuiDroppable>
      </EuiDragDropContext>
    </EuiFlexItem>
  );
}

export default DraggableDataPanel;
