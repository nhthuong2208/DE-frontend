import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    totalCount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the new item to the cart
      const itemIndex = state.items.findIndex(
        (item) => item.ID === action.payload.ID
      )
      if (itemIndex >= 0) {
        if (action.payload.selectQuantity !== undefined) {
          state.items[itemIndex].cartQuantity += action.payload.selectQuantity
          state.items[itemIndex].totalPrice += action.payload.price * action.payload.selectQuantity
          state.totalAmount += action.payload.price * action.payload.selectQuantity
          state.totalCount = state.totalCount + action.payload.selectQuantity
        } else {
          state.items[itemIndex].cartQuantity += 1
          state.items[itemIndex].totalPrice += action.payload.price
          state.totalAmount += action.payload.price
          state.totalCount = state.totalCount + 1
        }
      } else {
        var tempItem
        if (action.payload.selectQuantity !== undefined) {
          tempItem = { ...action.payload, 
            cartQuantity: action.payload.selectQuantity, 
            totalPrice: action.payload.selectQuantity*action.payload.price,
            key: action.payload.productId
          }
          state.totalAmount += action.payload.price * action.payload.selectQuantity
          state.totalCount = state.totalCount + action.payload.selectQuantity
        } else {
          tempItem = { ...action.payload, cartQuantity: 1, totalPrice: action.payload.price, key: action.payload.productId}
          state.totalAmount += action.payload.price
          state.totalCount = state.totalCount + 1
        }
        state.items.push(tempItem)
      }
    },
    addItems: (state, action) => {
      if (state.items.length < action.payload.length) {
        action.payload.forEach((item) => {
          const tempItem = { ...item, cartQuantity: item.quantity, totalPrice: action.payload.total_price, key: action.payload.ID}
          state.items.push(tempItem)
          state.totalCount = state.totalCount + item.quantity
        })
      }
    },
    removeFromCart: (state, action) => {
      // Remove the item with the matching ID from the cart
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetTotalCount: (state, action) => {
      state.totalCount = 0
    },
    resetItem: (state, action) => {
      state.items = []
    }
  }
});

export const { addToCart, removeFromCart, addItems, resetTotalCount, resetItem } = cartSlice.actions;

export default cartSlice.reducer;