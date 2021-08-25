import { getItem, setItem } from '../common/storage.js'
import { renderWeek } from '../calendar/calendar.js'
import { renderHeader } from '../calendar/header.js'
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js'
import shmoment from '../common/shmoment.js'

const navElem = document.querySelector('.navigation')
const displayedMonthElem = document.querySelector(
    '.navigation__displayed-month'
)

function renderCurrentMonth() {
    displayedMonthElem.textContent = getDisplayedMonth(
        getItem('displayedWeekStart')
    )
}

const onChangeWeek = ({ target }) => {
    const weekShmoment = shmoment(getItem('displayedWeekStart'))

    const navIconSelector = '.navigation__nav-icon'

    if (
        !target.classList.contains(navIconSelector) &&
        target.closest(navIconSelector) === null
    ) {
        return
    }

    const { direction } = target.closest('button').dataset

    if (direction === 'next') {
        weekShmoment.add('days', 7)
    } else if (direction === 'prev') {
        weekShmoment.subtract('days', 7)
    } else return

    setItem('displayedWeekStart', getStartOfWeek(weekShmoment.result()))

    renderHeader()
    renderWeek()
    renderCurrentMonth()
}

export const initNavigation = () => {
    renderCurrentMonth()
    navElem.addEventListener('click', onChangeWeek)
}
