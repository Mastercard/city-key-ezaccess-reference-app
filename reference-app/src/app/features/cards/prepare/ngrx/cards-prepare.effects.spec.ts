import { testDispatchEffect } from 'ngx-mclabs-testing'

import { CardsPrepareService } from '../cards-prepare.service'
import {
  CreateEaids, CreateEaidsSuccess, CreateEaidsFailure,
  RegisterCards, RegisterCardsSuccess, RegisterCardsFailure
} from './cards-prepare.actions'
import { CardsPrepareEffects } from './cards-prepare.effects'

describe(CardsPrepareEffects.name, () => {
  const body = { }

  const providers = [{ provide: CardsPrepareService, useValue: {} }]

  testDispatchEffect({
    effects: CardsPrepareEffects,
    effectKey: 'createEaids$',
    providers,
    service: CardsPrepareService,
    serviceFnKey: 'createEaids',
    testedServiceParams: [body],
    triggerActionConstructor: CreateEaids,
    triggerActionConstructorParams: [body],
    successActionConstructor: CreateEaidsSuccess,
    failureActionConstructor: CreateEaidsFailure
  })

  testDispatchEffect({
    effects: CardsPrepareEffects,
    effectKey: 'registerCards$',
    providers,
    service: CardsPrepareService,
    serviceFnKey: 'registerCards',
    testedServiceParams: [body],
    triggerActionConstructor: RegisterCards,
    triggerActionConstructorParams: [body],
    successActionConstructor: RegisterCardsSuccess,
    failureActionConstructor: RegisterCardsFailure
  })
})
