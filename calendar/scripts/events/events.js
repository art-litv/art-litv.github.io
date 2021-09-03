import { getItem, setItem } from '../common/storage.js'
import {
    isWithinWeek,
    stringifyTime,
    stringifyDate,
} from '../common/time.utils.js'
import { openPopup } from '../common/popup.js'

export function setUpdateFormFields(eventToUpdate) {
    const updateFormFieldElems = document.querySelectorAll(
        '.update-event-form__field'
    )

    updateFormFieldElems.forEach((updateFormFieldElem) => {
        switch (updateFormFieldElem.name) {
            case 'title':
                updateFormFieldElem.value = eventToUpdate.title
                break
            case 'date':
                updateFormFieldElem.value = stringifyDate(eventToUpdate.start)
                break
            case 'startTime':
                updateFormFieldElem.value = stringifyTime(eventToUpdate.start)
                break
            case 'endTime':
                updateFormFieldElem.value = stringifyTime(eventToUpdate.end)
                break
            case 'description':
                updateFormFieldElem.value = eventToUpdate.description
                break
            default:
                break
        }
    })
}

export function handleEventClick({ target }) {
    // если произошел клик по событию, то нужно паказать попап
    // установите selectedEventId с id события в storage
    if ([...target.classList].some((class_) => class_.startsWith('event'))) {
        openPopup('center')
        if (target.classList.contains('event')) {
            setItem('selectedEventId', +target.dataset.eventId)
        } else {
            setItem(
                'selectedEventId',
                +target.closest('.event').dataset.eventId
            )
        }

        const selectedEventId = getItem('selectedEventId')
        const eventToUpdate = getItem('events').find(
            (event) => event.id === selectedEventId
        )

        setUpdateFormFields(eventToUpdate)
    }
}

function removeEventsFromCalendar() {
    setItem('events', [])
}

const createEventElement = (event) => {
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement
    const eventElem = document.createElement('div')
    eventElem.classList.add('event')
    eventElem.dataset.eventId = event.id

    const eventTitle = document.createElement('span')
    eventTitle.classList.add('event__title')
    eventTitle.textContent = event.title

    const eventTime = document.createElement('span')
    eventTime.classList.add('event__time')

    eventTime.textContent = `${stringifyTime(event.start)} - ${stringifyTime(
        event.end
    )}`

    eventElem.append(eventTitle, eventTime)

    const pxPerHour = document.querySelector(
        '.calendar__time-slot'
    ).offsetHeight

    // Количество часов между началом и окончанием события
    const timeRange = Math.abs(event.end - event.start) / 36e5

    const eventHeight = timeRange * pxPerHour
    eventElem.style.height = `${eventHeight}px`
    eventElem.style.top = `${(event.start.getMinutes() / 60) * pxPerHour}px`

    return eventElem
}

export const renderEvents = () => {
    // достаем из storage все события и дату понедельника отображаемой недели
    // фильтруем события, оставляем только те, что входят в текущую неделю
    // создаем для них DOM элементы с помощью createEventElement
    // для каждого события находим на странице временную ячейку (.calendar__time-slot)
    // и вставляем туда событие
    // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
    // не забудьте удалить с календаря старые события перед добавлением новых
    const eventElems = document.querySelectorAll('.event')
    const dayElems = document.querySelectorAll('.calendar__day')

    eventElems.forEach((eventElem) => {
        eventElem.remove()
    })

    const events = getItem('events')
    const weekStart = getItem('displayedWeekStart')

    const weekEvents = events.filter((event) => {
        const eventStartDate = event.start
        const weekStartEventDate = weekStart
        return isWithinWeek(weekStartEventDate, eventStartDate)
    })

    weekEvents.forEach((weekEvent) => {
        const eventDayElem = Array.from(dayElems).find(
            (dayElem) => +dayElem.dataset.day === weekEvent.start.getDate()
        )

        const eventTimeSlotElem = eventDayElem.querySelector(
            `.calendar__time-slot[data-time="${weekEvent.start.getHours()}"]`
        )

        eventTimeSlotElem.append(createEventElement(weekEvent))
    })
}
