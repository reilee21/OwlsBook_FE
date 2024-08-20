// bookSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null,
  selectedBook:null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {    
    setSelectedBook(state, action) {
        state.selectedBook = action.payload;
      },
  },
  
});
export const { setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;
