import { testDispatchEffect } from 'ngx-mclabs-testing'

import { ProgramsListService } from '../programs-list.service'
import {
  GetPrograms, GetProgramsSuccess, GetProgramsFailure
} from './programs-list.actions'
import { ProgramsListEffects } from './programs-list.effects'

describe(ProgramsListEffects.name, () => {
  const getParams = {
    offset: 0,
    limit: 20
  }

  const providers = [{ provide: ProgramsListService, useValue: {} }]

  testDispatchEffect({
    effects: ProgramsListEffects,
    effectKey: 'getPrograms$',
    providers,
    service: ProgramsListService,
    serviceFnKey: 'getPrograms',
    testedServiceParams: [getParams],
    triggerActionConstructor: GetPrograms,
    triggerActionConstructorParams: [getParams],
    successActionConstructor: GetProgramsSuccess,
    failureActionConstructor: GetProgramsFailure
  })
})
