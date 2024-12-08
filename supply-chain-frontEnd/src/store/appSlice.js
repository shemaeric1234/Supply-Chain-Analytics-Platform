import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

const initialState = {
  allProducts: [],
  allOrders: [],
  newOrder: [],
  analysisData: {},
  isLogenIn: false,
  getProductError: null,
  getProductStatus: "idle",
  addProductError: null,
  addProductStatus: "idle",
  deleteProductError: null,
  deleteProductStatus: "idle",
  updateProductError: null,
  updateProductStatus: "idle",
  getNewOrderStatus: "fail",
  getNewOrderError: "",
  addOrderStatus: "fail",
  addOrderError: "",
  analysisDataStatus: "fail",
  analysisDataError: "",
};

//get
export const getProduct = createAsyncThunk("app/getProduct", async () => {
  const response = await API.get("api/products/");
  return response.data;
});
export const getOrder = createAsyncThunk("app/getOrder", async () => {
  const response = await API.get("api/orders/");
  return response.data;
});
export const getNewOrder = createAsyncThunk("app/getNewOrder", async () => {
  const response = await API.get(
    "consume/orders/?group_id=my-group&max_messages=5"
  );
  return response.data;
});

export const getAnalysisData = createAsyncThunk(
  "app/getAnalysisData",
  async () => {
    const response = await API.get("analytics/");
    return response.data;
  }
);

// add
export const addProduct = createAsyncThunk(
  "app/addProduct",
  async (formData) => {
    const response = await API.post("api/products/", formData);
    return response.data;
  }
);
export const addOrder = createAsyncThunk("app/addOrder", async (formData) => {
  const response = await API.post("send-kafka-message/", {
    topic: "orders",
    message: formData,
  });
  return response.data;
});

// delete
export const deleteProduct = createAsyncThunk(
  "app/deleteProduct",
  async ({ productID }) => {
    const response = await API.delete(`api/products/${productID}/`);
    return response.data;
  }
);

// update
export const updateProduct = createAsyncThunk(
  "app/updateProduct",
  async ({ productID, data }) => {
    const response = await API.patch(`api/products/${productID}/`, data);
    return response.data;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.getProductStatus = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductStatus = "success";
        state.allProducts = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductStatus = "fail";
        state.getProductError = action.error.message;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.addProductStatus = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = "success";
        state.allProducts = [action.payload, ...state.allProducts];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = "fail";
        state.addProductError = action.error.message;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteProductStatus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductStatus = "success";
        state.allProducts = state.allProducts.filter(
          (product) => product.id !== action.meta.arg.productID
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = "fail";
        state.deleteProductError = action.error.message;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.updateProductStatus = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = "success";
        state.allProducts = state.allProducts.map((product) => {
          if (product.id === action.meta.arg.productID) return action.payload;
          else return product;
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = "fail";
        state.updateProductError = action.error.message;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.getOrderStatus = "loading";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.getOrderStatus = "success";
        state.allOrders = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.getOrderStatus = "fail";
        state.getOrderError = action.error.message;
      })
      .addCase(getNewOrder.pending, (state, action) => {
        state.getNewOrderStatus = "loading";
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.getNewOrderStatus = "success";
        state.newOrder = action.payload;
      })
      .addCase(getNewOrder.rejected, (state, action) => {
        state.getNewOrderStatus = "fail";
        state.getNewOrderError = action.error.message;
      })
      .addCase(addOrder.pending, (state, action) => {
        state.addOrderStatus = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.addOrderStatus = "success";
        state.newOrder = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.addOrderStatus = "fail";
        state.addOrderError = action.error.message;
      })
      .addCase(getAnalysisData.pending, (state, action) => {
        state.analysisDataStatus = "loading";
      })
      .addCase(getAnalysisData.fulfilled, (state, action) => {
        state.analysisDataStatus = "success";
        state.analysisData = action.payload;
      })
      .addCase(getAnalysisData.rejected, (state, action) => {
        state.analysisDataStatus = "fail";
        state.analysisDataError = action.error.message;
      });
  },
});

export const { logout } = appSlice.actions;
export default appSlice.reducer;
