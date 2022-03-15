import { testReadReducer, testWriteReducer, testResetReducer, testNoopReducer } from 'ngx-mclabs-testing'

import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  ChangeCardStatus, ChangeCardStatusSuccess, ChangeCardStatusFailure,
  ReplaceCardEaid, ReplaceCardEaidSuccess, ReplaceCardEaidFailure,
  AssignProgram, AssignProgramSuccess, AssignProgramFailure,
  UnassignProgram, UnassignProgramSuccess, UnassignProgramFailure,
  Reset
} from './cards-list.actions'
import { cardsListReducer, CARDS_LIST_INITIAL_STATE } from './cards-list.reducer'

describe(cardsListReducer.name, () => {
  describe(`${GetCards.name}, ${GetCardsSuccess.name}, ${GetCardsFailure.name}`, () => {
    testReadReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      stateKey: 'list',
      triggerActionConstructor: GetCards,
      successActionConstructor: GetCardsSuccess,
      failureActionConstructor: GetCardsFailure
    })
  })

  describe(`${ChangeCardStatus.name}, ${ChangeCardStatusSuccess.name}, ${ChangeCardStatusFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      stateKey: 'changeCardStatus',
      triggerActionConstructor: ChangeCardStatus,
      successActionConstructor: ChangeCardStatusSuccess,
      failureActionConstructor: ChangeCardStatusFailure
    })
  })

  describe(`${ReplaceCardEaid.name}, ${ReplaceCardEaidSuccess.name}, ${ReplaceCardEaidFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      stateKey: 'replaceCardEaid',
      triggerActionConstructor: ReplaceCardEaid,
      successActionConstructor: ReplaceCardEaidSuccess,
      failureActionConstructor: ReplaceCardEaidFailure
    })
  })

  describe(`${AssignProgram.name}, ${AssignProgramSuccess.name}, ${AssignProgramFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      stateKey: 'assignProgram',
      triggerActionConstructor: AssignProgram,
      successActionConstructor: AssignProgramSuccess,
      failureActionConstructor: AssignProgramFailure
    })
  })

  describe(`${UnassignProgram.name}, ${UnassignProgramSuccess.name}, ${UnassignProgramFailure.name}`, () => {
    testWriteReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      stateKey: 'unassignProgram',
      triggerActionConstructor: UnassignProgram,
      successActionConstructor: UnassignProgramSuccess,
      failureActionConstructor: UnassignProgramFailure
    })
  })

  describe(Reset.name, () => {
    testResetReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE,
      modifyActionConstructor: GetCards,
      resetActionConstructor: Reset
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: cardsListReducer,
      initialState: CARDS_LIST_INITIAL_STATE
    })
  })
})
