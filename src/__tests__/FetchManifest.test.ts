import { it, expect, vi } from 'vitest'

import { fetchManifest } from '../Utility/FetchManifest'

const testResponseData = { testKey: 'testData' }

const testFetch = vi.fn((url) => {
  return new Promise((resolve, reject) => {
    const testResponse = {
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData)
        })
      }
    }
    resolve(testResponse)
  })
})

vi.stubGlobal('fetch', testFetch)

it('It should return data when correct rover name is provided', async () => {
  // const roverName = 'curiosity'
  // const testData = { key: 'test' }
  // return expect(fetchManifest(roverName)).resolves.toEqual(roverName)
  // expect(2).toBe(2)
  // expect(fetchManifest(roverName)).resolves.toBeDefined()
})
