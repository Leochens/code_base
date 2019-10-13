import { ADD_CODE, UPDATE_CODE, DELETE_BADGE, DELETE_CODE, ADD_BADGE, SEARCH_CODE, FETCH_CODE } from './types';
import { createActions } from 'redux-actions';
const actions = createActions({
    [ADD_CODE]: code => ({ code }),
    [UPDATE_CODE]: (id, code) => ({ id, code }),
    [DELETE_CODE]: id => ({ id }),
    [ADD_BADGE]: (id, badge) => ({ id, badge }),
    [DELETE_BADGE]: (codeId, badge) => ({ codeId, badge }),
    [FETCH_CODE]: () => ({path: '/codes' }),
})
export default actions;
