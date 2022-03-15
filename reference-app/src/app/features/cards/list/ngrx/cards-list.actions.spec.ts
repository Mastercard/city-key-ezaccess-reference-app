import {
  AssignProgramFailure,
  AssignProgramSuccess,
  ChangeCardStatusFailure,
  ChangeCardStatusSuccess,
  GetCardsFailure,
  ReplaceCardEaidFailure,
  ReplaceCardEaidSuccess,
  UnassignProgramFailure,
  UnassignProgramSuccess
} from './cards-list.actions'

describe('CardsListActions', () => {
  const triggerAction: any = {}

  it('success actions', () => {
    const payload: any = {}

    let action: any = new AssignProgramSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Program assigned to card successfully')

    action = new ChangeCardStatusSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Card status changed successfully')

    action = new ReplaceCardEaidSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Card EAID replaced successfully')

    action = new UnassignProgramSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Program unassigned from card successfully')
  })

  it('failure actions', () => {
    const Description = 'Description'
    const Details = 'Details'

    const payload = {
      error: {
        Errors: {
          Error: [
            { Description, Details }
          ]
        }
      }
    }

    let action: any = new AssignProgramFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to assign program to card: ${Description} - ${Details}`)

    action = new ChangeCardStatusFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to change card status: ${Description} - ${Details}`)

    action = new GetCardsFailure(triggerAction, payload)
    expect(action.noty).toEqual('Failed to retrieve cards')

    action = new ReplaceCardEaidFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to replace card EAID: ${Description} - ${Details}`)

    action = new UnassignProgramFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to unassign program from card: ${Description} - ${Details}`)
  })
})
