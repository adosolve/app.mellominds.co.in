import React, { useState } from 'react';
import { Iconly } from 'react-iconly'; // Assuming Iconly is available or use SVG

interface InlineCalendarProps {
    onDateSelect: (date: string) => void;
    selectedDate: string; // YYYY-MM-DD
}

const InlineCalendar: React.FC<InlineCalendarProps> = ({ onDateSelect, selectedDate }) => {
    // Initialize with selected date or today
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const handleDayClick = (day: number) => {
        // Format as YYYY-MM-DD (local time)
        const date = new Date(year, month, day);
        // Adjust for timezone offset to get correct YYYY-MM-DD string
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        const dateString = localDate.toISOString().split('T')[0];
        onDateSelect(dateString);
    };

    const renderDays = () => {
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = new Date(year, month, day).toLocaleDateString();

            // Check if selected
            // Construct YYYY-MM-DD for comparison
            const d = new Date(year, month, day);
            const offset = d.getTimezoneOffset();
            const localD = new Date(d.getTime() - (offset * 60 * 1000));
            const isoDate = localD.toISOString().split('T')[0];

            const isSelected = selectedDate === isoDate;
            const isToday = isoDate === new Date().toISOString().split('T')[0];

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="inline-calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-btn">&lt;</button>
                <div className="current-month">{monthNames[month]} {year}</div>
                <button onClick={handleNextMonth} className="nav-btn">&gt;</button>
            </div>
            <div className="calendar-weekdays">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
            </div>
            <div className="calendar-grid-days">
                {renderDays()}
            </div>
        </div>
    );
};

export default InlineCalendar;
