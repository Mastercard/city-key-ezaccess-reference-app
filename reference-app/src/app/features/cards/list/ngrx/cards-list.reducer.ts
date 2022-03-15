import {
  ReadState, WriteState,
  readReducer, readSuccessReducer, readFailureReducer,
  writeReducer, writeSuccessReducer, writeFailureReducer,
  INITIAL_READ_STATE, INITIAL_WRITE_STATE
} from 'ngx-mclabs-utils'

import { CardsListActions, CardsListActionTypes } from './cards-list.actions'

export interface CardsListState {
  list: ReadState
  changeCardStatus: WriteState
  replaceCardEaid: WriteState
  assignProgram: WriteState
  unassignProgram: WriteState
}

export interface FeatureState {
  cardsList: CardsListState
}

export const CARDS_LIST_INITIAL_STATE: CardsListState = {
  list: { ...INITIAL_READ_STATE },
  changeCardStatus: { ...INITIAL_WRITE_STATE },
  replaceCardEaid: { ...INITIAL_WRITE_STATE },
  assignProgram: { ...INITIAL_WRITE_STATE },
  unassignProgram: { ...INITIAL_WRITE_STATE }
}

const {
  GetCards, GetCardsSuccess, GetCardsFailure,
  ChangeCardStatus, ChangeCardStatusSuccess, ChangeCardStatusFailure,
  ReplaceCardEaid, ReplaceCardEaidSuccess, ReplaceCardEaidFailure,
  AssignProgram, AssignProgramSuccess, AssignProgramFailure,
  UnassignProgram, UnassignProgramSuccess, UnassignProgramFailure,
  Reset
} = CardsListActionTypes

function getKey(action: CardsListActions): keyof CardsListState | undefined {
  switch (action.type) {
    case GetCards: case GetCardsSuccess: case GetCardsFailure:
      return 'list'

    case ChangeCardStatus: case ChangeCardStatusSuccess: case ChangeCardStatusFailure:
      return 'changeCardStatus'

    case ReplaceCardEaid: case ReplaceCardEaidSuccess: case ReplaceCardEaidFailure:
      return 'replaceCardEaid'

    case AssignProgram: case AssignProgramSuccess: case AssignProgramFailure:
      return 'assignProgram'

    case UnassignProgram: case UnassignProgramSuccess: case UnassignProgramFailure:
      return 'unassignProgram'

    default:
      return undefined
  }
}

export function cardsListReducer(
  state = CARDS_LIST_INITIAL_STATE,
  action: CardsListActions
): CardsListState {
  const key = getKey(action) as keyof CardsListState

  switch (action.type) {
    case GetCards:
      return { ...state, [key]: readReducer(state[key] as ReadState) }

    case GetCardsSuccess:
      return { ...state, [key]: readSuccessReducer(state[key] as ReadState, action) }

    case GetCardsFailure:
      return { ...state, [key]: readFailureReducer(state[key] as ReadState, action) }

    case ChangeCardStatus:
    case ReplaceCardEaid:
    case AssignProgram:
    case UnassignProgram:
      return { ...state, [key]: writeReducer(state[key] as WriteState) }

    case ChangeCardStatusSuccess:
    case ReplaceCardEaidSuccess:
    case AssignProgramSuccess:
    case UnassignProgramSuccess:
      return { ...state, [key]: writeSuccessReducer(state[key] as WriteState, action) }

    case ChangeCardStatusFailure:
    case ReplaceCardEaidFailure:
    case AssignProgramFailure:
    case UnassignProgramFailure:
      return { ...state, [key]: writeFailureReducer(state[key] as WriteState, action) }

    case Reset:
      return CARDS_LIST_INITIAL_STATE

    default:
      return state
  }
}
