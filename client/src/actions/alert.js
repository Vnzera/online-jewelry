import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// this action can be called from the component
// this will trigger the Reducer logic aka switch case for this action.hljs-type
// the store will be updated and changes sent to components that are subscribed

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
