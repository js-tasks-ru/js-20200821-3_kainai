export default class SortableTable {
  element;

  constructor(header = [], {data} = {}) {
    this.header = header;
    this.data = data;
    this.subElements = {};
    this.currentColumn = {
      field: '',
      order: '',
    };

    this.element = document.createElement('div');
    this.element.classList.add('sortable-table');
    this.render();
  }

  update(newData) {
    this.data = newData;
    this.render();
  }

  sort(field, order) {
    const sorted = this.sortData(field, order);
    this.currentColumn = {
      ...this.currentColumn,
      field,
      order,
    };
    this.update(sorted);
  }

  sortData(field, order) {
    const arr = this.data.slice();
    const { sortType } = this.header.find(item => item.id === field);
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'string':
        return direction * a[field].localeCompare(b[field], 'ru', { caseFirst: 'upper' });
      case 'number':
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  renderTemplate() {
    const headers = this.header.map(item => {
      const arrow = (item.sortable && item.id === this.currentColumn.field) ? this.currentColumn.order : '';

      return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="${arrow}">
        <span>${item.title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>
      </div>`;
    });

    const rows = this.data.map(item => {
      return (
        `<div class="sortable-table__row">
        ${this.header.map(({id, template}) => {
          if (id === 'images') {
            return template(item.images);
          } else {
            return `<div class=sortable-table__cell>${item[id]}</div>`;
          }
        }).join('')}
      </div>`
      );
    });

    return `<div data-element="header" class="sortable-table__header sortable-table__row">
                    ${headers.join('')}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${rows.join('')}
                </div>
            </div>`;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  render() {
    this.element.innerHTML = this.renderTemplate();
    this.subElements = this.getSubElements(this.element);
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
  }
}

