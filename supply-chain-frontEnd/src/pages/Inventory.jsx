import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../store/appSlice";
import {
  Button,
  TextField,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProduct from "../components/UpdateProduct";

const Inventory = () => {
  const dispatch = useDispatch();
  const { getProductStatus, getProductError, allProducts } = useSelector(
    (state) => state.app
  );
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    dispatch(getProduct());
  };

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  // Add product
  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
    });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ productID: id }));
  };
  // update product
  const handleUpdateProduct = (id, newProduct) => {
    dispatch(updateProduct({ productID: id, data: newProduct }));
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState("");

  const handleEditProduct = (product) => {
    setProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box>
        <Typography variant="h4">Inventory</Typography>
        <Box>
          <TextField
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            sx={{ marginRight: 2 }}
          />
          <TextField
            label="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddProduct}
            disabled={
              !newProduct.name || !newProduct.price || !newProduct.quantity
            }
          >
            Add Product
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    key={`${product.id}_update`}
                    aria-label="edit"
                    onClick={() => handleEditProduct(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    key={`${product.id}_delete`}
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <UpdateProduct
        handleClose={handleClose}
        open={open}
        product={product}
        handleUpdateProduct={handleUpdateProduct}
      />
    </>
  );
};

export default Inventory;
