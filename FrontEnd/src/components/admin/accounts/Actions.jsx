import React from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import "../../../styles/gridIcons.scss";
const Actions = ({ handleUpdate, handleDelete, data }) => {
  return (
    <>
      <div className="main">
        <div className="inner">
          <button
            style={{ paddingRight: "2rem" }}
            onClick={() => handleDelete(data._id)}
          >
            <FaTrashAlt style={{ color: "red", fontSize: "medium" }} />
          </button>
        </div>
        <div className="inner">
          <button onClick={() => handleUpdate(data._id)}>
            <FaPen style={{ color: "green", fontSize: "medium" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Actions;
