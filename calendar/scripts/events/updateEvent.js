import { getItem, setItem } from '../common/storage.js'
import { getDateTime } from '../common/time.utils.js'
import { closePopup } from '../common/popup.js'
import {
    renderEvents,
    handleEventClick,
    setUpdateFormFields,
} from './events.js'
import { validators, validateEvent } from '../validation/validation.js'

const weekElem = document.querySelector('.calendar__week')
const deleteEventBtn = document.querySelector('.delete-event-btn')

const updateEventFormElem = document.querySelector('.update-event-form')
const updateFormFieldElems = updateEventFormElem.querySelectorAll(
    '.update-event-form__field'
)
const closeUpdateEventFormBtn = document.querySelector(
    '.update-event__close-btn'
)

function clearUpdateEventForm() {
    updateFormFieldElems.forEach((updateFormFieldElem) => {
        updateFormFieldElem.value = ''
    })
}

function onCloseUpdateEventForm() {
    closePopup()
    clearUpdateEventForm()
}

function updateEvent(eventToUpdate, title, description, start, end) {
    eventToUpdate.title = title
    eventToUpdate.description = description
    eventToUpdate.start = start
    eventToUpdate.end = end
}

function validateUpdatedEvent(formData, selectedEventId) {
    const validatedEvent = {
        id: selectedEventId,
        title: formData.get('title') || '(No title)',
        description: formData.get('description'),
        start: getDateTime(formData.get('date'), formData.get('startTime')),
        end: getDateTime(formData.get('date'), formData.get('endTime')),
    }

    const errors = validateEvent(validatedEvent, [
        (event) => validators.isEventCrossing(event, [selectedEventId]),
        validators.exceedsTimeLength,
    ])

    return errors.filter((error) => error)
}

export function onUpdateEvent(event) {
    event.preventDefault()
    const formData = new FormData(updateEventFormElem)

    document.querySelectorAll('.error-text').forEach((errorTextElem) => {
        errorTextElem.remove()
    })

    const selectedEventId = getItem('selectedEventId')
    const eventToUpdate = getItem('events').find((calendarEvent) => {
        return calendarEvent.id === selectedEventId
    })

    const foundErrors = validateUpdatedEvent(formData, selectedEventId)
    if (foundErrors.length) {
        foundErrors.forEach((foundError) => {
            updateEventFormElem.innerHTML += `<span class="error-text">${foundError}</span>`
        })
        setUpdateFormFields(eventToUpdate)
        return
    }

    updateEvent(
        eventToUpdate,
        formData.get('title'),
        formData.get('description'),
        getDateTime(formData.get('date'), formData.get('startTime')),
        getDateTime(formData.get('date'), formData.get('endTime'))
    )

    clearUpdateEventForm()
    closePopup()

    renderEvents()
}

function onDeleteEvent() {
    // достаем из storage массив событий и selectedEventId
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
    const events = getItem('events')
    const selectedEventId = getItem('selectedEventId')

    setItem(
        'events',
        events.filter(({ id }) => id !== selectedEventId)
    )

    setItem('selectedEventId', null)

    closePopup()
    renderEvents()
}

updateEventFormElem.addEventListener('submit', onUpdateEvent)
closeUpdateEventFormBtn.addEventListener('click', onCloseUpdateEventForm)

deleteEventBtn.addEventListener('click', onDeleteEvent)
weekElem.addEventListener('click', handleEventClick)

export function initUpdateEventForm() {
    updateEventFormElem.addEventListener('submit', onUpdateEvent)
    closeUpdateEventFormBtn.addEventListener('click', onCloseUpdateEventForm)
}
