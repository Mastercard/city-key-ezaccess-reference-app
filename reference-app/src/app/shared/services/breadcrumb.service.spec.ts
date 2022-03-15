import { TestBed } from '@angular/core/testing'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

import { BreadcrumbService } from './breadcrumb.service'

class MockUrlSegment {
  constructor(public url: string) {}
  toString(): string { return this.url }
}

describe(BreadcrumbService.name, () => {
  const stubRouterStateSnapshot = {
    root: {
      url: ['issuers'],
      data: {
        breadcrumb: { label: 'Issuers' }
      },
      pathFromRoot: [
        { url: [new MockUrlSegment('issuers')] }
      ],

      firstChild: {
        url: ['ABCDEF'],
        data: {
          breadcrumb: { label: 'Issuer Details' }
        },
        pathFromRoot: [
          { url: [new MockUrlSegment('issuers')] },
          { url: [new MockUrlSegment('ABCDEF')] }
        ],

        firstChild: {
          url: ['cards', '123456'],
          data: {
            breadcrumb: { label: 'Card Details' }
          },
          pathFromRoot: [
            { url: [new MockUrlSegment('issuers')] },
            { url: [new MockUrlSegment('ABCDEF')] },
            { url: [new MockUrlSegment('cards'), new MockUrlSegment('123456')] }
          ],

          firstChild: {
            url: [],
            pathFromRoot: [
              { url: [new MockUrlSegment('issuers')] },
              { url: [new MockUrlSegment('ABCDEF')] },
              { url: [new MockUrlSegment('cards'), new MockUrlSegment('123456')] }
            ]
          }
        }
      }
    }
  }

  let stubEvents: BehaviorSubject<any>

  let providers
  let service: BreadcrumbService

  beforeEach(() => {
    stubEvents = new BehaviorSubject({})

    providers = [
      {
        provide: Router,
        useValue: {
          routerState: {
            snapshot: stubRouterStateSnapshot
          },
          events: stubEvents.asObservable()
        }
      },
      BreadcrumbService
    ]

    TestBed.configureTestingModule({ providers })
    service = TestBed.inject(BreadcrumbService)
  })

  it('should construct breadcrumbs', () => {
    expect(service.breadcrumbs).toEqual([])
    stubEvents.next(new NavigationEnd(1, 'url', 'newUrl'))
    expect(service.breadcrumbs).toEqual([
      { label: 'Issuers', path: 'issuers' },
      { label: 'Issuer Details', path: 'issuers/ABCDEF' },
      { label: 'Card Details', path: 'issuers/ABCDEF/cards/123456' }
    ])
  })
})
