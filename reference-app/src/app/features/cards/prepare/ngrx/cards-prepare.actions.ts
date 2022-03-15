import { TriggerAction, ResultAction } from 'ngx-mclabs-utils'

import { getServerError } from 'app/shared/utils'
import { NotificationConfig } from 'app/shared/constants'

export const CardsPrepareActionTypes = {
  CreateEaids: '[Cards Prepare] Create Eaids',
  CreateEaidsSuccess: '[Cards Prepare] Create Eaids Success',
  CreateEaidsFailure: '[Cards Prepare] Create Eaids Failure',
  RegisterCards: '[Cards Prepare] Register Cards',
  RegisterCardsSuccess: '[Cards Prepare] Register Cards Success',
  RegisterCardsFailure: '[Cards Prepare] Register Cards Failure',
  Reset: '[Cards Prepare] Reset'
}

export class CreateEaids implements TriggerAction {
  readonly type = CardsPrepareActionTypes.CreateEaids
  constructor(public payload: unknown) { }
}

export class CreateEaidsSuccess implements ResultAction<CreateEaids> {
  readonly type = CardsPrepareActionTypes.CreateEaidsSuccess
  constructor(public triggerAction: CreateEaids, public payload: unknown) { }
  get noty(): NotificationConfig { return 'EAIDs created successfully' }
}

export class CreateEaidsFailure implements ResultAction<CreateEaids> {
  readonly type = CardsPrepareActionTypes.CreateEaidsFailure
  constructor(public triggerAction: CreateEaids, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to create EAIDs: ${getServerError(this.payload)}` }
}

export class RegisterCards implements TriggerAction {
  readonly type = CardsPrepareActionTypes.RegisterCards
  constructor(public payload: unknown) { }
}

export class RegisterCardsSuccess implements ResultAction<RegisterCards> {
  readonly type = CardsPrepareActionTypes.RegisterCardsSuccess
  constructor(public triggerAction: RegisterCards, public payload: unknown) { }
  get noty(): NotificationConfig { return 'Cards added successfully' }
}

export class RegisterCardsFailure implements ResultAction<RegisterCards> {
  readonly type = CardsPrepareActionTypes.RegisterCardsFailure
  constructor(public triggerAction: RegisterCards, public payload: unknown) { }
  get noty(): NotificationConfig { return `Failed to add cards: ${getServerError(this.payload)}` }
}

export class Reset implements TriggerAction {
  readonly type = CardsPrepareActionTypes.Reset
}

export type CardsPrepareActions =
  | CreateEaids
  | CreateEaidsFailure
  | CreateEaidsSuccess
  | RegisterCards
  | RegisterCardsSuccess
  | RegisterCardsFailure
  | Reset
