import { TriggerAction, ResultAction } from 'ngx-mclabs-utils'

import { NotificationConfig } from 'app/shared/constants'

export const ProgramsListActionTypes = {
  GetPrograms: '[Programs List] Get Programs',
  GetProgramsSuccess: '[Programs List] Get Programs Success',
  GetProgramsFailure: '[Programs List] Get Programs Failure',
  Reset: '[Programs List] Reset'
}

export class GetPrograms implements TriggerAction {
  readonly type = ProgramsListActionTypes.GetPrograms
  constructor(public payload?: unknown) { }
}

export class GetProgramsSuccess implements ResultAction<GetPrograms> {
  readonly type = ProgramsListActionTypes.GetProgramsSuccess
  constructor(public triggerAction: GetPrograms, public payload: unknown) { }
}

export class GetProgramsFailure implements ResultAction<GetPrograms> {
  readonly type = ProgramsListActionTypes.GetProgramsFailure
  get noty(): NotificationConfig { return 'Failed to retrieve programs' }
  constructor(public triggerAction: GetPrograms, public payload: unknown) { }
}

export class Reset implements TriggerAction {
  readonly type = ProgramsListActionTypes.Reset
}

export type ProgramsListActions =
  | GetPrograms
  | GetProgramsSuccess
  | GetProgramsFailure
  | Reset
