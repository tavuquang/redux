import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {

    const fetchData = async () => {
      const response = await fetch('https://react-http-81c38-default-rtdb.firebaseio.com/cart.json');

      if(!response.ok) {
        throw new Error('Fetch cart data is failed');
      }

      const data = await response.json();

      return data;
    }

    try {
      const cartData = await  fetchData();
      return cartData;
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed.'
      }));
    }

  }
};

export const sendCartData = cart => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
          }));

          const sendRequest = async () => {
            const response = await fetch('https://react-http-81c38-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
              });
        
              if (!response.ok) {
                throw new Error('Sending cart data is failed.');
              }
          }

          try {
            await sendRequest();
                
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
          } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed.'
              }));
          }

    }
};