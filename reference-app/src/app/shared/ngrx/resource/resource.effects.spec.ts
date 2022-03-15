import { testDispatchEffect } from 'ngx-mclabs-testing'

import { ResourceService } from 'app/shared/services/resource.service'

import {
  GetProgramsRes, GetProgramsResSuccess, GetProgramsResFailure
} from './resource.actions'
import { ResourceEffects } from './resource.effects'

describe(ResourceEffects.name, () => {
  const providers = [{ provide: ResourceService, useValue: {} }]

  testDispatchEffect({
    effects: ResourceEffects,
    effectKey: 'getProgramsRes$',
    providers,
    service: ResourceService,
    serviceFnKey: 'getProgramsRes',
    triggerActionConstructor: GetProgramsRes,
    successActionConstructor: GetProgramsResSuccess,
    failureActionConstructor: GetProgramsResFailure
  })
})
