import * as actionType from "./actionsTypes.js"
import axios from "../../Axios-Orders";

export const purchaseBurgerSuccess = (id,orderData)=>{
  return{
    type:actionType.PURCHASE_BURGER_SUCCESS,
    orderData:orderData,
    orderId:id
  };
};
export const purchaseBurgerFail = (error)=>{
  return{
    type:actionType.PURCHASE_BURGER_SUCCESS,
    error:error
  };
};
export const purchaseBurgerStart = (orderData,token)=>{
  return dispatch => {

    axios.post("/orders.json?auth="+token,orderData)
      .then(response=>{
       dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        this.props.history.push("/")
      })
      .catch(error=>{
       dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = ()=>{
  return {
    type:actionType.PURCHASE_INIT
  }
}
export const FETCH_ORDERS_SUCCESS = (orders)=>{
  return {
    type:actionType.FETCH_ORDERS_SUCCESS,
    orders:orders
  }
}
export const FETCH_ORDERS_FAIL = (error)=>{
  return{
    type:actionType.FETCH_ORDERS_FAIL,
    error:error
  };
};
export const FETCH_ORDERS_START = ()=>{
  return  {
    type:actionType.FETCH_ORDERS_START
  };
};
export const fetchOrders = (token,userId)=>{
return dispatch => {
  dispatch(FETCH_ORDERS_START());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  // const queryParams = `?auth=`+token+'&orderBy="userId"&equalTo="'+userId+'"'
  axios.get("/orders.json" + queryParams).then(
    res => {
      console.log(res)
      const fetchedOrders = []
      for (let key in res.data){

        fetchedOrders.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(FETCH_ORDERS_SUCCESS(fetchedOrders))
    }).catch( err => {
      dispatch(FETCH_ORDERS_FAIL(err.response.data.error))
    })
}
};
