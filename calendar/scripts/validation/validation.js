import { getItem } from '../common/storage.js'

const errorMessages = {
    eventCrossing: 'Event at the specified time already exists',
    exceedsTimeLength: `Event exceeds the maximum time length of ${getItem(
        'maxEventLength'
    )} hours`,
}

export const validators = {
    isEventCrossing(eventToCheck) {
        const events = getItem('events')
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
        const eventTimeLength =
            eventToCheck.end.getHours() - eventToCheck.start.getHours()

        return eventTimeLength > timeLength ? 'exceedsTimeLength' : undefined
    },
}

export const validateEvent = (event, validatorsArr) => {
    return validatorsArr.map((validator) => {
        const validationType = validator(event)
        return errorMessages[validationType]
    })
}
