import * as Cleaner from './ClearDynamicContent.js';
import { fetchBasic } from '../content.js';

export function PaginationFixedPages(
   photoDiv: HTMLDivElement,
   pagesDiv: HTMLDivElement,
   pagesCount: string,
   roverName: string,
   selectedSolarDay: string,
   page: string
) {
   // * Create a pagination if there are more pages than 1
   if (+pagesCount > 1) {
      //  *Create navigation and FIRST element tab
      // const pagesDiv = document.querySelector("#pages") as HTMLDivElement;
      const paginationNav = document.createElement('nav');
      paginationNav.setAttribute('aria-label', 'pagination-nav');
      pagesDiv.appendChild(paginationNav);
      const paginationUl = document.createElement('ul');
      paginationUl.setAttribute('class', 'pagination justify-content-center');
      paginationNav.appendChild(paginationUl);

      // *Create a move to a FIRST PAGE element
      const firstLi = document.createElement('li');
      firstLi.setAttribute('class', 'page-item');
      const firstHref = document.createElement('a');
      firstHref.setAttribute('class', 'page-link');
      firstHref.setAttribute('href', '#');
      firstHref.textContent = 'First page';
      firstLi.appendChild(firstHref);
      paginationUl.appendChild(firstLi);

      firstHref.addEventListener('click', () => {
         const targetPage = `1`;
         Cleaner.removeAllChildNodes(photoDiv);
         fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
      });

      // * PAGINATION LOGIC
      if (+page === 1 && +pagesCount >= 3) {
         for (let i = +page; i < +page + 3; i++) {
            const paginationLi = document.createElement('li');
            paginationLi.setAttribute('class', 'page-item');
            const paginationHref = document.createElement('a');
            if (i === +page) {
               paginationHref.setAttribute('class', 'page-link active');
            } else {
               paginationHref.setAttribute('class', 'page-link');
            }

            paginationHref.setAttribute('href', '#');
            paginationHref.textContent = i.toString();
            paginationLi.appendChild(paginationHref);
            paginationUl.appendChild(paginationLi);
            paginationHref.addEventListener('click', () => {
               const targetPage = paginationHref.textContent!;
               Cleaner.removeAllChildNodes(photoDiv);
               fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
            });
         }
      } else if (+page === 1 && +pagesCount <= 3) {
         for (let i = +page; i < +pagesCount + 1; i++) {
            const paginationLi = document.createElement('li');
            paginationLi.setAttribute('class', 'page-item');
            const paginationHref = document.createElement('a');
            if (i === +page) {
               paginationHref.setAttribute('class', 'page-link active');
            } else {
               paginationHref.setAttribute('class', 'page-link');
            }

            paginationHref.setAttribute('href', '#');
            paginationHref.textContent = i.toString();
            paginationLi.appendChild(paginationHref);
            paginationUl.appendChild(paginationLi);
            paginationHref.addEventListener('click', () => {
               const targetPage = paginationHref.textContent!;
               Cleaner.removeAllChildNodes(photoDiv);
               fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
            });
         }
      } else if (+page === +pagesCount && +pagesCount >= 3) {
         for (let i = +page - 2; i < +pagesCount + 1; i++) {
            const paginationLi = document.createElement('li');
            paginationLi.setAttribute('class', 'page-item');
            const paginationHref = document.createElement('a');
            if (i === +page) {
               paginationHref.setAttribute('class', 'page-link active');
            } else {
               paginationHref.setAttribute('class', 'page-link');
            }

            paginationHref.setAttribute('href', '#');
            paginationHref.textContent = i.toString();
            paginationLi.appendChild(paginationHref);
            paginationUl.appendChild(paginationLi);
            paginationHref.addEventListener('click', () => {
               const targetPage = paginationHref.textContent!;
               Cleaner.removeAllChildNodes(photoDiv);
               fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
            });
         }
      } else if (+page === +pagesCount && +pagesCount <= 3) {
         for (let i = +pagesCount - 1; i < +pagesCount + 1; i++) {
            const paginationLi = document.createElement('li');
            paginationLi.setAttribute('class', 'page-item');
            const paginationHref = document.createElement('a');
            if (i === +page) {
               paginationHref.setAttribute('class', 'page-link active');
            } else {
               paginationHref.setAttribute('class', 'page-link');
            }

            paginationHref.setAttribute('href', '#');
            paginationHref.textContent = i.toString();
            paginationLi.appendChild(paginationHref);
            paginationUl.appendChild(paginationLi);
            paginationHref.addEventListener('click', () => {
               const targetPage = paginationHref.textContent!;
               Cleaner.removeAllChildNodes(photoDiv);
               fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
            });
         }
      } else {
         for (let i = +page - 1; i < +page + 2; i++) {
            const paginationLi = document.createElement('li');
            paginationLi.setAttribute('class', 'page-item');
            const paginationHref = document.createElement('a');
            if (i === +page) {
               paginationHref.setAttribute('class', 'page-link active');
            } else {
               paginationHref.setAttribute('class', 'page-link');
            }

            paginationHref.setAttribute('href', '#');
            paginationHref.textContent = i.toString();
            paginationLi.appendChild(paginationHref);
            paginationUl.appendChild(paginationLi);
            paginationHref.addEventListener('click', () => {
               const targetPage = paginationHref.textContent!;
               Cleaner.removeAllChildNodes(photoDiv);
               fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
            });
         }
      }

      // *Create a move to LAST element
      const lastLi = document.createElement('li');
      lastLi.setAttribute('class', 'page-item');
      const lastHref = document.createElement('a');
      lastHref.setAttribute('class', 'page-link');
      lastHref.setAttribute('href', '#');
      lastHref.textContent = 'Last page';
      lastLi.appendChild(lastHref);
      paginationUl.appendChild(lastLi);

      lastHref.addEventListener('click', () => {
         const targetPage = pagesCount;
         Cleaner.removeAllChildNodes(photoDiv);
         fetchBasic(roverName, selectedSolarDay, pagesCount, targetPage);
      });
   }
}
