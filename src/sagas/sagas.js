import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { FETCH_CODE } from '../actions/types';
import api from '../api.js';
import httpRequest from '../utils/httpRequest';
function* fetchCode(action) {

    console.log("Actions",action);
    const {
        type,
        payload:{
            next, //函数 当前成功后的下一个action的生成器(会用到当前action成功后的数据) 
            path
        }
    } = action;

    try {
        const res = yield call(httpRequest, { type: 'get', url: api.base + path, data: {} })
        console.log(res.data);
        yield put({ type: `${type}_SUC`, data: res.data });

        yield next ? put(next(res.data)) : null;

    } catch (e) {
        yield put({ type: "FETCH_CODE_ERR", message: e });
    }
}

function* mySaga() {
    yield takeEvery(FETCH_CODE, fetchCode);
}

export default mySaga;