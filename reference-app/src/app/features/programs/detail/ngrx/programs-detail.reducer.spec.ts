import { testReadReducer, testWriteReducer, testResetReducer, testNoopReducer } from 'ngx-mclabs-testing'

import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  UnassignCard, UnassignCardSuccess, UnassignCardFailure,
  Reset
} from './programs-detail.actions'
import { programsDetailReducer, PROGRAMS_DETAIL_INITIAL_STATE } from './programs-detail.reducer'

describe(programsDetailReducer.name, () => {
  describe(`${GetCards.name}, ${GetCardsSuccess.name}, ${GetCardsFailure.name}`, () => {
    testReadReducer({
      reducer: programsDetailReducer,
      initialState: PROGRAMS_DETAIL_INITIAL_STATE,
      stateKey: 'listCards',
      triggerActionConstructor: GetCards,
      successActionConstructor: GetCardsSuccess,
      failureActionConstructor: GetCardsFailure
    })
  })

  describe(`${UnassignCard.name}, ${UnassignCardSuccess.name}, ${UnassignCardFailure.name}`, () => {
    testWriteReducer({
      reducer: programsDetailReducer,
      initialState: PROGRAMS_DETAIL_INITIAL_STATE,
      stateKey: 'unassignCard',
      triggerActionConstructor: UnassignCard,
      successActionConstructor: UnassignCardSuccess,
      failureActionConstructor: UnassignCardFailure
    })
  })

  describe(Reset.name, () => {
    testResetReducer({
      reducer: programsDetailReducer,
      initialState: PROGRAMS_DETAIL_INITIAL_STATE,
      modifyActionConstructor: GetCards,
      resetActionConstructor: Reset
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: programsDetailReducer,
      initialState: PROGRAMS_DETAIL_INITIAL_STATE
    })
  })
})
