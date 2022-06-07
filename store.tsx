import { action, Action, createStore, createTypedHooks } from 'easy-peasy';

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

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
