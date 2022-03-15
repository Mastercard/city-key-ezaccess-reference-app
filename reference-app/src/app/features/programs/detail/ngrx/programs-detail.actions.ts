import { TriggerAction, ResultAction } from 'ngx-mclabs-utils'

import { getServerError } from 'app/shared/utils'
import { NotificationConfig } from 'app/shared/constants'

export const ProgramsDetailActionTypes = {
  GetCards: '[Programs Detail] Get Cards',
  GetCardsSuccess: '[Programs Detail] Get Cards Success',
  GetCardsFailure: '[Programs Detail] Get Cards Failure',
  UnassignCard: '[Programs Detail] Unassign Card',
  UnassignCardSuccess: '[Programs Detail] Unassign Card Success',
  UnassignCardFailure: '[Programs Detail] Unassign Card Failure',
  Reset: '[Programs Detail] Reset'
}

export class GetCards implements TriggerAction {
  readonly type = ProgramsDetailActionTypes.GetCards
  constructor(public programId: string, public payload?: unknown) { }
}

export class GetCardsSuccess implements ResultAction<GetCards> {
  readonly type = ProgramsDetailActionTypes.GetCardsSuccess
  constructor(public triggerAction: GetCards, public payload: unknown) { }
}

export class GetCardsFailure implements ResultAction<GetCards> {
  readonly type = ProgramsDetailActionTypes.GetCardsFailure
  get noty(): NotificationConfig { return 'Failed to retrieve cards for this program' }
  constructor(public triggerAction: GetCards, public payload: unknown) { }
}

export class UnassignCard implements TriggerAction {
  readonly type = ProgramsDetailActionTypes.UnassignCard
  constructor(public programId: string, public cardEaid: string) { }
}

export class UnassignCardSuccess implements ResultAction<UnassignCard> {
  readonly type = ProgramsDetailActionTypes.UnassignCardSuccess
  get noty(): NotificationConfig { return 'Card unassigned from program successfully' }
  constructor(public triggerAction: UnassignCard, public payload: unknown) { }
}

export class UnassignCardFailure implements ResultAction<UnassignCard> {
  readonly type = ProgramsDetailActionTypes.UnassignCardFailure
  get noty(): NotificationConfig { return `Failed to unassign card from this program: ${getServerError(this.payload)}` }
  constructor(public triggerAction: UnassignCard, public payload: unknown) { }
}

export class Reset implements TriggerAction {
  readonly type = ProgramsDetailActionTypes.Reset
}

export type ProgramsDetailActions =
  | GetCards
  | GetCardsSuccess
  | GetCardsFailure
  | UnassignCard
  | UnassignCardSuccess
  | UnassignCardFailure
  | Reset
