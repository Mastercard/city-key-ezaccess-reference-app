import { TriggerAction, ResultAction } from 'ngx-mclabs-utils'

import { getServerError } from 'app/shared/utils'
import { NotificationConfig } from 'app/shared/constants'

export const CardsListActionTypes = {
  GetCards: '[Cards List] Get Cards',
  GetCardsSuccess: '[Cards List] Get Cards Success',
  GetCardsFailure: '[Cards List] Get Cards Failure',
  ChangeCardStatus: '[Cards List] Change Card Status',
  ChangeCardStatusSuccess: '[Cards List] Change Card Status Success',
  ChangeCardStatusFailure: '[Cards List] Change Card Status Failure',
  ReplaceCardEaid: '[Cards List] Replace Card Eaid',
  ReplaceCardEaidSuccess: '[Cards List] Replace Card Eaid Success',
  ReplaceCardEaidFailure: '[Cards List] Replace Card Eaid Failure',
  AssignProgram: '[Cards List] Assign Program',
  AssignProgramSuccess: '[Cards List] Assign Program Success',
  AssignProgramFailure: '[Cards List] Assign Program Failure',
  UnassignProgram: '[Cards List] Unassign Program',
  UnassignProgramSuccess: '[Cards List] Unassign Program Success',
  UnassignProgramFailure: '[Cards List] Unassign Program Failure',
  Reset: '[Cards List] Reset'
}

export class GetCards implements TriggerAction {
  readonly type = CardsListActionTypes.GetCards
  constructor(public payload?: unknown) { }
}

export class GetCardsSuccess implements ResultAction<GetCards> {
  readonly type = CardsListActionTypes.GetCardsSuccess
  constructor(public triggerAction: GetCards, public payload: unknown) { }
}

export class GetCardsFailure implements ResultAction<GetCards> {
  readonly type = CardsListActionTypes.GetCardsFailure
  constructor(public triggerAction: GetCards, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Failed to retrieve cards' }
}

export class ChangeCardStatus implements TriggerAction {
  readonly type = CardsListActionTypes.ChangeCardStatus
  constructor(public cardEaid: string, public payload: unknown) { }
}

export class ChangeCardStatusSuccess implements ResultAction<ChangeCardStatus> {
  readonly type = CardsListActionTypes.ChangeCardStatusSuccess
  constructor(public triggerAction: ChangeCardStatus, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Card status changed successfully' }
}

export class ChangeCardStatusFailure implements ResultAction<ChangeCardStatus> {
  readonly type = CardsListActionTypes.ChangeCardStatusFailure
  constructor(public triggerAction: ChangeCardStatus, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to change card status: ${getServerError(this.payload)}` }
}

export class ReplaceCardEaid implements TriggerAction {
  readonly type = CardsListActionTypes.ReplaceCardEaid
  constructor(public cardEaid: string, public payload: unknown) { }
}

export class ReplaceCardEaidSuccess implements ResultAction<ReplaceCardEaid> {
  readonly type = CardsListActionTypes.ReplaceCardEaidSuccess
  constructor(public triggerAction: ReplaceCardEaid, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Card EAID replaced successfully' }
}

export class ReplaceCardEaidFailure implements ResultAction<ReplaceCardEaid> {
  readonly type = CardsListActionTypes.ReplaceCardEaidFailure
  constructor(public triggerAction: ReplaceCardEaid, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to replace card EAID: ${getServerError(this.payload)}` }
}

export class AssignProgram implements TriggerAction {
  readonly type = CardsListActionTypes.AssignProgram
  constructor(public programId: string, public payload: unknown) { }
}

export class AssignProgramSuccess implements ResultAction<AssignProgram> {
  readonly type = CardsListActionTypes.AssignProgramSuccess
  constructor(public triggerAction: AssignProgram, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Program assigned to card successfully' }
}

export class AssignProgramFailure implements ResultAction<AssignProgram> {
  readonly type = CardsListActionTypes.AssignProgramFailure
  constructor(public triggerAction: AssignProgram, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to assign program to card: ${getServerError(this.payload)}` }
}

export class UnassignProgram implements TriggerAction {
  readonly type = CardsListActionTypes.UnassignProgram
  constructor(public programId: string, public cardEaid: string) { }
}

export class UnassignProgramSuccess implements ResultAction<UnassignProgram> {
  readonly type = CardsListActionTypes.UnassignProgramSuccess
  constructor(public triggerAction: UnassignProgram, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Program unassigned from card successfully' }
}

export class UnassignProgramFailure implements ResultAction<UnassignProgram> {
  readonly type = CardsListActionTypes.UnassignProgramFailure
  constructor(public triggerAction: UnassignProgram, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to unassign program from card: ${getServerError(this.payload)}` }
}

export class Reset implements TriggerAction {
  readonly type = CardsListActionTypes.Reset
}

export type CardsListActions =
  | GetCards
  | GetCardsFailure
  | GetCardsSuccess
  | ChangeCardStatus
  | ChangeCardStatusSuccess
  | ChangeCardStatusFailure
  | ReplaceCardEaid
  | ReplaceCardEaidSuccess
  | ReplaceCardEaidFailure
  | AssignProgram
  | AssignProgramSuccess
  | AssignProgramFailure
  | UnassignProgram
  | UnassignProgramSuccess
  | UnassignProgramFailure
  | Reset
