export function drag(elem, area) {
  let dragSrcEl = null;
  const form = document.querySelector('form');
  const privateAccounts = document.querySelector(elem);
  const items = [privateAccounts, form];

  function handleDragStart(e) {
    this.style.opacity = '0';
    dragSrcEl = this;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter() {
    this.classList.add('over');
  }

  function handleDragLeave() {
    this.classList.remove('over');
  }

  function handleDrop() {
    this.classList.remove('over');
    if (dragSrcEl == privateAccounts) {
      if (dragSrcEl.classList.contains('area-form')) {
        dragSrcEl.classList.remove('area-form');
        this.classList.remove(area);
      } else {
        dragSrcEl.classList.add('area-form');
        this.classList.add(area);
      }
    } else if (dragSrcEl == form) {
      if (dragSrcEl.classList.contains(area)) {
        dragSrcEl.classList.remove(area);
        this.classList.remove('area-form');
      } else {
        this.classList.add('area-form');
        dragSrcEl.classList.add(area);
      }
    }
  }

  function handleDragEnd() {
    this.style.opacity = '1';
  }

  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
}
