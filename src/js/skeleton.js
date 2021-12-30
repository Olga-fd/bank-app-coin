import { el, setChildren } from 'redom';

export async function showTemplate() {
  const template = document.getElementById('template');
  const blockOfAccounts = document.querySelector('.main__block');
  for (let i = 0; i < 6; i++) {
    blockOfAccounts.append(template.content.cloneNode(true));
  }
}

export async function showSpecificTemplate(idTemplate, block = '.main__block') {
  const template = document.getElementById(idTemplate);
  const blockOfAccounts = document.querySelector(block);
  blockOfAccounts.append(template.content.cloneNode(true));
}

export function createTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template');
  template.innerHTML = `
    <div class="skeleton-card skeleton">
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-btn skeleton"></div>
    </div>
  `;

  // setChildren(template, { id: 'template' }, [
  //   el('.skeleton-card', { class: 'skeleton' }, [
  //     el('.skeleton-text', { class: 'skeleton' }),
  //     el('.skeleton-text', { class: 'skeleton' }),
  //     el('.skeleton-btn', { class: 'skeleton' }),
  //   ]),
  // ]);
  container.append(template);
}

export function createChartTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template1');
  template.innerHTML = `
    <div class="skeleton-wrap1 skeleton">
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-text skeleton"></div>
    </div>
    <div class="skeleton-wrap2 skeleton">
      <div class="skeleton-form skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-chart skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-table skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
    </div>
  `;
  container.append(template);
}

export function createHistoryTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template2');
  template.innerHTML = `
    <div class="skeleton-chart--size skeleton">
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-block skeleton"></div>
    </div>
    <div class="skeleton-chart--size skeleton">
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-block skeleton"></div>
    </div>
    <div class="skeleton-table skeleton">
      <div class="skeleton-text skeleton"></div>
      <div class="skeleton-block skeleton"></div>
    </div>
  `;
  container.append(template);
}

export function createCurrencyTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template3');
  template.innerHTML = `
    <div class="skeleton-wrap1 skeleton">
      <div class="skeleton-text skeleton"></div>
    </div>
    <div class="skeleton-wrap3 skeleton">
      <div class="skeleton-chart skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-form skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-table skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
    </div>
  `;
  container.append(template);
}

export function createBankTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template4');
  template.innerHTML = `
    <div class="skeleton-text --width skeleton"></div>
    <div class="skeleton-block skeleton"></div>
  `;
  container.append(template);
}

export function createChartReturnTemplate() {
  const template = document.createElement('template');
  const container = document.querySelector('main .container');
  template.setAttribute('id', 'template5');
  template.innerHTML = `
    <div class="skeleton-wrap2 skeleton">
      <div class="skeleton-form skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-chart skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
      <div class="skeleton-table skeleton">
        <div class="skeleton-text skeleton"></div>
        <div class="skeleton-block skeleton"></div>
      </div>
    </div>
  `;
  container.append(template);
}
