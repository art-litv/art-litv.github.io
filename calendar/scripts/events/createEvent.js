import { getItem } from '../common/storage.js';
import { renderEvents } from './events.js';
import { getDateTime, stringifyDate, stringifyTime } from '../common/time.utils.js';
import { closeModal } from '../common/modal.js';
import shmoment from '../common/shmoment.js';
import { validators, validateEvent } from '../validation/validation.js';

const eventFormElem = document.querySelector('.event-form');
const eventFormFieldElems = eventFormElem.querySelectorAll('.event-form__field');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  eventFormFieldElems.forEach(eventFormFieldElem => {
    eventFormFieldElem.value = '';
  });
}

const findEventFormFieldByName = name =>
  [...eventFormFieldElems].find(eventFormFieldElem => eventFormFieldElem.name === name);

export function setEventFormFields(dateStart) {
  const dateFieldElem = findEventFormFieldByName('date');
  dateFieldElem.value = stringifyDate(dateStart);

  const startTimeFieldElem = findEventFormFieldByName('startTime');
  startTimeFieldElem.value = stringifyTime(dateStart);

  const endTimeFieldElem = findEventFormFieldByName('endTime');
  const dateEnd = shmoment(dateStart).add('minutes', 59).result();
  endTimeFieldElem.value = stringifyTime(dateEnd);
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function validateNewEvent(newEvent) {
  const errors = validateEvent(newEvent, [
    validators.isEventCrossing,
    validators.exceedsTimeLength,
    validators.isInvalidEventTime,
  ]);

  return errors.filter(error => error);
}

function onCreateEvent(event) {
  event.preventDefault();
  const formData = new FormData(eventFormElem);

  document.querySelectorAll('.error-text').forEach(errorTextElem => {
    errorTextElem.remove();
  });

  const date = formData.get('date') || new Date();

  const newEvent = {
    id: Number(`0.${Date.now()}`),
    title: formData.get('title') || '(No title)',
    description: formData.get('description'),
    start: getDateTime(date, formData.get('startTime')),
    end: getDateTime(date, formData.get('endTime')),
  };

  const foundErrors = validateNewEvent(newEvent);
  if (foundErrors.length) {
    foundErrors.forEach(foundError => {
      eventFormElem.innerHTML += `<span class="error-text">${foundError}</span>`;
    });
    setEventFormFields(newEvent.start);
    return;
  }

  getItem('events').push(newEvent);

  clearEventForm();
  closeModal();

  renderEvents();
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
}
