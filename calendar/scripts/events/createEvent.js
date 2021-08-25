import { getItem } from '../common/storage.js'
import { renderEvents } from './events.js'
import {
    getDateTime,
    stringifyDate,
    stringifyTime,
} from '../common/time.utils.js'
import { closeModal } from '../common/modal.js'
import shmoment from '../common/shmoment.js'
import { validators, validateEvent } from '../validation/validation.js'

const eventFormElem = document.querySelector('.event-form')
const formFieldElems = eventFormElem.querySelectorAll('.event-form__field')
const closeEventFormBtn = document.querySelector('.create-event__close-btn')

function clearEventForm() {
    formFieldElems.forEach((formFieldElem) => {
        formFieldElem.value = ''
    })
}

export function setEventFormFields(dateStart) {
    const eventFormFieldElems = document
        .querySelector('.event-form')
        .querySelectorAll('.event-form__field')

    eventFormFieldElems.forEach((eventFormFieldElem) => {
        switch (eventFormFieldElem.name) {
            case 'date':
                eventFormFieldElem.value = stringifyDate(dateStart)
                break
            case 'startTime':
                eventFormFieldElem.value = stringifyTime(dateStart)
                break
            case 'endTime':
                const dateEnd = shmoment(dateStart).add('hours', 1).result()
                eventFormFieldElem.value = stringifyTime(dateEnd)
                break
            default:
                break
        }
    })
}

function onCloseEventForm() {
    closeModal()
    clearEventForm()
}

function validateNewEvent(newEvent) {
    const errors = validateEvent(newEvent, [
        validators.isEventCrossing,
        validators.exceedsTimeLength,
    ])

    return errors.filter((error) => error)
}

function onCreateEvent(event) {
    event.preventDefault()
    const formData = new FormData(eventFormElem)

    document.querySelectorAll('.error-text').forEach((errorTextElem) => {
        errorTextElem.remove()
    })

    const date = formData.get('date') || new Date()

    const newEvent = {
        id: Number(`0.${Date.now()}`),
        title: formData.get('title') || '(No title)',
        description: formData.get('description'),
        start: getDateTime(date, formData.get('startTime')),
        end: getDateTime(date, formData.get('endTime')),
    }

    const foundErrors = validateNewEvent(newEvent)
    if (foundErrors.length) {
        foundErrors.forEach((foundError) => {
            eventFormElem.innerHTML += `<span class="error-text">${foundError}</span>`
        })
        setEventFormFields(newEvent.start)
        return
    }

    getItem('events').push(newEvent)

    clearEventForm()
    closeModal()

    renderEvents()
}

export function initEventForm() {
    eventFormElem.addEventListener('submit', onCreateEvent)
    closeEventFormBtn.addEventListener('click', onCloseEventForm)
}
