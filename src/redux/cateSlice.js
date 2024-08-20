import { useGetAllCatesQuery } from '@/services/cate/CateApi';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cates: [],
  loading: false,
  error: null,
  cateSelected: null,
  subCateSelected: null,
};

const cateSlice = createSlice({
  name: 'cates',
  initialState,
  reducers: {   
    getCates(state, action) {
      state.cates = action.payload;
    },
    setSelectedCate(state, action) {
      state.selectedCate = action.payload;
    },
    setCateSelectedData: (state, action) => {
      state.cateSelected = action.payload.cateSelected;
      state.subCateSelected = action.payload.subCateSelected;
  },
  }

});
export const { getCates,setSelectedCate,setCateSelectedData } = cateSlice.actions;
export default cateSlice.reducer;
