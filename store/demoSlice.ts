import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IInvoice } from '../@types/types';
import data from '../data.json';

interface IModeInitialState {
  isDemoMode: boolean;
  invoices: IInvoice[];
}

let initialState: IModeInitialState = {
  isDemoMode: false,
  invoices: data,
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    loginDemo(state) {
      state.isDemoMode = true;
    },
    logoutDemo(state) {
      state.isDemoMode = false;
    },
    createInvoice(state, action: PayloadAction<IInvoice>) {
      const invoice = action.payload;

      state.invoices.push(invoice);
    },
    deleteInvoice(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.invoices = state.invoices.filter((item) => item.id !== id);
    },
    editInvoice(
      state,
      action: PayloadAction<{ id: string; invoice: IInvoice }>
    ) {
      const { id, invoice } = action.payload;
      state.invoices = state.invoices.map((item) =>
        item.id === id ? { ...invoice, id: item.id } : item
      );
    },
    markAsPaid(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.invoices.findIndex((item) => item.id === id);
      state.invoices[index].status = 'paid';
    },
  },
});

export const {
  loginDemo,
  logoutDemo,
  createInvoice,
  deleteInvoice,
  editInvoice,
  markAsPaid,
} = demoSlice.actions;

export const demoActions = demoSlice.actions;

export const selectDemo = (state: RootState) => state.demo;
export const demoReducer = demoSlice.reducer;
