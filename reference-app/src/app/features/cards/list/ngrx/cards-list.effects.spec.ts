import { testDispatchEffect } from 'ngx-mclabs-testing'

import { CardsListService } from '../cards-list.service'
import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  ChangeCardStatus, ChangeCardStatusSuccess, ChangeCardStatusFailure,
  ReplaceCardEaid, ReplaceCardEaidSuccess, ReplaceCardEaidFailure,
  AssignProgram, AssignProgramSuccess, AssignProgramFailure,
  UnassignProgram, UnassignProgramSuccess, UnassignProgramFailure
} from './cards-list.actions'
import { CardsListEffects } from './cards-list.effects'

describe(CardsListEffects.name, () => {
  const eaid = 'eaid'
  const programId = 'programId'

  const getParams = {
    offset: 0,
    limit: 20
  }

  const body = { }

  const providers = [{ provide: CardsListService, useValue: {} }]

  testDispatchEffect({
    effects: CardsListEffects,
    effectKey: 'getCards$',
    providers,
    service: CardsListService,
    serviceFnKey: 'getCards',
    testedServiceParams: [getParams],
    triggerActionConstructor: GetCards,
    triggerActionConstructorParams: [getParams],
    successActionConstructor: GetCardsSuccess,
    failureActionConstructor: GetCardsFailure
  })

  testDispatchEffect({
    effects: CardsListEffects,
    effectKey: 'changeCardStatus$',
    providers,
    service: CardsListService,
    serviceFnKey: 'changeCardStatus',
    testedServiceParams: [eaid, body],
    triggerActionConstructor: ChangeCardStatus,
    triggerActionConstructorParams: [eaid, body],
    successActionConstructor: ChangeCardStatusSuccess,
    failureActionConstructor: ChangeCardStatusFailure
  })

  testDispatchEffect({
    effects: CardsListEffects,
    effectKey: 'replaceCardEaid$',
    providers,
    service: CardsListService,
    serviceFnKey: 'replaceCardEaid',
    testedServiceParams: [eaid, body],
    triggerActionConstructor: ReplaceCardEaid,
    triggerActionConstructorParams: [eaid, body],
    successActionConstructor: ReplaceCardEaidSuccess,
    failureActionConstructor: ReplaceCardEaidFailure
  })

  testDispatchEffect({
    effects: CardsListEffects,
    effectKey: 'assignProgram$',
    providers,
    service: CardsListService,
    serviceFnKey: 'assignProgram',
    testedServiceParams: [programId, body],
    triggerActionConstructor: AssignProgram,
    triggerActionConstructorParams: [programId, body],
    successActionConstructor: AssignProgramSuccess,
    failureActionConstructor: AssignProgramFailure
  })

  testDispatchEffect({
    effects: CardsListEffects,
    effectKey: 'unassignProgram$',
    providers,
    service: CardsListService,
    serviceFnKey: 'unassignProgram',
    testedServiceParams: [programId, body],
    triggerActionConstructor: UnassignProgram,
    triggerActionConstructorParams: [programId, body],
    successActionConstructor: UnassignProgramSuccess,
    failureActionConstructor: UnassignProgramFailure
  })
})
