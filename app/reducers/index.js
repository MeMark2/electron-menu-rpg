// @flow

import { combineReducers } from 'redux';
import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

import counter, { actionCreators as counterActions } from './counter';
import type { StateType as CounterStateType } from './counter';

type StateType = {
  counter: CounterStateType
};

type Action = {
  +type: string
};

type GetState = () => StateType;

type Dispatch = ReduxDispatch<Action>;

type Store = ReduxStore<GetState, Action>;

export default combineReducers({
  counter
});

export { counterActions };
export type { StateType, Action, GetState, Dispatch, Store };
