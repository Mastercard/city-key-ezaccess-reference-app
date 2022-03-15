import { MatPaginator } from '@angular/material/paginator'

import { OffsetAndLimit } from 'app/shared/constants'

export function getOffsetAndLimit(paginator: MatPaginator): OffsetAndLimit {
  const { pageIndex, pageSize } = paginator
  return { offset: pageIndex * pageSize, limit: pageSize }
}
