import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PREFIX } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store/store';

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((item) => {
        if (item.id === action.payload) {
          item.count += 1;
        }
        return item;
      });
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
