import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { Nullable } from 'ngx-mclabs-utils'

export type Breadcrumb = { label: string, path: string }

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([])
  get breadcrumbs(): Breadcrumb[] { return this._breadcrumbs$.value }
  private set _breadcrumbs(value: Breadcrumb[]) { this._breadcrumbs$.next(value) }

  constructor(
    private _router: Router
  ) {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        const breadcrumbs: Breadcrumb[] = []
        this._constructBreadcrumbs(this._router.routerState.snapshot.root, breadcrumbs)
        this._breadcrumbs = breadcrumbs
      })
  }

  private _constructBreadcrumbs(route: Nullable<ActivatedRouteSnapshot>, breadcrumbs: Breadcrumb[]): void {
    if (route) {
      if (route.data?.breadcrumb && route.url.length) {
        breadcrumbs.push({
          label: route.data.breadcrumb.label,
          path: this._constructPath(route)
        })
      }
      this._constructBreadcrumbs(route.firstChild, breadcrumbs)
    }
  }

  private _constructPath(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/')
  }
}
