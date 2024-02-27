import fs from 'fs'
import path from 'path'

import { Window } from 'happy-dom'
import { beforeEach, expect, it, vi } from 'vitest'
import { displayGallery } from '../Utility/DisplayGallery'
import { responseRover } from '../types/fetchedTypes'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document

vi.stubGlobal('document', document)

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
})

// MOCK DATA
const data: responseRover = {
  photos: [
    {
      camera: {
        full_name: 'Front Hazard Avoidance Camera',
        id: 1,
        name: 'FHAZ',
        rover_id: 1
      },
      earth_date: '27-02-2024',
      id: 1,
      img_src: 'imageurl',
      rover: {
        cameras: [
          {
            full_name: 'Front Hazard Avoidance Camera',
            name: 'FHAZ'
          }
        ],
        id: 1,
        landing_date: '2012-08-05',
        launch_date: '2011-11-26',
        max_date: '2024-01-01',
        max_sol: 100,
        name: 'Curiosity',
        status: 'active',
        total_photos: 1
      },
      sol: 1
    }
  ]
}

it('Should generate as many children divs (bootstrap cards) for provided element as there are photos in data', () => {
  const cardGroup = document.createElement('div') as unknown as HTMLDivElement
  displayGallery(cardGroup, data)

  // There is only one photo in mock data so there can only be one child
  expect(cardGroup.childNodes.length).toBe(1)
})
