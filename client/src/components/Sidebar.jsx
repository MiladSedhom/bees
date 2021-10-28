import React, { useState } from "react";
import List from "./List";
import { request } from "../utils/utils2";

export default function Sidebar({ userData }) {
  const createListHandler = (e) => {
    request("post", "lists", { id: userData.id, list: { name: "A New List" } });
  };
  const [lists, setLists] = useState(userData.lists);
  return (
    <div className="sidebar">
      <div>
        <h2>{userData.name}</h2>
        <button onClick={createListHandler}>+</button>
      </div>
      <hr />
      <ul>
        <List userData={userData} />
        <List />
      </ul>
      {/* {lists.map((lists) => (
        <List />
      ))} */}
    </div>
  );
}
