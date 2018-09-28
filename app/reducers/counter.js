// @flow

import reducerGenerator from './utils/reducerGenerator';

type StateType = { count: number };

const initialState: StateType = { count: 0 };

const { reducer, actionCreators } = reducerGenerator(initialState, {
  INCREMENT: {
    actionName: 'increment',
    reducer: (state: StateType, action) => {
      const [amount = 1] = action.params;

      return {
        ...state,
        count: state.count + amount
      };
    }
  },
  DECREMENT: {
    actionName: 'decrement',
    reducer: (state: StateType, action) => {
      const [amount = 1] = action.params;

      return {
        ...state,
        count: state.count - amount
      };
    }
  }
});

export default reducer;
export { actionCreators };

export type { StateType };
