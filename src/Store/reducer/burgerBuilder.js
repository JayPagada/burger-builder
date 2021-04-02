import * as ActionCreators from "../actions/actionsTypes.js"
const initialState = {
  ingredients:null,
  totalPrice:4
}
const ingredientsPrices = {
  salad : 0.5,
  cheese: 0.4,
  bacon: 0.8,
  meat: 1.4
}
const reduce = (state= initialState,action)=>{
switch (action.type){
  case ActionCreators.ADD_INGREDIENT:
    return{
        ...state,
      ingredients: {
          ...state.ingredients,
        [action.ingredientName] :state.ingredients[action.ingredientName] +1
      },
      totalPrice: state.totalPrice + ingredientsPrices[action.ingredientName]
    }
  case ActionCreators.REMOVE_INGREDIENT:
    return{
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName] :state.ingredients[action.ingredientName] -1
      },
      totalPrice: state.totalPrice - ingredientsPrices[action.ingredientName]

    }
  case ActionCreators.SET_INGREDIENT:
    return {
      ...state,
      ingredients: action.ingredients,
      totalPrice:4
    }
  default:
    return state;
}
}
export default reduce;
