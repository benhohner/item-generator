import { Item } from "./Item";

export const ItemList = ({ items, itemActions, dispatch }) => (
  <ul className="grid grid-flow-row-dense grid-cols-2 gap-4">
    {items.map((item) => (
      <Item item={item} itemActions={itemActions} dispatch={dispatch}></Item>
    ))}
  </ul>
);
