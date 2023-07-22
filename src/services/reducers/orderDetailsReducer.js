import React from 'react'
import { ORDER } from '../actions/orderDetailsReducer'


const initialState = {
  orderDetails: {},
};


function orderDetailsReducer(state = initialState, action) {

  switch (action.type) {
    case 'ORDER':
      return {
        ...state,
        orderDetails: { ...state, ...action.payload }
      };

    default:
      return { ...state };
  }
}

export default orderDetailsReducer