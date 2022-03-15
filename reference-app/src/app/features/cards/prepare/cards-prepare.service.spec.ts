import { testServiceHttpFn } from 'ngx-mclabs-testing'

import { CardsPrepareService } from './cards-prepare.service'

describe(CardsPrepareService.name, () => {
  const body = {}

  testServiceHttpFn({
    service: CardsPrepareService,
    serviceFnKey: 'createEaids',
    serviceFnParams: [body],
    httpMethod: 'post',
    testedPath: '/eaids',
    testedHttpParams: [body]
  })

  testServiceHttpFn({
    service: CardsPrepareService,
    serviceFnKey: 'registerCards',
    serviceFnParams: [body],
    httpMethod: 'post',
    testedPath: '/cards',
    testedHttpParams: [body]
  })
})
