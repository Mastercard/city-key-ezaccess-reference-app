import { testServiceHttpFn } from 'ngx-mclabs-testing'

import { CardsListService } from './cards-list.service'

describe(CardsListService.name, () => {
  const eaid = 'eaid'
  const programId = 'programId'

  const getParams = {
    offset: 0,
    limit: 20
  }

  const body = {}

  testServiceHttpFn({
    service: CardsListService,
    serviceFnKey: 'getCards',
    serviceFnParams: [getParams],
    httpMethod: 'get',
    testedPath: '/cards',
    testedHttpParams: [{ params: getParams }]
  })

  testServiceHttpFn({
    service: CardsListService,
    serviceFnKey: 'changeCardStatus',
    serviceFnParams: [eaid, body],
    httpMethod: 'put',
    testedPath: `/cards/${eaid}`,
    testedHttpParams: [body]
  })

  testServiceHttpFn({
    service: CardsListService,
    serviceFnKey: 'replaceCardEaid',
    serviceFnParams: [eaid, body],
    httpMethod: 'post',
    testedPath: `/cards/${eaid}`,
    testedHttpParams: [body]
  })

  testServiceHttpFn({
    service: CardsListService,
    serviceFnKey: 'assignProgram',
    serviceFnParams: [programId, body],
    httpMethod: 'put',
    testedPath: `/programs/${programId}/cards`,
    testedHttpParams: [body]
  })

  testServiceHttpFn({
    service: CardsListService,
    serviceFnKey: 'unassignProgram',
    serviceFnParams: [programId, eaid],
    httpMethod: 'delete',
    testedPath: `/programs/${programId}/cards/${eaid}`
  })
})
