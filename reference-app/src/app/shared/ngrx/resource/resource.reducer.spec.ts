import { testReadReducer, testResetReducer, testNoopReducer } from 'ngx-mclabs-testing'

import { ResourceKeys } from 'app/shared/constants'

import {
  GetProgramsRes, GetProgramsResSuccess, GetProgramsResFailure,
  Reset
} from './resource.actions'
import { resourceReducer, RESOURCE_INITIAL_STATE } from './resource.reducer'

describe(resourceReducer.name, () => {
  describe(`${GetProgramsRes.name}, ${GetProgramsResSuccess.name}, ${GetProgramsResFailure.name}`, () => {
    testReadReducer({
      reducer: resourceReducer,
      initialState: RESOURCE_INITIAL_STATE,
      stateKey: ResourceKeys.PROGRAMS,
      triggerActionConstructor: GetProgramsRes,
      successActionConstructor: GetProgramsResSuccess,
      failureActionConstructor: GetProgramsResFailure
    })
  })

  describe(Reset.name, () => {
    testResetReducer({
      reducer: resourceReducer,
      initialState: RESOURCE_INITIAL_STATE,
      modifyActionConstructor: GetProgramsRes,
      resetActionConstructor: Reset
    })
  })

  describe('default', () => {
    testNoopReducer({
      reducer: resourceReducer,
      initialState: RESOURCE_INITIAL_STATE
    })
  })
})
