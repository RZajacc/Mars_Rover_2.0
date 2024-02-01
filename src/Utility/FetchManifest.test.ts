import { it, expect } from 'vitest'

import { fetchManifest } from './FetchManifest'

it('It should return data when correct rover name is provided', async () => {
  const roverName = 'curiosity'
  //   expect(2).toBe(2)
  expect(fetchManifest(roverName)).resolves.toBeDefined()
})
