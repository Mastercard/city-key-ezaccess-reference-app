import { Injectable } from '@angular/core'
import { EffectFactory } from 'ngx-mclabs-utils'

import { CardsPrepareService } from '../cards-prepare.service'
import {
  CreateEaids, CreateEaidsSuccess, CreateEaidsFailure,
  RegisterCards, RegisterCardsSuccess, RegisterCardsFailure,
  CardsPrepareActionTypes
} from './cards-prepare.actions'

@Injectable()
export class CardsPrepareEffects {
  constructor(
    private _effectFactory: EffectFactory,
    private _cardsPrepareService: CardsPrepareService
  ) { }

  createEaids$ = this._effectFactory.createDispatch<CreateEaids, CreateEaidsSuccess, CreateEaidsFailure>({
    triggerActionType: CardsPrepareActionTypes.CreateEaids,
    successActionConstructor: CreateEaidsSuccess,
    failureActionConstructor: CreateEaidsFailure,
    serviceCallback: action => this._cardsPrepareService.createEaids(action.payload)
  })

  registerCards$ = this._effectFactory.createDispatch<RegisterCards, RegisterCardsSuccess, RegisterCardsFailure>({
    triggerActionType: CardsPrepareActionTypes.RegisterCards,
    successActionConstructor: RegisterCardsSuccess,
    failureActionConstructor: RegisterCardsFailure,
    serviceCallback: action => this._cardsPrepareService.registerCards(action.payload),
    isSimultaneous: true
  })
}
