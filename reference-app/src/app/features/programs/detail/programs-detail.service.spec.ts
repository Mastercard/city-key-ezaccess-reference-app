import { testServiceHttpFn } from 'ngx-mclabs-testing'

import { ProgramsDetailService } from './programs-detail.service'

describe(ProgramsDetailService.name, () => {
  const programId = 'programId'
  const eaid = 'eaid'

  const getParams = {
    offset: 0,
    limit: 20
  }

  testServiceHttpFn({
    service: ProgramsDetailService,
    serviceFnKey: 'getCards',
    serviceFnParams: [programId, getParams],
    httpMethod: 'get',
    testedPath: '/cards',
    testedHttpParams: [{ params: { programId, ...getParams } }]
  })

  testServiceHttpFn({
    service: ProgramsDetailService,
    serviceFnKey: 'unassignCard',
    serviceFnParams: [programId, eaid],
    httpMethod: 'delete',
    testedPath: `/programs/${programId}/cards/${eaid}`
  })
})
