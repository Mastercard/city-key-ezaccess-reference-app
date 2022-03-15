import {
  CardStatusType, CARD_STATUS_DICT
} from 'app/shared/constants'

import { FormatTitlePipe } from './format-title.pipe'

describe(FormatTitlePipe.name, () => {
  it('should return correct formatted title', () => {
    const pipe = new FormatTitlePipe()

    expect(pipe.transform(CardStatusType.ACTIVE, 'cardStatus')).toEqual(CARD_STATUS_DICT.ACTIVE)
    expect(pipe.transform(CardStatusType.ACTIVE, undefined)).toEqual('')
  })
})
