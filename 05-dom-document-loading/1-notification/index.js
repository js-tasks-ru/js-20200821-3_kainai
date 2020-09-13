export default class NotificationMessage {
  element;

  constructor(message = '', { duration = 0, type = '' } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.timeout = 0;

    if (NotificationMessage.showedNotification) {
      NotificationMessage.showedNotification.remove();
    }

    this.render();
  }

  show(parent) {
    if (!parent) {
      document.body.append(this.element);
    } else {
      parent.append(this.element);
    }

    this.timeout = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  renderTemplate() {
    const sec = this.duration / 1000;

    return `<div class="notification ${this.type}" style="--value:${sec}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.renderTemplate();
    this.element = element.firstChild;
    NotificationMessage.showedNotification = this.element;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timeout);
    this.remove();
  }
}
