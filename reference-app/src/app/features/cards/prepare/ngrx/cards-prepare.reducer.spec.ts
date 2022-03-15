import { testWriteReducer, testResetReducer, testNoopReducer } from 'ngx-mclabs-testing'

import {
  CreateEaids, CreateEaidsSuccess, CreateEaidsFailure,
  RegisterCards, RegisterCardsSuccess, RegisterCardsFailure,
  Reset
} from './cards-prepare.actions'
import { cardsPrepareReducer, CARDS_PREPARE_INITIAL_STATE } from './cards-prepare.reducer'

describe(cardsPrepareReducer.name, () => {
  describe(`${CreateEaids.name}, ${CreateEaidsSuccess.name}, ${CreateEaidsFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsPrepareReducer,
      initialState: CARDS_PREPARE_INITIAL_STATE,
      stateKey: 'createEaids',
      triggerActionConstructor: CreateEaids,
      successActionConstructor: CreateEaidsSuccess,
      failureActionConstructor: CreateEaidsFailure
    })
  })

  describe(`${RegisterCards.name}, ${RegisterCardsSuccess.name}, ${RegisterCardsFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsPrepareReducer,
      initialState: CARDS_PREPARE_INITIAL_STATE,
      stateKey: 'registerCards',
      triggerActionConstructor: RegisterCards,
      successActionConstructor: RegisterCardsSuccess,
      failureActionConstructor: RegisterCardsFailure
    })
  })

  describe(Reset.name, () => {
    testResetReducer({
      reducer: cardsPrepareReducer,
      initialState: CARDS_PREPARE_INITIAL_STATE,
      modifyActionConstructor: CreateEaids,
      resetActionConstructor: Reset
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: cardsPrepareReducer,
      initialState: CARDS_PREPARE_INITIAL_STATE
    })
  })
})
