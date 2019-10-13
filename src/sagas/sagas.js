import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { FETCH_CODE } from '../actions/types';
import api from '../api.js';
import httpRequest from '../utils/httpRequest';
function* fetchCode(action) {
    console.log("fetchCode")
    try {
        const code = yield call(httpRequest, { type: 'get', url: api.FETCH_CODE, data: {} })
        console.log(code);
        yield put({ type: "FETCH_CODE_SUC", code });
    } catch (e) {
        yield put({ type: "FETCH_CODE_ERR", message: e });
    }
}

function* mySaga() {
    yield takeEvery(FETCH_CODE, fetchCode);
}

export default mySaga;