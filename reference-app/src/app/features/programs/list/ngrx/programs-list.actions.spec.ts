import {
  GetProgramsFailure
} from './programs-list.actions'

describe('ProgramsListActions', () => {
  const triggerAction: any = {}

  it('failure actions', () => {
    const message = 'message'

    const payload = {
      error: {
        errorDetails: [
          { message }
        ]
      }
    }

    const action = new GetProgramsFailure(triggerAction, payload)
    expect(action.noty).toEqual('Failed to retrieve programs')
  })
})
