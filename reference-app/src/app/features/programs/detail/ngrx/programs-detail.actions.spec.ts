import {
  GetCardsFailure,
  UnassignCardFailure,
  UnassignCardSuccess
} from './programs-detail.actions'

describe('ProgramsDetailActions', () => {
  const triggerAction: any = {}

  it('success actions', () => {
    const payload: any = {}

    const action = new UnassignCardSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Card unassigned from program successfully')
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

    let action: any = new GetCardsFailure(triggerAction, payload)
    expect(action.noty).toEqual('Failed to retrieve cards for this program')

    action = new UnassignCardFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to unassign card from this program: ${Description} - ${Details}`)
  })
})
