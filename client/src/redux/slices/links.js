import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLinks = createAsyncThunk("links/fetchAuthMe", async () => {
  const { data } = await axios.get("/links/getAll");
  return data.data;
});

export const createLink = createAsyncThunk(
  "links/createLink",
  async (params) => {
    const { data } = await axios.post("/links/create", params);
    return data.data;
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (params) => {
    const { data } = await axios.delete(`links/delete/${params.id}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const linksSlice = createSlice({
  name: "links",
  initialState,

  extraReducers: {
    [fetchLinks.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchLinks.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchLinks.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [createLink.pending]: (state) => {
      state.status = "loading";
    },
    [createLink.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = [...state.data, action.payload];
    },
    [createLink.rejected]: (state) => {
      state.status = "error";
    },

    [deleteLink.pending]: (state, action) => {
      state.data = state.data.filter((link) => link._id !== action.meta.arg.id);
    },
  },
});

export const linksReducer = linksSlice.reducer;
