import type { responseRover } from '../types/dataTypes'

/**
 * Displays a photo gallery after all necessary options before are provided
 * (like rover, and solar day, optionally also selected camera). Gallery uses
 * bootstrap card group.
 * @param {HTMLDivElement} cardGroup Div element with bootrap classes defining
 * parameters of a card group.
 * @param {responseRover} data Data fetched from the API
 */
export function displayGallery(data: responseRover, removeAllChildNodes: (parent: HTMLElement) => void): void {
  // * Get the gallery div and clean it from existing content
  const photoDiv = document.getElementById('photo-gallery') as HTMLDivElement
  removeAllChildNodes(photoDiv)
  const pagesDiv = document.getElementById('pages') as HTMLDivElement
  removeAllChildNodes(pagesDiv)

  // *Create a div containing cards group
  const cardGroup = document.createElement('div')
  cardGroup.setAttribute('id', 'galleryCards')
  cardGroup.setAttribute('class', 'row row-cols-1 row-cols-md-2 g-3')
  photoDiv.appendChild(cardGroup)

  // *Loop through requested data
  data.photos.forEach((element) => {
    const colCard = document.createElement('div')
    colCard.setAttribute('class', 'col')
    cardGroup.appendChild(colCard)

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card h-100')
    colCard.appendChild(cardBody)

    // *Create card body elements
    const photoRef = document.createElement('a')
    photoRef.setAttribute('href', element.img_src)
    photoRef.setAttribute('target', '_blank')
    cardBody.append(photoRef)
    const cardPhoto = document.createElement('img')
    cardPhoto.setAttribute('class', 'card-img-top')
    cardPhoto.setAttribute('src', element.img_src)
    cardPhoto.setAttribute('alt', 'Made on: ' + element.earth_date)
    photoRef.appendChild(cardPhoto)

    const photoDesc = document.createElement('ul')
    photoDesc.setAttribute('class', 'list-group list-group-flush')
    cardBody.appendChild(photoDesc)

    const roverLi = document.createElement('li')
    roverLi.setAttribute('class', 'list-group-item')
    roverLi.innerHTML = '<strong>Rover : </strong>' + element.rover.name
    photoDesc.appendChild(roverLi)

    const solLi = document.createElement('li')
    solLi.setAttribute('class', 'list-group-item')
    solLi.innerHTML = '<strong>Solar day : </strong>' + element.sol
    photoDesc.appendChild(solLi)

    const idLi = document.createElement('li')
    idLi.setAttribute('class', 'list-group-item')
    idLi.innerHTML = '<strong>Photo ID : </strong>' + element.id
    photoDesc.appendChild(idLi)

    const camLi = document.createElement('li')
    camLi.setAttribute('class', 'list-group-item')
    camLi.innerHTML = '<strong>Camera : </strong>' + element.camera.name
    photoDesc.appendChild(camLi)

    // *Create a card footer
    const cardFooter = document.createElement('div')
    cardFooter.setAttribute('class', 'card-footer')
    const footerContent = document.createElement('small')
    footerContent.setAttribute('class', 'text-body-secondary')
    footerContent.innerHTML = 'Earth date : ' + element.earth_date
    cardBody.appendChild(cardFooter)
    cardFooter.appendChild(footerContent)
  })
}
