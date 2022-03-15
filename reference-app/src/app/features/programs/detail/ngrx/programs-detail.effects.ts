import { Injectable } from '@angular/core'
import { EffectFactory } from 'ngx-mclabs-utils'

import { ProgramsDetailService } from '../programs-detail.service'
import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  UnassignCard, UnassignCardSuccess, UnassignCardFailure,
  ProgramsDetailActionTypes
} from './programs-detail.actions'

@Injectable()
export class ProgramsDetailEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _programsDetailService: ProgramsDetailService
  ) { }

  getCards$ = this._effectFactory.createDispatch<GetCards, GetCardsSuccess, GetCardsFailure>({
    triggerActionType: ProgramsDetailActionTypes.GetCards,
    successActionConstructor: GetCardsSuccess,
    failureActionConstructor: GetCardsFailure,
    serviceCallback: action => this._programsDetailService.getCards(action.programId, action.payload)
  })

  unassignCard$ = this._effectFactory.createDispatch<UnassignCard, UnassignCardSuccess, UnassignCardFailure>({
    triggerActionType: ProgramsDetailActionTypes.UnassignCard,
    successActionConstructor: UnassignCardSuccess,
    failureActionConstructor: UnassignCardFailure,
    serviceCallback: action => this._programsDetailService.unassignCard(action.programId, action.cardEaid)
  })
}
