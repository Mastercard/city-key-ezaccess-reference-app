import { testDispatchEffect } from 'ngx-mclabs-testing'

import { ProgramsDetailService } from '../programs-detail.service'
import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  UnassignCard, UnassignCardSuccess, UnassignCardFailure
} from './programs-detail.actions'
import { ProgramsDetailEffects } from './programs-detail.effects'

describe(ProgramsDetailEffects.name, () => {
  const programId = 'programId'
  const eaid = 'eaid'

  const getParams = {
    offset: 0,
    limit: 20
  }

  const providers = [{ provide: ProgramsDetailService, useValue: {} }]

  testDispatchEffect({
    effects: ProgramsDetailEffects,
    effectKey: 'getCards$',
    providers,
    service: ProgramsDetailService,
    serviceFnKey: 'getCards',
    testedServiceParams: [programId, getParams],
    triggerActionConstructor: GetCards,
    triggerActionConstructorParams: [programId, getParams],
    successActionConstructor: GetCardsSuccess,
    failureActionConstructor: GetCardsFailure
  })

  testDispatchEffect({
    effects: ProgramsDetailEffects,
    effectKey: 'unassignCard$',
    providers,
    service: ProgramsDetailService,
    serviceFnKey: 'unassignCard',
    testedServiceParams: [programId, eaid],
    triggerActionConstructor: UnassignCard,
    triggerActionConstructorParams: [programId, eaid],
    successActionConstructor: UnassignCardSuccess,
    failureActionConstructor: UnassignCardFailure
  })
})
