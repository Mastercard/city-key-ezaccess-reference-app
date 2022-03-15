import {
  ReadState, WriteState,
  readReducer, readSuccessReducer, readFailureReducer,
  writeReducer, writeSuccessReducer, writeFailureReducer,
  INITIAL_READ_STATE, INITIAL_WRITE_STATE
} from 'ngx-mclabs-utils'

import { ProgramsDetailActions, ProgramsDetailActionTypes } from './programs-detail.actions'

export interface ProgramsDetailState {
  listCards: ReadState
  unassignCard: WriteState
}

export interface FeatureState {
  programsDetail: ProgramsDetailState
}

export const PROGRAMS_DETAIL_INITIAL_STATE: ProgramsDetailState = {
  listCards: { ...INITIAL_READ_STATE },
  unassignCard: { ...INITIAL_WRITE_STATE }
}

const {
  GetCards, GetCardsSuccess, GetCardsFailure,
  UnassignCard, UnassignCardSuccess, UnassignCardFailure,
  Reset
} = ProgramsDetailActionTypes

function getKey(action: ProgramsDetailActions): keyof ProgramsDetailState | undefined {
  switch (action.type) {
    case GetCards: case GetCardsSuccess: case GetCardsFailure:
      return 'listCards'

    case UnassignCard: case UnassignCardSuccess: case UnassignCardFailure:
      return 'unassignCard'

    default:
      return undefined
  }
}

export function programsDetailReducer(
  state = PROGRAMS_DETAIL_INITIAL_STATE,
  action: ProgramsDetailActions
): ProgramsDetailState {
  const key = getKey(action) as keyof ProgramsDetailState

  switch (action.type) {
    case GetCards:
      return { ...state, [key]: readReducer(state[key] as ReadState) }

    case GetCardsSuccess:
      return { ...state, [key]: readSuccessReducer(state[key] as ReadState, action) }

    case GetCardsFailure:
      return { ...state, [key]: readFailureReducer(state[key] as ReadState, action) }

    case UnassignCard:
      return { ...state, [key]: writeReducer(state[key] as WriteState) }

    case UnassignCardSuccess:
      return { ...state, [key]: writeSuccessReducer(state[key] as WriteState, action) }

    case UnassignCardFailure:
      return { ...state, [key]: writeFailureReducer(state[key] as WriteState, action) }

    case Reset:
      return PROGRAMS_DETAIL_INITIAL_STATE

    default:
      return state
  }
}
