import { testReadReducer, testResetReducer, testNoopReducer } from 'ngx-mclabs-testing'

import {
  GetPrograms, GetProgramsSuccess, GetProgramsFailure,
  Reset
} from './programs-list.actions'
import { programsListReducer, PROGRAMS_LIST_INITIAL_STATE } from './programs-list.reducer'

describe(programsListReducer.name, () => {
  describe(`${GetPrograms.name}, ${GetProgramsSuccess.name}, ${GetProgramsFailure.name}`, () => {
    testReadReducer({
      reducer: programsListReducer,
      initialState: PROGRAMS_LIST_INITIAL_STATE,
      stateKey: 'list',
      triggerActionConstructor: GetPrograms,
      successActionConstructor: GetProgramsSuccess,
      failureActionConstructor: GetProgramsFailure
    })
  })

  describe(Reset.name, () => {
    testResetReducer({
      reducer: programsListReducer,
      initialState: PROGRAMS_LIST_INITIAL_STATE,
      modifyActionConstructor: GetPrograms,
      resetActionConstructor: Reset
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: programsListReducer,
      initialState: PROGRAMS_LIST_INITIAL_STATE
    })
  })
})
