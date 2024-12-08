import React, { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  product,
  handleClose,
  handleUpdateProduct,
}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    const data = { ...product };
    delete data.id;
    setNewProduct(product);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Modify product</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            sx={{ marginRight: 2, marginBottom: 2, marginTop: 1 }}
          />
          <TextField
            label="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            sx={{ marginRight: 2, marginBottom: 2, marginTop: 1 }}
          />
          <TextField
            label="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            sx={{ marginRight: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button onClick={() => handleUpdateProduct(product.id, newProduct)}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
