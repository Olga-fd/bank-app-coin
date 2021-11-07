export function createSelect() {
  /* Look for any elements with the class "custom-select": */
  const block = document.getElementsByClassName('custom-select');
  for (let i = 0; i < block.length; i++) {
    const selElmnt = block[i].getElementsByTagName('select')[0];

    /* For each element, create a new DIV that will act as the selected item: */
    const selected = document.createElement('div');
    selected.setAttribute('class', 'select-selected');
    selected.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    block[i].appendChild(selected);

    /* For each element, create a new DIV that will contain the option list: */
    const blockItems = document.createElement('div');
    blockItems.setAttribute('class', 'select-items select-hide');
    for (let j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      const optionName = document.createElement('div');
      optionName.innerHTML = selElmnt.options[j].innerHTML;
      optionName.addEventListener('click', function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const select =
          this.parentNode.parentNode.getElementsByTagName('select')[0];

        const prevSibl = this.parentNode.previousSibling;
        for (let i = 0; i < select.length; i++) {
          if (select.options[i].innerHTML == this.innerHTML) {
            select.selectedIndex = i;
            prevSibl.innerHTML = this.innerHTML;
            const sameSel =
              this.parentNode.getElementsByClassName('same-as-selected');

            for (let k = 0; k < sameSel.length; k++) {
              sameSel[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        prevSibl.click();
      });
      blockItems.appendChild(optionName);
    }
    block[i].appendChild(blockItems);
    selected.addEventListener('click', function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  }
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  const arrNo = [];
  const selectItems = document.getElementsByClassName('select-items');
  const selSelected = document.getElementsByClassName('select-selected');

  for (let i = 0; i < selSelected.length; i++) {
    if (elmnt == selSelected[i]) {
      arrNo.push(i);
    } else {
      selSelected[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < selectItems.length; i++) {
    if (arrNo.indexOf(i)) {
      selectItems[i].classList.add('select-hide');
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);
