import { fireEvent } from '@testing-library/dom'

export function clickMatSelect(wrapperEl: HTMLElement, type: 'select' | 'autocomplete' = 'select'): void {
  fireEvent.click(wrapperEl.querySelector(`.mat-${type}-trigger`)!)
}

export function selectMatOptionByLabel(label: string): void {
  const options = document.querySelector('.cdk-overlay-container')?.querySelectorAll('mat-option')
  options?.forEach((option: any) => {
    if (option.innerText.trim() === label) {
      fireEvent.click(option)
    }
  })
}
