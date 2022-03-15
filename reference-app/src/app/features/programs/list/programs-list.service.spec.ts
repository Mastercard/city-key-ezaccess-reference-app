import { testServiceHttpFn } from 'ngx-mclabs-testing'

import { ProgramsListService } from './programs-list.service'

describe(ProgramsListService.name, () => {
  const getParams = {
    offset: 0,
    limit: 20
  }

  testServiceHttpFn({
    service: ProgramsListService,
    serviceFnKey: 'getPrograms',
    serviceFnParams: [getParams],
    httpMethod: 'get',
    testedPath: '/programs',
    testedHttpParams: [{ params: getParams }]
  })
})
