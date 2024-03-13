import fs from 'fs'
import path from 'path'

import { Window } from 'happy-dom'
import { beforeEach, expect, it, test, vi } from 'vitest'
import { displayGallery } from '../Utility/displayGallery'
import { responseRover } from '../types/dataTypes'

const htmlDocPath = path.join(process.cwd(), 'public', 'content.html')
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

const window = new Window()
const document = window.document

vi.stubGlobal('document', document)

// MOCK FUNCTIONS
const removeAllChildNodesMock = vi.fn()
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

beforeEach(() => {
  document.body.innerHTML = ''
  document.write(htmlDocumentContent)
  vi.clearAllMocks()
  displayGallery(data, removeAllChildNodesMock)
})

it('Should generate as many children divs (bootstrap cards) for provided element as there are photos in data', () => {
  
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement

  // There is only one photo in mock data so there can only be one child
  expect(cardsGallery.childNodes.length).toBe(1)
})

it('Should create a div with a bootstrap class col as a child to provided div element', () => {
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement
  
  // Get first element which is a bootstrap col
  const colElement = cardsGallery.firstChild as HTMLDivElement

  // Check if it contains col class
  expect(colElement.getAttribute('class')).toContain('col')
})

it('Should generate a cardBody element as a child of boostrap col with 3 child elements, card body (link), photoDesc (ul) and card footer (div)', () => {
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement
  
  // Get first element which is a bootstrap col
  const colElement = cardsGallery.firstChild as HTMLDivElement
  const cardBody = colElement.firstChild as HTMLDivElement

  // Expect cardBody to have 3 children
  expect(cardBody.childNodes.length).toBe(3)

  const tagNames: string[] = []

  // Extract children element tagNames
  cardBody.childNodes.forEach((el) => {
    const childNode = el as HTMLElement
    tagNames.push(childNode.tagName)
  })

  // Check if tagNames contain link element
  expect(tagNames).toContain('A')
  // Check if tagNames contain unordered list
  expect(tagNames).toContain('UL')
  // Check if tagNames contain div element
  expect(tagNames).toContain('DIV')
})

test('Anchor element in cardGroup should have a valid link matching the one in data, target set to blank and img element with image and earth date as alt value', () => {
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement
 
  // Get first element which is a bootstrap col
  const colElement = cardsGallery.firstChild as HTMLDivElement
  const cardBody = colElement.firstChild as HTMLDivElement
  // Get anchor element (first from the list since there is only one of that type)
  const anchorEl = cardBody.getElementsByTagName('A')[0]
  const imageURL = data.photos[0].img_src

  // Expect anchor element to have href matching fetched data
  expect(anchorEl.getAttribute('href')).toContain(imageURL)

  // Expect anchor element to have target set to blank
  expect(anchorEl.getAttribute('target')).toContain('_blank')

  // Expect it to have one child element with img
  expect(anchorEl.childNodes.length).toBe(1)

  // Get image element
  const imageEl = anchorEl.firstChild as HTMLImageElement

  // Expect image to contain same link to photo as anchor element
  expect(imageEl.getAttribute('src')).toContain(imageURL)

  const earthDate = data.photos[0].earth_date

  // Expect image to contain alt value containing earth date on a day picture was made
  expect(imageEl.getAttribute('alt')).toContain(earthDate)
})

test('PhotoDesc Ul element should contain 4 li containing rover name, solar day, photo id and camera name', () => {
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement
  
  // Get first element which is a bootstrap col
  const colElement = cardsGallery.firstChild as HTMLDivElement
  const cardBody = colElement.firstChild as HTMLDivElement
  // Get anchor element (first from the list since there is only one of that type)
  const listElement = cardBody.getElementsByTagName(
    'UL'
  )[0] as unknown as HTMLUListElement

  expect(listElement.childNodes.length).toBe(4)

  // Getting all child nodes into variable
  const listItems = listElement.childNodes as unknown as HTMLUListElement[]
  // Data to check
  const roverName = data.photos[0].rover.name
  const solDay = data.photos[0].sol
  const photoId = data.photos[0].id
  const camName = data.photos[0].camera.name

  // Since amount of li is fixed and so is the order of the data I will check one by one
  expect(listItems[0].innerHTML).toContain(roverName)
  expect(listItems[1].innerHTML).toContain(solDay)
  expect(listItems[2].innerHTML).toContain(photoId)
  expect(listItems[3].innerHTML).toContain(camName)
})

test('Card footer should have card-footer class and contain one child element containing earth date as innerHTML', () => {
  const cardsGallery = document.getElementById('galleryCards') as unknown as HTMLDivElement

  // Get first element which is a bootstrap col
  const colElement = cardsGallery.firstChild as HTMLDivElement
  const cardBody = colElement.firstChild as HTMLDivElement
  // Get anchor element (first from the list since there is only one of that type)
  const cardFooter = cardBody.getElementsByTagName(
    'DIV'
  )[0] as unknown as HTMLDivElement

  // Check if it contains card-footer class
  expect(cardFooter.getAttribute('class')).toContain('card-footer')

  // Check if it has just one child element
  expect(cardFooter.childNodes.length).toBe(1)

  // Data to check against element
  const earthDate = data.photos[0].earth_date

  // Get the child element
  const footerChild = cardFooter.firstChild as HTMLElement

  // Check if footer element holds the right value in innerHTML
  expect(footerChild.innerHTML).toContain(earthDate)
})
