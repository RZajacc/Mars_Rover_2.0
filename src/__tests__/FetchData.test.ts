import { expect, it, vi } from 'vitest'
import { fetchImages } from '../Utility/fetchData'

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

it('Should return any available response data', async () => {
  return expect(fetchImages('curiosity', '1', 'ALL', '1')).resolves.toEqual(
    testResponseData
  )
})
