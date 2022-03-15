import {
  CreateEaidsFailure,
  CreateEaidsSuccess,
  RegisterCardsFailure,
  RegisterCardsSuccess
} from './cards-prepare.actions'

describe('CardsPrepareActions', () => {
  const triggerAction: any = {}

  it('success actions', () => {
    const payload: any = {}

    let action: any = new CreateEaidsSuccess(triggerAction, payload)
    expect(action.noty).toEqual('EAIDs created successfully')

    action = new RegisterCardsSuccess(triggerAction, payload)
    expect(action.noty).toEqual('Cards added successfully')
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

    let action: any = new CreateEaidsFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to create EAIDs: ${Description} - ${Details}`)

    action = new RegisterCardsFailure(triggerAction, payload)
    expect(action.noty).toEqual(`Failed to add cards: ${Description} - ${Details}`)
  })
})
