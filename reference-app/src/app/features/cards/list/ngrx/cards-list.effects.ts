import { Injectable } from '@angular/core'
import { EffectFactory } from 'ngx-mclabs-utils'

import { CardsListService } from '../cards-list.service'
import {
  GetCards, GetCardsSuccess, GetCardsFailure,
  ChangeCardStatus, ChangeCardStatusSuccess, ChangeCardStatusFailure,
  ReplaceCardEaid, ReplaceCardEaidSuccess, ReplaceCardEaidFailure,
  AssignProgram, AssignProgramSuccess, AssignProgramFailure,
  UnassignProgram, UnassignProgramSuccess, UnassignProgramFailure,
  CardsListActionTypes
} from './cards-list.actions'

@Injectable()
export class CardsListEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _cardsListService: CardsListService
  ) { }

  getCards$ = this._effectFactory.createDispatch<GetCards, GetCardsSuccess, GetCardsFailure>({
    triggerActionType: CardsListActionTypes.GetCards,
    successActionConstructor: GetCardsSuccess,
    failureActionConstructor: GetCardsFailure,
    serviceCallback: action => this._cardsListService.getCards(action.payload)
  })

  changeCardStatus$ = this._effectFactory.createDispatch<ChangeCardStatus, ChangeCardStatusSuccess, ChangeCardStatusFailure>({
    triggerActionType: CardsListActionTypes.ChangeCardStatus,
    successActionConstructor: ChangeCardStatusSuccess,
    failureActionConstructor: ChangeCardStatusFailure,
    serviceCallback: action => this._cardsListService.changeCardStatus(action.cardEaid, action.payload)
  })

  replaceCardEaid$ = this._effectFactory.createDispatch<ReplaceCardEaid, ReplaceCardEaidSuccess, ReplaceCardEaidFailure>({
    triggerActionType: CardsListActionTypes.ReplaceCardEaid,
    successActionConstructor: ReplaceCardEaidSuccess,
    failureActionConstructor: ReplaceCardEaidFailure,
    serviceCallback: action => this._cardsListService.replaceCardEaid(action.cardEaid, action.payload)
  })

  assignProgram$ = this._effectFactory.createDispatch<AssignProgram, AssignProgramSuccess, AssignProgramFailure>({
    triggerActionType: CardsListActionTypes.AssignProgram,
    successActionConstructor: AssignProgramSuccess,
    failureActionConstructor: AssignProgramFailure,
    serviceCallback: action => this._cardsListService.assignProgram(action.programId, action.payload)
  })

  unassignProgram$ = this._effectFactory.createDispatch<UnassignProgram, UnassignProgramSuccess, UnassignProgramFailure>({
    triggerActionType: CardsListActionTypes.UnassignProgram,
    successActionConstructor: UnassignProgramSuccess,
    failureActionConstructor: UnassignProgramFailure,
    serviceCallback: action => this._cardsListService.unassignProgram(action.programId, action.cardEaid)
  })
}
