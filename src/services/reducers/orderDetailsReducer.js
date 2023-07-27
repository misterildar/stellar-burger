import React from 'react'
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/orderDetails'


const initialState = {
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};


const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true
      };
    }

    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
        orderDetails: { ...state, ...action.payload }
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false
      };
    }
    default: {
      return state
    }
  }

}

export default orderDetailsReducer