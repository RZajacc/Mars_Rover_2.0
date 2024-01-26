/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Cleaner from './ClearDynamicContent.js'
import { fetchExpanded } from '../content.js'
import type { responseRover } from '../types/fetchedTypes.js'

/**
 * Displays bootrap pagination on the bottom of the page. This option is used
 * when user selects a camera. In this case it's impossible to say how many
 * pages are available (without making big amount of requests to the the server).
 * Becayse of that logic and form of displaying pagination differs a bit from the
 * one without selected camera. Each time user changes a page to be displayed another
 * piece of data is fetched from the API
 * @param {HTMLDivElement} photoDiv Div where gallery is displayed, and which
 * has to be also cleaned from previous content before displaying new.
 * @param {responseRover} data Data fetched from the API for a given rover on
 * a given solar day.
 * @param {string} roverName Rover name selected by the user.
 * @param {string} selectedSolarDay Solar day selected by the user.
 * @param {string} camName Name of the camera that was selected by the user
 * @param {string} page Current page fethed from the API (page is a attribute
 * for a fetch)
 */
export function PaginationUncertainPAmount(
  photoDiv: HTMLDivElement,
  data: responseRover,
  roverName: string,
  selectedSolarDay: string,
  camName: string,
  page: string
): void {
  // * If requested page is empty then move to last working one (Pagination)
  if (data.photos.length === 0) {
    const targetPage = +page - 1
    Cleaner.removeAllChildNodes(photoDiv)
    fetchExpanded(roverName, selectedSolarDay, camName, targetPage.toString())
  }

  // * PAGINATION LOGIC FOR EACH POSSIBLE SCENARIO
  if (data.photos.length === 25 || +page != 1) {
    // ? Create navigation and Previous element tab
    const pagesDiv: HTMLDivElement = document.querySelector('#pages')!
    const paginationNav = document.createElement('nav')
    paginationNav.setAttribute('aria-label', 'pagination-nav')
    pagesDiv.appendChild(paginationNav)
    const paginationUl = document.createElement('ul')
    paginationUl.setAttribute('class', 'pagination justify-content-center')
    paginationNav.appendChild(paginationUl)

    // *Create a move to a FIRST PAGE element
    const firstLi = document.createElement('li')
    firstLi.setAttribute('class', 'page-item')
    const firstHref = document.createElement('a')
    firstHref.setAttribute('class', 'page-link')
    firstHref.setAttribute('href', '#')
    firstHref.textContent = 'First Page'
    firstLi.appendChild(firstHref)
    paginationUl.appendChild(firstLi)

    firstHref.addEventListener('click', () => {
      const targetPage = '1'
      Cleaner.removeAllChildNodes(photoDiv)
      fetchExpanded(roverName, selectedSolarDay, camName, targetPage)
    })

    // *Create a move to a PREVIOUS PAGE element
    const previousLi = document.createElement('li')
    previousLi.setAttribute('class', 'page-item')
    const previousHref = document.createElement('a')
    previousHref.setAttribute('class', 'page-link')
    previousHref.setAttribute('href', '#')
    previousHref.textContent = 'Previous'
    previousLi.appendChild(previousHref)
    paginationUl.appendChild(previousLi)

    previousHref.addEventListener('click', () => {
      if (+page > 1) {
        const targetPage = +page - 1
        Cleaner.removeAllChildNodes(photoDiv)
        fetchExpanded(
          roverName,
          selectedSolarDay,
          camName,
          targetPage.toString()
        )
      }
    })

    // * Create a CURRENT PAGE element
    const currentLi = document.createElement('li')
    currentLi.setAttribute('class', 'page-item')
    const currentHref = document.createElement('a')
    currentHref.setAttribute('class', 'page-link disabled')
    currentHref.setAttribute('href', '')
    currentHref.textContent = page
    currentLi.appendChild(currentHref)
    paginationUl.appendChild(currentLi)

    // *Create a move to NEXT element
    const nextLi = document.createElement('li')
    nextLi.setAttribute('class', 'page-item')
    const nextHref = document.createElement('a')
    nextHref.setAttribute('class', 'page-link')
    nextHref.setAttribute('href', '#')
    nextHref.textContent = 'Next Page'
    nextLi.appendChild(nextHref)
    paginationUl.appendChild(nextLi)

    nextHref.addEventListener('click', () => {
      const targetPage = +page + 1
      Cleaner.removeAllChildNodes(photoDiv)
      fetchExpanded(roverName, selectedSolarDay, camName, targetPage.toString())
    })
  }
}
