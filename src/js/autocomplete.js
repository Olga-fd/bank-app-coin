/* eslint-disable prettier/prettier */
import { el } from 'redom';
export function autocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener('input', function (e) {
    let val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    let div = el('.autocomplete-items', {id: this.id + 'autocomplete-list'});
    this.parentNode.appendChild(div);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length) == val) {
        // let anotherDiv = document.createElement('DIV');
        // anotherDiv.innerHTML = `<strong> ${arr[i].substr(0, val.length)}</strong>`;
        // anotherDiv.innerHTML += arr[i].substr(val.length);
        // anotherDiv.innerHTML += `<input type='hidden' value=${arr[i]}>`;
        let anotherDiv = el('div', [
          el('span', [
            el('strong', arr[i].substr(0, val.length))
          ], arr[i].substr(val.length)),
          el('input', {type: 'hidden', value: `${arr[i]}`}),
        ]);
        anotherDiv.addEventListener('click', function (e) {
          inp.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
        });
        div.appendChild(anotherDiv);
      }
    }
  });

  inp.addEventListener('keydown', function (e) {
    let x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });
}
