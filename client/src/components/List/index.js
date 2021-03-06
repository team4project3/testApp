import React from "react";
import "./style.css";

// This file exports both the List and ListItem components
export function List({ children }) {
  return (
    // <div className="list-overflow-container">
    <>
      <h5 className="text-center noteH5">Click on a Note to Edit</h5>

      <ul className="list-group">{children}</ul>
      {/* <ul className="collection">{children}</ul> */}
    </>

  );
}

export function ListItem({ children }) {
  // return <li className="collection-item">{children}</li>;
  return <li className="list-group-item">{children}</li>;

}
