import { expect, it, vi } from 'vitest'
import { fetchBasic } from '../Utility/fetchData'
import { fetchBasicType, utilFuncs } from '../types/utilTypes'

const testResponseData = { testKey: 'testData' }
const fetchMock = vi.fn((url: string) => {
  return new Promise((resolve, reject) => {
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData)
        })
      }
    }
    resolve(testResponse)
  })
})

vi.stubGlobal('fetch', fetchMock)

const basicArgs: fetchBasicType = {
  roverName: 'curiosity',
  selectedSolarDay: '1',
  pagesCount: '1',
  showAllPhotos: vi.fn()
}

const utilsMock: utilFuncs = {
  camSelectors: vi.fn(),
  cleanAllAfterSolDayInput: vi.fn(),
  cleanAllDynamicContent: vi.fn(),
  displayEmptyRoverErr: vi.fn(),
  displayGallery: vi.fn(),
  fetchBasic: vi.fn(),
  fetchExpanded: vi.fn(),
  paginationFixedPages: vi.fn(),
  paginationUncertainPCount: vi.fn(),
  removeAllChildNodes: vi.fn()
}

it('Should return any available response data', async () => {
  return expect(fetchBasic(basicArgs, '1', utilsMock)).resolves.toEqual(
    testResponseData
  )
})
