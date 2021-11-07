import { el, setChildren } from 'redom';
const addBtn = document.querySelector('.modal__btn--full');
let wrap = document.querySelector('.modal__wrap');
let count = 0;
let options = [
  { value: '0', label: 'Сортировка' },
  { value: '1', label: 'По номеру' },
  { value: '2', label: 'По балансу' },
  { value: '3', label: 'По последней транзакции' },
];

function createSelect() {
  const container = el('.modal__block-complex');
  const select = el('select.modal__select', { class: 'visually-hidden' });
  const input = el('input.input--border', { type: 'text' });

  for (let k = 0; k < options.length; k++) {
    let obj = options[k];
    let keys = Object.keys(options[k]);
    const option = el('option');
    for (let key of keys) {
      option.setAttribute(Object.keys(obj)[0], obj[keys[0]]);
      option.setAttribute(Object.keys(obj)[1], obj[keys[1]]);
      select.append(option);
    }
  }
  container.append(select);
  container.append(input);
  wrap.append(container);
}

// addBtns.forEach(addBtn => {
document
  .querySelector('.js-new .modal__btn--full')
  .addEventListener('click', transformSelect);
// });

function transformSelect(e) {
  e.preventDefault();
  if (wrap.classList.contains('hide')) {
    wrap.classList.remove('hide');
    document.querySelector('.modal__btn--full').style.paddingTop = '17px';
    document.querySelector('.modal__btn--full').style.paddingBottom = '17px';
  }

  createSelect();
  block = document.querySelectorAll('.modal__block-complex');
  // if (block.length === 3) {
  //   wrap.style.overflowY = 'scroll';
  //   wrap.style.maxHeight = '170px';
  // }
  if (block.length > 9) {
    console.log(addBtn);
    addBtn.setAttribute('disabled', 'disabled');
  }
  for (let i = count++; i < block.length; i++) {
    selElmnt = block[i].getElementsByTagName('select')[0];
    selectedItem = document.createElement('div');
    selectedItem.setAttribute('class', 'select-selected');
    selectedItem.setAttribute(
      'data-name',
      selElmnt.options[selElmnt.selectedIndex].value
    );
    selectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].label;
    block[i].append(selectedItem);

    optionList = document.createElement('div');
    optionList.setAttribute('class', 'select-items select-hide');

    for (let j = 0; j < selElmnt.length; j++) {
      optionItem = document.createElement('div');
      optionItem.innerHTML = selElmnt.options[j].label;
      optionItem.setAttribute('data-name', selElmnt.options[j].value);

      optionItem.addEventListener('click', function (e) {
        let i, selectGroup, selectedDiv;
        this.classList.toggle('select-hide');
        selectGroup =
          this.parentNode.parentNode.getElementsByTagName('select')[0];
        selectedDiv = this.parentNode.previousSibling;
        //console.log(selectedDiv);
        for (let i = 0; i < selectGroup.length; i++) {
          if (selectGroup.options[i].label == this.innerHTML) {
            selectGroup.selectedIndex = i;
            selectedDiv.innerHTML = this.innerHTML;
            selectedDiv.setAttribute('data-name', selectGroup.options[i].value);
            break;
          }
        }
        selectedDiv.click();
      });
      optionList.append(optionItem);
    }
    block[i].append(optionList);
  }

  selectedItem.addEventListener('click', function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
    if (!this.nextSibling.classList.contains('select-hide')) {
      let array = [];
      for (let i = 0; i < this.nextSibling.children.length; i++) {
        array[i] = this.nextSibling.children[i];
      }
      console.log(array);
      //let arr = Array.prototype.slice.call(this.nextSibling.children);
      let selItem = this.innerHTML;
      for (let i = 0; i < array.length; i++) {
        if (array[i].innerHTML === selItem) {
          array[i].setAttribute('class', 'select-hide');
        } else {
          array[i].removeAttribute('class');
        }
      }
    }
  });
}

function closeAllSelect(elmnt) {
  let items,
    selected,
    i,
    arr = [];
  items = document.getElementsByClassName('select-items');
  selected = document.getElementsByClassName('select-selected');
  for (let i = 0; i < selected.length; i++) {
    if (elmnt === selected[i]) {
      arr.push(i);
    } else {
      selected[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < items.length; i++) {
    if (arr.indexOf(i)) {
      items[i].classList.add('select-hide');
    }
  }
}

document.addEventListener('click', closeAllSelect);
