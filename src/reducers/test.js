import { ADD } from '../actions/types';
const initValue = {
    value: 12
}
const test = (state = initValue, action) => {
    const { type } = action;
    switch (type) {
        case ADD: {
            console.log("hello add")
            return {
                value: state.value + 1
            }
        }
        default:
            return state;

    }
}
export default test;
