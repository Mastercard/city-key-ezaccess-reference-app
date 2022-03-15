export enum CardStatusType {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED'
}

export const CARD_STATUS_DICT: { [k in CardStatusType]: string } = {
  ACTIVE: 'Active',
  BLOCKED: 'Blocked',
  DELETED: 'Deleted'
}
