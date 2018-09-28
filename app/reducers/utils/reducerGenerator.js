import _ from 'lodash';

function reducerGenerator(initialState, reducerBundles) {
  const defaultReducer = state => state;

  const actionCreators = {};
  _.forEach(reducerBundles, (bundle, type) => {
    const {
      actionName = type,
      actionCreator = (...params) => ({ type, params })
    } = bundle;

    actionCreators[actionName] = actionCreator;
  });

  return {
    actionCreators,
    reducer: (state = initialState, action) => {
      const { type } = action;

      const { [type]: { reducer = defaultReducer } = {} } = reducerBundles;

      return reducer(state, action);
    }
  };
}

export default reducerGenerator;
