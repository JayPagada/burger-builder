const initialState = {
  ingredients:{
    salad : 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
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
  case "ADD_INGREDIENT":
    return{
        ...state,
      ingredients: {
          ...state.ingredients,
        [action.ingredientName] :state.ingredients[action.ingredientName] +1
      },
      totalPrice: state.totalPrice + ingredientsPrices[action.ingredientName]
    }
  case "REMOVE_INGREDIENT":
    return{
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName] :state.ingredients[action.ingredientName] -1
      },
      totalPrice: state.totalPrice - ingredientsPrices[action.ingredientName]

    }
  default:
    return state;
}
}
export default reduce;
