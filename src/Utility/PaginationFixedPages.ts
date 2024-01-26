/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Cleaner from './ClearDynamicContent'
import { fetchBasic } from '../content'

/**
 * Displays bootrap pagination on the bottom of the page. This option is used
 * when user does not select any camera and browse all the photos. Only then is
 * the total amount of pages countable. Therefore logic and form of displaying
 * pagination differs a bit from the one with selected camera. Each time user
 * changes a page to be displayed another piece of data is fetched from the API
 * @param {HTMLDivElement} photoDiv Div where gallery is displayed, and which
 * has to be also cleaned from previous content before displaying new.
 * @param {HTMLDivElement} pagesDiv Div serving as placeholder for a pagination
 * to be displayed, and updated in.
 * @param {string} pagesCount Calculated amount of pages that are available to
 * display
 * @param {string} roverName Rover name selected by the user.
 * @param {string} selectedSolarDay Solar day selected by the user.
 * @param {string} page Current page fethed from the API (page is a attribute
 * for a fetch)
 */
export function PaginationFixedPages(
  photoDiv: HTMLDivElement,
  pagesDiv: HTMLDivElement,
  pagesCount: string,
  roverName: string,
  selectedSolarDay: string,
  page: string
): void {
  // * Create a pagination if there are more pages than 1
  if (+pagesCount > 1) {
    //  *Create navigation and FIRST element tab
    // const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
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
    firstHref.textContent = 'First page'
    firstLi.appendChild(firstHref)
    paginationUl.appendChild(firstLi)

    firstHref.addEventListener('click', () => {
      const targetPage = '1'
      Cleaner.removeAllChildNodes(photoDiv)
      fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
    })

    // * PAGINATION LOGIC DEPENDING ON SEVERAL POSSIBLE SCENARIOS
    if (+page === 1 && +pagesCount >= 3) {
      for (let i = +page; i < +page + 3; i++) {
        const paginationLi = document.createElement('li')
        paginationLi.setAttribute('class', 'page-item')
        const paginationHref = document.createElement('a')
        if (i === +page) {
          paginationHref.setAttribute('class', 'page-link active')
        } else {
          paginationHref.setAttribute('class', 'page-link')
        }

        paginationHref.setAttribute('href', '#')
        paginationHref.textContent = i.toString()
        paginationLi.appendChild(paginationHref)
        paginationUl.appendChild(paginationLi)
        paginationHref.addEventListener('click', () => {
          const targetPage = paginationHref.textContent!
          Cleaner.removeAllChildNodes(photoDiv)
          fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
        })
      }
    } else if (+page === 1 && +pagesCount <= 3) {
      for (let i = +page; i < +pagesCount + 1; i++) {
        const paginationLi = document.createElement('li')
        paginationLi.setAttribute('class', 'page-item')
        const paginationHref = document.createElement('a')
        if (i === +page) {
          paginationHref.setAttribute('class', 'page-link active')
        } else {
          paginationHref.setAttribute('class', 'page-link')
        }

        paginationHref.setAttribute('href', '#')
        paginationHref.textContent = i.toString()
        paginationLi.appendChild(paginationHref)
        paginationUl.appendChild(paginationLi)
        paginationHref.addEventListener('click', () => {
          const targetPage = paginationHref.textContent!
          Cleaner.removeAllChildNodes(photoDiv)
          fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
        })
      }
    } else if (+page === +pagesCount && +pagesCount >= 3) {
      for (let i = +page - 2; i < +pagesCount + 1; i++) {
        const paginationLi = document.createElement('li')
        paginationLi.setAttribute('class', 'page-item')
        const paginationHref = document.createElement('a')
        if (i === +page) {
          paginationHref.setAttribute('class', 'page-link active')
        } else {
          paginationHref.setAttribute('class', 'page-link')
        }

        paginationHref.setAttribute('href', '#')
        paginationHref.textContent = i.toString()
        paginationLi.appendChild(paginationHref)
        paginationUl.appendChild(paginationLi)
        paginationHref.addEventListener('click', () => {
          const targetPage = paginationHref.textContent!
          Cleaner.removeAllChildNodes(photoDiv)
          fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
        })
      }
    } else if (+page === +pagesCount && +pagesCount <= 3) {
      for (let i = +pagesCount - 1; i < +pagesCount + 1; i++) {
        const paginationLi = document.createElement('li')
        paginationLi.setAttribute('class', 'page-item')
        const paginationHref = document.createElement('a')
        if (i === +page) {
          paginationHref.setAttribute('class', 'page-link active')
        } else {
          paginationHref.setAttribute('class', 'page-link')
        }

        paginationHref.setAttribute('href', '#')
        paginationHref.textContent = i.toString()
        paginationLi.appendChild(paginationHref)
        paginationUl.appendChild(paginationLi)
        paginationHref.addEventListener('click', () => {
          const targetPage = paginationHref.textContent!
          Cleaner.removeAllChildNodes(photoDiv)
          fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
        })
      }
    } else {
      for (let i = +page - 1; i < +page + 2; i++) {
        const paginationLi = document.createElement('li')
        paginationLi.setAttribute('class', 'page-item')
        const paginationHref = document.createElement('a')
        if (i === +page) {
          paginationHref.setAttribute('class', 'page-link active')
        } else {
          paginationHref.setAttribute('class', 'page-link')
        }

        paginationHref.setAttribute('href', '#')
        paginationHref.textContent = i.toString()
        paginationLi.appendChild(paginationHref)
        paginationUl.appendChild(paginationLi)
        paginationHref.addEventListener('click', () => {
          const targetPage = paginationHref.textContent!
          Cleaner.removeAllChildNodes(photoDiv)
          fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
        })
      }
    }

    // *Create a move to LAST element
    const lastLi = document.createElement('li')
    lastLi.setAttribute('class', 'page-item')
    const lastHref = document.createElement('a')
    lastHref.setAttribute('class', 'page-link')
    lastHref.setAttribute('href', '#')
    lastHref.textContent = 'Last page'
    lastLi.appendChild(lastHref)
    paginationUl.appendChild(lastLi)

    lastHref.addEventListener('click', () => {
      const targetPage = pagesCount
      Cleaner.removeAllChildNodes(photoDiv)
      fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage)
    })
  }
}
