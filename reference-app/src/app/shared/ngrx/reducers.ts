import { ActionReducerMap } from '@ngrx/store'

import { resourceReducer, ResourceState, RESOURCE_INITIAL_STATE } from './resource/resource.reducer'

export interface RootState {
  resource: ResourceState
}

const reducers: ActionReducerMap<RootState> = {
  resource: resourceReducer
}

export const ROOT_INITIAL_STATE: RootState = {
  resource: RESOURCE_INITIAL_STATE
}

export default reducers

