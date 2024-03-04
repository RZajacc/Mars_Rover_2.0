import fs from 'fs'
import path from 'path'

import { Window } from 'happy-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchBasic } from '../content'

const testResponseData = { testKey: 'testData' }

const testFetch = vi.fn((url) => {
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

vi.stubGlobal('fetch', testFetch)
vi.stubGlobal('roverSelect', vi.fn())

describe('fetchBasic()', () => {
  it('Should return any available response data', () => {
    return expect(
      fetchBasic({
        roverName: 'Curiosity',
        selectedSolarDay: '1',
        pagesCount: '1'
      })
    ).resolves.toEqual(testResponseData)
  })
})
