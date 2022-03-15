import { Injectable } from '@angular/core'
import { EffectFactory } from 'ngx-mclabs-utils'

import { ProgramsListService } from '../programs-list.service'
import {
  GetPrograms, GetProgramsSuccess, GetProgramsFailure,
  ProgramsListActionTypes
} from './programs-list.actions'

@Injectable()
export class ProgramsListEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _programsListService: ProgramsListService
  ) { }

  getPrograms$ = this._effectFactory.createDispatch<GetPrograms, GetProgramsSuccess, GetProgramsFailure>({
    triggerActionType: ProgramsListActionTypes.GetPrograms,
    successActionConstructor: GetProgramsSuccess,
    failureActionConstructor: GetProgramsFailure,
    serviceCallback: action => this._programsListService.getPrograms(action.payload)
  })
}
