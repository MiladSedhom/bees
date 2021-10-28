import React from "react";
import { request } from "../utils/utils2";

export default function List({ userData }) {
  const deleteButtonHandler = (e) => {
    request("delete", "lists", { id: "_id" });
  };

  const updateHandler = (e) => {
    console.log(e.target.innerHTML);
    request("patch", "lists", { name: e.target.innerHTML, _id: "id" });
  };

  const createCategoryHandler = (e) => {
    request("post", "categories", {
      id: userData._id,
      cat: { name: "A New category" },
    });
  };

  return (
    <li className="list">
      <p contentEditable onBlur={updateHandler}>
        general
      </p>
      <div className="icons">
        <button onClick={createCategoryHandler}>+</button>
        <button onClick={deleteButtonHandler}>D</button>
      </div>
    </li>
  );
}
