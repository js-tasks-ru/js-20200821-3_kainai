export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({data = [], value = 0, label = '', link = ''} = {}) {
    this.data = data;
    this.value = value;
    this.label = label;
    this.link = link;
    this.render();
  }

  getChart(data) {
    const max = Math.max(...data);
    const idx = this.chartHeight / max;

    return data
      .map(item => {
        const level = Math.floor(item * idx);
        const percent = Math.round(item / max * 100);

        return `<div style="--value: ${level}" data-tooltip="${percent}%"></div>`;
      }).join('');
  }

  getLink(link) {
    return `<a href="${link}" class="column-chart__link">View all</a>`;
  }

  isDataLoaded(data) {
    return data.length;
  }

  update(data) {
    if (!this.isDataLoaded) {
      this.element.classList.add('column-chart_loading');
    } else {
      this.element.classList.remove('column-chart_loading');
    }

    this.element.querySelector('.column-chart__chart').innerHTML = this.getChart(data);
    this.element .querySelector('.column-chart__header').innerHTML = data.reduce((acc, val) => acc + val, 0);
  }

  renderTemplate() {
    return `<div class='column-chart ${!this.isDataLoaded(this.data) ? 'column-chart_loading' : ''}'>
              <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink(this.link)}
              </div>
              <div class="column-chart__container">
                <div class="column-chart__header">
                    ${this.value}
                </div>
                <div class="column-chart__chart">
                  ${this.getChart(this.data)}
                </div>
              </div>
            </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.renderTemplate();
    this.element = element.firstChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
