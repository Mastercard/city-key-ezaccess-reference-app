import { testServiceConcatHttpFn } from 'ngx-mclabs-testing'

import { ResourceService } from './resource.service'

describe(ResourceService.name, () => {
  testServiceConcatHttpFn({
    service: ResourceService,
    serviceFnKey: 'getProgramsRes',
    httpMethod: 'get',
    testedPath: '/programs',
    useOffsetOrPage: 'offset',
    pageSizeParam: 'limit',
    offsetParam: 'offset',
    totalElementsKey: 'total',
    itemsKey: 'items'
  })
})
