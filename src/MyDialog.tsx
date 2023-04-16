import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";

import { Item } from "./types";

let myDialogRenderCounter = 0;

const MyDialog = ({ open, onClose, onSave, selectedItem }) => {
  // const MyDialog = React.memo(({ open, onClose, onSave, selectedItem }) => {
  const [editItem, setEditItem] = useState<Item>();

  // copy over the value
  useEffect(() => {
    setEditItem(selectedItem);
  }, [selectedItem]);

  if (!editItem) {
    return;
  }

  const save = () => {
    // validate the fields here
    onSave(editItem);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rename {selectedItem.name}</DialogTitle>
      <DialogContent>
        <div>MyDialog Render Count: {myDialogRenderCounter++}</div>

        <TextField
          margin="normal"
          label="Name"
          value={editItem.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditItem({ ...editItem, name: event.target.value });
          }}
        />
        <TextField
          margin="normal"
          label="Age"
          type="number"
          value={editItem.age}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEditItem({ ...editItem, age: event.target.valueAsNumber });
          }}
        />
      </DialogContent>

      <DialogActions>
        <button onClick={onClose} color="secondary">
          CANCEL
        </button>
        <button onClick={save} color="primary">
          SAVE
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default MyDialog;
