import {
  CardStatusType, CARD_STATUS_DICT
} from 'app/shared/constants'

export function formatCardStatusTitle(cardStatus: CardStatusType): string {
  return CARD_STATUS_DICT[cardStatus]
}

export function getName(x: any): string {
  return x.name
}
