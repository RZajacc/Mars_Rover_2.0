// * REMOVE ALL CHILDREN OF SELECTED ELEMENT
export function removeAllChildNodes(parent: HTMLDivElement): void {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
