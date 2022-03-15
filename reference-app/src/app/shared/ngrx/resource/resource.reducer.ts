import clone from 'lodash-es/clone'
import get from 'lodash-es/get'
import setWith from 'lodash-es/setWith'
import { INITIAL_READ_STATE, readReducer, readSuccessReducer, readFailureReducer, ReadState } from 'ngx-mclabs-utils'

import { ResourceKeys } from 'app/shared/constants'

import {
  ResourceActions, ResourceActionTypes
} from './resource.actions'

const {
  GetProgramsRes, GetProgramsResSuccess, GetProgramsResFailure,
  Reset
} = ResourceActionTypes

const { PROGRAMS } = ResourceKeys

export interface ResourceState {
  [PROGRAMS]: ReadState
}

export const RESOURCE_INITIAL_STATE: ResourceState = {
  [PROGRAMS]: { ...INITIAL_READ_STATE }
}

function getKey(action: ResourceActions): string | string[] {
  switch (action.type) {
    case GetProgramsRes:
    case GetProgramsResSuccess:
    case GetProgramsResFailure:
      return PROGRAMS

    default:
      return ''
  }
}

export function resourceReducer(state = RESOURCE_INITIAL_STATE, action: ResourceActions): ResourceState {
  const key = getKey(action)
  const newState = { ...state }

  switch (action.type) {
    case GetProgramsRes:
      setWith(newState, key, readReducer(get(newState, key)), clone)
      return newState

    case GetProgramsResSuccess:
      setWith(newState, key, readSuccessReducer(get(newState, key), action), clone)
      return newState

    case GetProgramsResFailure:
      setWith(newState, key, readFailureReducer(get(newState, key), action), clone)
      return newState

    case Reset:
      return RESOURCE_INITIAL_STATE

    default:
      return state
  }
}
