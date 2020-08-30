import { action, Action, createStore, createTypedHooks } from 'easy-peasy';
import { History } from 'history';

interface StatsModel {
  availableCount: number;
  totalCount: number;
  add: Action<StatsModel, boolean>;
  reset: Action<StatsModel, void>;
}

interface StoreModel {
  stats: StatsModel;
}

const statsModel: StatsModel = {
  availableCount: 0,
  totalCount: 0,
  add: action((state, isAvailable) => {
    state.totalCount += 1;
    if (isAvailable) {
      state.availableCount += 1;
    }
  }),
  reset: action((state) => {
    state.totalCount = 0;
    state.availableCount = 0;
  }),
};

const storeModel: StoreModel = {
  stats: statsModel,
};

export const store = createStore(storeModel);

export function wrapHistoryWithStoreHandler(history: History) {
  history.listen(() => {
    // reset stats counter
    store.getActions().stats.reset();
  });
  return history;
}

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
