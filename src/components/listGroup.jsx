import React from "react";
const ListGroup = ({
  items,
  valueProperty = "_id", // Default to "_id" if not provided
  textProperty = "name", // Default to "name" if not provided
  onItemSelected,
  selectedGenreItem,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelected(item)}
          key={item[valueProperty]}
          className={
            selectedGenreItem === item
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
// We use defaultProps to set default values so the component works even if the parent doesn't pass these props

// ListGroup.defaultProps = {
//   valueProperty: "_id",
//   textProperty: "name",
// };

export default ListGroup;
