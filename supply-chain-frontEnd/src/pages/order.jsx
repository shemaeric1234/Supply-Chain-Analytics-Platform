import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { getOrder, getProduct, addOrder } from "../store/appSlice";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProduct from "../components/UpdateProduct";

const Order = () => {
  const dispatch = useDispatch();
  const { getProductStatus, getProductError, allOrders, allProducts } =
    useSelector((state) => state.app);
  const [newProduct, setNewProduct] = useState({
    quantity: "",
    is_purchase: true,
    product: "",
    user: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    dispatch(getOrder());
  };

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getProduct());
  }, []);

  // Add product
  const handleAddOrder = () => {
    dispatch(addOrder(newProduct));
    setNewProduct({
      quantity: 0,
      is_purchase: true,
      product: "",
      user: "",
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

  const formatDate = (isoDate) => {
    const parsedDate = new Date(isoDate);
    return parsedDate.toLocaleString("en-US", {
      weekday: "long", // e.g., "Sunday"
      year: "numeric",
      month: "long", // e.g., "December"
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <>
      <Box>
        <Typography variant="h4">Order(s)</Typography>
        <Box>
          <TextField
            label="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            sx={{ marginRight: 2, marginTop: 2 }}
          />
          {/* <TextField
            label="Product"
            value={newProduct.product}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product: e.target.value })
            }
            sx={{ marginRight: 2, marginTop: 2 }}
          /> */}
          <FormControl sx={{ minWidth: 200, marginTop: 2 }}>
            <InputLabel id="demo-simple-select-disabled-label-Product">
              Product
            </InputLabel>
            <Select
              labelId="demo-simple-select-disabled-label-Product"
              id="demo-simple-select-disabled-Product"
              label="Product"
              name="product"
              value={newProduct.product}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product: e.target.value })
              }
              sx={{ marginRight: 2 }}
            >
              {allProducts.map((product, index) => {
                return (
                  <MenuItem key={index} value={product.id}>
                    {product.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            label="User"
            value={newProduct.user}
            onChange={(e) =>
              setNewProduct({ ...newProduct, user: e.target.value })
            }
            sx={{ marginRight: 2, marginTop: 2 }}
          />
          <FormControl sx={{ minWidth: 200, marginTop: 2 }}>
            <InputLabel id="demo-simple-select-disabled-label">
              Is final purchase
            </InputLabel>
            <Select
              labelId="demo-simple-select-disabled-label"
              id="demo-simple-select-disabled"
              label="Is to purchase"
              name="role"
              value={newProduct.is_purchase}
              onChange={(e) =>
                setNewProduct({ ...newProduct, is_purchase: e.target.value })
              }
              sx={{ marginRight: 2 }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddOrder}
            disabled={
              !newProduct.quantity ||
              !newProduct.is_purchase ||
              !newProduct.product
            }
            sx={{ marginTop: 2 }}
          >
            make order
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ordered</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{formatDate(order.order_date)}</TableCell>
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

export default Order;
