import * as actionTypes from "../actions/actionsTypes.js"

const initialState = {
  orders: [],
  loading: false,
  purchasing: false,
  error:null
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchasing: false
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        purchasing: true,
        orders: state.orders.concat(newOrder)
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default :
      return {...state}
  }
}
export default reducer
