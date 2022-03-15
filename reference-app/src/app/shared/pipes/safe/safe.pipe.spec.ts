import { DomSanitizer } from '@angular/platform-browser'

import { SafePipe } from './safe.pipe'

describe('SafePipe', () => {
  const str = 'asasad'

  let domSanitizerMock: DomSanitizer

  beforeAll(() => {
    domSanitizerMock = {
      sanitize() { return null },
      bypassSecurityTrustHtml: (value: any) => value.toString(),
      bypassSecurityTrustStyle: (value: any) => value.toString(),
      bypassSecurityTrustScript: (value: any) => value.toString(),
      bypassSecurityTrustUrl: (value: any) => value.toString(),
      bypassSecurityTrustResourceUrl: (value: any) => value.toString()
    }
  })

  it('create an instance', () => {
    const pipe = new SafePipe(domSanitizerMock)
    expect(pipe).toBeTruthy()
  })

  it('it should sanitize html', () => {
    const pipe = new SafePipe(domSanitizerMock)
    const result = pipe.transform(str, 'html')
    expect(result).toBeTruthy()
  })

  it('it should sanitize style', () => {
    const pipe = new SafePipe(domSanitizerMock)
    const result = pipe.transform(str, 'style')
    expect(result).toBeTruthy()
  })

  it('it should sanitize script', () => {
    const pipe = new SafePipe(domSanitizerMock)
    const result = pipe.transform(str, 'script')
    expect(result).toBeTruthy()
  })

  it('it should sanitize url', () => {
    const pipe = new SafePipe(domSanitizerMock)
    const result = pipe.transform(str, 'url')
    expect(result).toBeTruthy()
  })

  it('it should sanitize resourceUrl', () => {
    const pipe = new SafePipe(domSanitizerMock)
    const result = pipe.transform(str, 'resourceUrl')
    expect(result).toBeTruthy()
  })
})
