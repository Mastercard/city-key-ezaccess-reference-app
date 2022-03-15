import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { map } from 'rxjs/operators'
import get from 'lodash-es/get'
import { getSpringDataItems, Nullable } from 'ngx-mclabs-utils'

import { RootState } from 'app/shared/ngrx/reducers'
import { RESOURCE_SELECT_TRIGGER_ACTION_MAP } from 'app/shared/ngrx/resource/resource.actions'
import { ResourceKeys } from 'app/shared/constants'

type ResourceKeyType = string
type TransformFnType = (data: unknown) => unknown[]

@UntilDestroy()
@Directive({
  selector: '[resourceSelect]'
})
export class ResourceSelectDirective {
  @Input()
  itemsKey = 'items'

  @Input()
  set resourceSelect(value: ResourceKeyType | [ResourceKeyType, TransformFnType]) {
    let resourceKey: ResourceKeyType
    let transformFn: Nullable<TransformFnType>

    if (typeof value === 'string') {
      resourceKey = value
    } else {
      resourceKey = value[0] as ResourceKeyType
      transformFn = value[1] as TransformFnType
    }

    const resourceKeyArr = resourceKey.split('.') as [ResourceKeys, ...string[]]

    // NOTE: subResourceKey is for multi-level resources only (rarely used such as Locations)
    const [mainResourceKey, ...subResourceKey] = resourceKeyArr

    // Only fetch resources from server if key is valid (non-static resources only)
    if (RESOURCE_SELECT_TRIGGER_ACTION_MAP[mainResourceKey]) {
      this._store.dispatch(new RESOURCE_SELECT_TRIGGER_ACTION_MAP[mainResourceKey](...subResourceKey))
    } else {
      console.warn(
        `Update RESOURCE_SELECT_TRIGGER_ACTION_MAP for *resourceSelect to work with ${resourceKey}, ` +
        'if it\'s a non-static resource.')
    }

    this._vcRef.clear()
    this._vcRef.createEmbeddedView(this._templateRef, {
      $implicit: this._store
        .select(s => get(s, ['resource', ...resourceKeyArr, 'data']))
        .pipe(
          transformFn ? map(transformFn) : getSpringDataItems({ itemsKey: this.itemsKey }),
          untilDestroyed(this)
        ),
      isLoading$: this._store
        .select(s => get(s, ['resource', ...resourceKeyArr, 'isProcessing']))
        .pipe(untilDestroyed(this))
    })
  }

  constructor(
    private _vcRef: ViewContainerRef,
    private _templateRef: TemplateRef<unknown>,
    private _store: Store<RootState>
  ) { }
}
