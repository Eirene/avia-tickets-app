function getContainer() {
  return document.querySelector('.notify-container');
}

function alertTemplate(msg, className, index) {
  return `
    <div class="alert animate-bounce mx-auto p-4 px-8 mb-4 rounded-lg 
    bg-opacity-90 text-sm flex w-60 items-center ${className}" data-index="${index}">
      <span cass='inline'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
      <span class='ml-3'>${msg}</span>
    </div>
  `;
}

function notifyContainerTemplate() {
  return `
    <div class="notify-container w-full fixed z-10 bottom-5"></div>
  `;
}

function createNotifyContainer() {
  const template = notifyContainerTemplate();
  document.body.insertAdjacentHTML('afterbegin', template);
}

function getAlertIndex() {
  return document.querySelectorAll('.notify-container .alert').length;
}

/**
 * Function notify. Show notification message
 * @param {Object} settings
 * @param {string} settings.msg
 * @param {string} settings.className
 * @param {number} settings.timeout
 */
export function notify({
  msg = 'Info message',
  className = 'alert-info',
  timeout = 2000,
} = {}) {
  if (!getContainer()) {
    createNotifyContainer();
  }

  const index = getAlertIndex();
  const template = alertTemplate(msg, className, index);
  const container = getContainer();

  container.insertAdjacentHTML('beforeend', template);

  setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index) {
  let alert;

  if (index === undefined) {
    alert = document.querySelector('.notify-container .alert');
  } else {
    alert = document.querySelector(
      `.notify-container .alert[data-index="${index}"]`,
    );
  }

  if (!alert) {
    console.warn('Alert not found');
    return;
  }

  const container = getContainer();
  container.removeChild(alert);
}
