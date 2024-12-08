import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../services/api";
import { getNewOrder, deleteProduct } from "../store/appSlice";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 500,
  minHeight: 100,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));
const NewOrder = () => {
  const dispatch = useDispatch();
  const { newOrder } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getNewOrder());
  }, []);

  // Delete product
  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ productID: id }));
  };

  return (
    <>
      <Typography variant="h4">New Order</Typography>
      <DemoPaper variant="outlined">
        {" "}
        {JSON.stringify(newOrder, null, 2)}
      </DemoPaper>
    </>
  );
};

export default NewOrder;
