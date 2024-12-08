import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";

import { getAnalysisData } from "../store/appSlice";

const AnalysisView = () => {
  const dispatch = useDispatch();
  const { getProductStatus, getProductError, analysisData } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    dispatch(getAnalysisData());
  }, []);

  // Prepare data for BarChart (User Analysis)
  const userChartData = analysisData?.user_data?.map((user) => ({
    name: user.username,
    orders: user.total_orders,
    quantities: user.total_purchase_quantity,
    myrevenue: user.total_revenue / 1000,
  }));

  // Prepare data for PieChart (Most Ordered Products)
  const productChartData = analysisData?.most_ordered_products?.map(
    (product) => ({
      name: product.product_name,
      value: product.total_orders,
    })
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Order Analysis
      </Typography>

      {/* User Orders and Revenue Chart */}
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Total Orders and Revenue by User
        </Typography>
        <BarChart width={1000} height={300} data={userChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => {
              if (name === "Total Revenue $(k)") {
                return `${value}k`; // Format revenue in thousands
              }
              return value;
            }} // Only format revenue in Tooltip
          />
          <Legend />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" name="Total Orders" />
          <Bar dataKey="quantities" fill="#8884d8" name="Total quantities" />
          <Bar dataKey="myrevenue" fill="#82ca9d" name="Total Revenue $(k)" />
        </BarChart>
      </Paper>

      {/* Most Ordered Products Pie Chart */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Most Ordered Products
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={productChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#82ca9d"
            label
          >
            {productChartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Paper>
    </Box>
  );
};

export default AnalysisView;
