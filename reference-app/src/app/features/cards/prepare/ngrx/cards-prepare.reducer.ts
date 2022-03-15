import {
  WriteState,
  writeReducer, writeSuccessReducer, writeFailureReducer,
  INITIAL_WRITE_STATE
} from 'ngx-mclabs-utils'

import { CardsPrepareActions, CardsPrepareActionTypes } from './cards-prepare.actions'

export interface CardsPrepareState {
  createEaids: WriteState
  registerCards: WriteState
}

export interface FeatureState {
  cardsPrepare: CardsPrepareState
}

export const CARDS_PREPARE_INITIAL_STATE: CardsPrepareState = {
  createEaids: { ...INITIAL_WRITE_STATE },
  registerCards: { ...INITIAL_WRITE_STATE }
}

const {
  CreateEaids, CreateEaidsSuccess, CreateEaidsFailure,
  RegisterCards, RegisterCardsSuccess, RegisterCardsFailure,
  Reset
} = CardsPrepareActionTypes

function getKey(action: CardsPrepareActions): keyof CardsPrepareState | undefined {
  switch (action.type) {
    case CreateEaids: case CreateEaidsSuccess: case CreateEaidsFailure:
      return 'createEaids'

    case RegisterCards: case RegisterCardsSuccess: case RegisterCardsFailure:
      return 'registerCards'

    default:
      return undefined
  }
}

export function cardsPrepareReducer(
  state = CARDS_PREPARE_INITIAL_STATE,
  action: CardsPrepareActions
): CardsPrepareState {
  const key = getKey(action) as keyof CardsPrepareState

  switch (action.type) {
    case CreateEaids:
    case RegisterCards:
      return { ...state, [key]: writeReducer(state[key] as WriteState) }

    case CreateEaidsSuccess:
    case RegisterCardsSuccess:
      return { ...state, [key]: writeSuccessReducer(state[key] as WriteState, action) }

    case CreateEaidsFailure:
    case RegisterCardsFailure:
      return { ...state, [key]: writeFailureReducer(state[key] as WriteState, action) }

    case Reset:
      return CARDS_PREPARE_INITIAL_STATE

    default:
      return state
  }
}
