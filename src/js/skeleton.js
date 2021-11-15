export function showTemplate() {
  const mainBlock = document.querySelector('.main .container');
  const template = document.getElementById('template');
  for (let i = 0; i < 10; i++) {
    mainBlock.append(template.content.cloneNode(true));
  }
}

export function createSkeleton(template, mainBlock, mainWrap, blockOfAccounts) {
  const title = el('h2.main__title', { class: 'skeleton' });
  const selectSort = el('select.main__select', { class: 'skeleton' });
  const btnCreate = el('button.btn', { class: 'skeleton' });
  setChildren(mainWrap, [title, selectSort, btnCreate]);
  setChildren(mainBlock, [mainWrap, blockOfAccounts]);
  setChildren(template, mainBlock);
}
