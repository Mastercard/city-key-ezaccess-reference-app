import { CardsListState, CARDS_LIST_INITIAL_STATE } from 'app/features/cards/list/ngrx/cards-list.reducer'
import { CardsPrepareState, CARDS_PREPARE_INITIAL_STATE } from 'app/features/cards/prepare/ngrx/cards-prepare.reducer'
import { ProgramsDetailState, PROGRAMS_DETAIL_INITIAL_STATE } from 'app/features/programs/detail/ngrx/programs-detail.reducer'
import { ProgramsListState, PROGRAMS_LIST_INITIAL_STATE } from 'app/features/programs/list/ngrx/programs-list.reducer'
import { RootState, ROOT_INITIAL_STATE } from 'app/shared/ngrx/reducers'

export interface FeaturesState {
  cardsList: CardsListState
  cardsPrepare: CardsPrepareState
  programsList: ProgramsListState
  programsDetail: ProgramsDetailState
}

export type AllState = RootState & FeaturesState

export const ALL_INITIAL_STATE: AllState = {
  ...ROOT_INITIAL_STATE,
  cardsList: CARDS_LIST_INITIAL_STATE,
  cardsPrepare: CARDS_PREPARE_INITIAL_STATE,
  programsList: PROGRAMS_LIST_INITIAL_STATE,
  programsDetail: PROGRAMS_DETAIL_INITIAL_STATE
}
