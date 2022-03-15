import { CardStatusType, PROGRAM_ID } from 'app/shared/constants'

export const MOCK_PROGRAMS = {
  items: Array(50).fill(0).map((_, id) => ({
    id: `${id}`,
    name: `Program${id}`,
    description: `Program ${id} description`
  })),
  total: 100
}

export const MOCK_CARDS = {
  items: Array(50).fill(0).map((_, id) => ({
    id: `${id}`,
    eaid: `EA${id}`,
    last4Digits: '0000',
    programIds: [PROGRAM_ID],
    status: Object.values(CardStatusType)[id % Object.values(CardStatusType).length]
  })),
  total: 100
}

export const MOCK_EAIDS = {
  eaids: Array(100).fill(0).map((_, id) => `${id}`)
}
