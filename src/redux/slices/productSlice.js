import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';



export const getHomepageData = createAsyncThunk(
  'homepage/getHomepageData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/homepage');
      const data = response.data;

      const productLists = data
        .filter(item => item.type === 'productlist' && item.data?.title)
        .map(item => ({
          title: item.data.title,
          items: item.data.items || [],
        }));

      return {productLists};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unknown error',
      );
    }
  },
);

// Thunk for banners
export const getBanners = createAsyncThunk(
  'homepage/getBanners',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/configuration');
      const banners = response?.data?.data?.slider || [];

      return {banners};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unknown error',
      );
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  'homepage/fetchProductDetails',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`/productdetails?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Unknown error',
      );
    }
  },
);

const homepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    banners: [],
    productLists: [],
    details: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Product lists
      .addCase(getHomepageData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomepageData.fulfilled, (state, action) => {
        state.loading = false;
        state.productLists = action.payload.productLists;
      })
      .addCase(getHomepageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch homepage data';
      })
      // Banners
      .addCase(getBanners.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch banners';
      })

      .addCase(fetchProductDetails.pending, state => {
        state.loading = true;
        state.error = null;
        state.details = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product details';
      });
  },
});

export default homepageSlice.reducer;
