import { useState, useEffect, useCallback } from "react";
import { ListItemText, List, ListItem, Divider } from "@mui/material";

import { Item } from "./types";

import MyDialog from "./MyDialog";

import "./styles.css";

let renderCount = 0;

export default function App() {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState<Item[]>(); // list of items
  const [selectedItem, setSelectedItem] = useState<Item>(); // selected item

  // load dummy data
  useEffect(() => {
    setItems([
      {
        name: "Paul",
        age: 100,
        id: 1
      },
      {
        name: "John",
        age: 50,
        id: 2
      },
      {
        name: "Peter",
        age: 20,
        id: 3
      }
    ]);
  }, [setItems]);

  const onClose = () => {
    setOpen(false); // close dialog
  };

  const onSave = (updatedItem: Item) => {
    if (items) {
      setItems(
        items.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
      );
    }

    setOpen(false); // close dialog
  };

  const onOpen = useCallback((item: Item) => {
    setSelectedItem(item);
    setOpen(true); // open dialog window
  }, []);

  return (
    <div className="App">
      <h5>Parent Render Count: {renderCount++}</h5>
      <h3>Click a person to edit...</h3>

      <Divider />
      <List>
        {items &&
          items.map((item: Item) => (
            <ListItem divider={true} key={item.id} onClick={() => onOpen(item)}>
              <ListItemText primary={item.name} secondary={"age " + item.age} />
            </ListItem>
          ))}
      </List>

      {selectedItem && (
      <MyDialog
        open={open}
        onClose={onClose}
        onSave={onSave}
        selectedItem={selectedItem}
      />
      )}

    </div>
  );
}
