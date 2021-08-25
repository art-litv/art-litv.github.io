import { getItem } from '../common/storage.js'

const errorMessages = {
    eventCrossing: 'Event at the specified time already exists',
    exceedsTimeLength: `Event exceeds the maximum time length of ${getItem(
        'maxEventLength'
    )} hours`,
}

export const validators = {
    // использовать excludedEvents при валидации обновляемого события,
    // обновляемое событие нужно исключить из массива событий для
    // проверки на пересечение
    isEventCrossing(eventToCheck, excludedEventsIds) {
        let events = [...getItem('events')]
        events = excludedEventsIds
            ? events.filter((event) => !excludedEventsIds.includes(event.id))
            : events

        const crossingEvent = events.find(
            (event) =>
                (eventToCheck.start <= event.start &&
                    eventToCheck.end >= event.start) ||
                (eventToCheck.start >= event.start &&
                    eventToCheck.start <= event.end)
        )

        return crossingEvent ? 'eventCrossing' : undefined
    },

    exceedsTimeLength(eventToCheck, timeLength = 6) {
        const eventTimeLengthMili = Math.abs(
            eventToCheck.end - eventToCheck.start
        )

        const timeLengthMinutes = timeLength * 60
        const eventTimeLengthMinutes = Math.floor(
            eventTimeLengthMili / 1000 / 60
        )

        return eventTimeLengthMinutes > timeLengthMinutes
            ? 'exceedsTimeLength'
            : undefined
    },
}

export const validateEvent = (event, validatorsArr) => {
    return validatorsArr.map((validator) => {
        const validationType = validator(event)
        return errorMessages[validationType]
    })
}
