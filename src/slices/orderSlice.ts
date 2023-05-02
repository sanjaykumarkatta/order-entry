import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  TIFType: 'GTC'| 'DAY' | 'FOK' | 'IOC'
  action: 'Buy' | 'Sell'
  comment: string
  orderType: 'Market' | 'Limit'
  price: number
  qty: number
  stopPrice: number
  symbol: string
}

interface OrderState {
  orderDetails: Order[];
  lastUpdated?: any;
  latestOrder: Order;
}

const initialState: OrderState = {
  orderDetails: [],
  lastUpdated: undefined,
  latestOrder: <Order>{}, 
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order>) => {
      state.orderDetails = [action.payload, ...state.orderDetails ];
      state.lastUpdated = new Date().toLocaleTimeString();
      state.latestOrder = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions