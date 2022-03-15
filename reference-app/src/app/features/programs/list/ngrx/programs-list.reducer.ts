import {
  ReadState,
  readReducer, readSuccessReducer, readFailureReducer,
  INITIAL_READ_STATE
} from 'ngx-mclabs-utils'

import { ProgramsListActions, ProgramsListActionTypes } from './programs-list.actions'

export interface ProgramsListState {
  list: ReadState
}

export interface FeatureState {
  programsList: ProgramsListState
}

export const PROGRAMS_LIST_INITIAL_STATE: ProgramsListState = {
  list: { ...INITIAL_READ_STATE }
}

const {
  GetPrograms, GetProgramsSuccess, GetProgramsFailure,
  Reset
} = ProgramsListActionTypes

function getKey(action: ProgramsListActions): keyof ProgramsListState | undefined {
  switch (action.type) {
    case GetPrograms: case GetProgramsSuccess: case GetProgramsFailure:
      return 'list'

    default:
      return undefined
  }
}

export function programsListReducer(
  state = PROGRAMS_LIST_INITIAL_STATE,
  action: ProgramsListActions
): ProgramsListState {
  const key = getKey(action) as keyof ProgramsListState

  switch (action.type) {
    case GetPrograms:
      return { ...state, [key]: readReducer(state[key] as ReadState) }

    case GetProgramsSuccess:
      return { ...state, [key]: readSuccessReducer(state[key] as ReadState, action) }

    case GetProgramsFailure:
      return { ...state, [key]: readFailureReducer(state[key] as ReadState, action) }

    case Reset:
      return PROGRAMS_LIST_INITIAL_STATE

    default:
      return state
  }
}
