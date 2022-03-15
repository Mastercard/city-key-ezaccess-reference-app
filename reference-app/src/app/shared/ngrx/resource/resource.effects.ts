import { Injectable } from '@angular/core'
import { EffectFactory } from 'ngx-mclabs-utils'

import { ResourceService } from 'app/shared/services/resource.service'

import {
  GetProgramsRes, GetProgramsResSuccess, GetProgramsResFailure,
  ResourceActionTypes
} from './resource.actions'

@Injectable()
export class ResourceEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _resourceService: ResourceService
  ) { }

  getProgramsRes$ = this._effectFactory.createDispatch<GetProgramsRes, GetProgramsResSuccess, GetProgramsResFailure>({
    triggerActionType: ResourceActionTypes.GetProgramsRes,
    successActionConstructor: GetProgramsResSuccess,
    failureActionConstructor: GetProgramsResFailure,
    serviceCallback: () => this._resourceService.getProgramsRes()
  })
}
