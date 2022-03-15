import { Action } from '@ngrx/store'
import { Constructor, ResultAction, TriggerAction } from 'ngx-mclabs-utils'

import { ResourceKeys } from 'app/shared/constants'

export const ResourceActionTypes = {
  GetProgramsRes: '[Resource] Get Programs Resource',
  GetProgramsResSuccess: '[Resource] Get Programs Resource Success',
  GetProgramsResFailure: '[Resource] Get Programs Resource Failure',
  Reset: '[Resource] Reset'
}

export class GetProgramsRes implements TriggerAction {
  readonly type = ResourceActionTypes.GetProgramsRes
}

export class GetProgramsResSuccess implements ResultAction<GetProgramsRes> {
  readonly type = ResourceActionTypes.GetProgramsResSuccess
  constructor(public triggerAction: GetProgramsRes, public payload: unknown) { }
}

export class GetProgramsResFailure implements ResultAction<GetProgramsRes> {
  readonly type = ResourceActionTypes.GetProgramsResFailure
  constructor(public triggerAction: GetProgramsRes, public payload: unknown) { }
}

export class Reset implements TriggerAction {
  readonly type = ResourceActionTypes.Reset
}

export type ResourceActions =
  | GetProgramsRes
  | GetProgramsResSuccess
  | GetProgramsResFailure
  | Reset

// NOTE: This is used for *resourceSelect directive only.
// Only for non-static resources that return items array.

export const RESOURCE_SELECT_TRIGGER_ACTION_MAP: { [k in ResourceKeys]: Constructor<Action> } = {
  [ResourceKeys.PROGRAMS]: GetProgramsRes
}
