import React, { useState, useEffect, useRef } from 'react';

interface DateInputProps {
    value: string; // Expected in YYYY-MM-DD format for backend compatibility
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, min, max, className, style, placeholder = "DD/MM/YYYY" }) => {
    // State to hold the display value (DD/MM/YYYY)
    const [displayValue, setDisplayValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Convert YYYY-MM-DD to DD/MM/YYYY for initial load
    useEffect(() => {
        if (value && value.length === 10 && value.includes('-')) {
            const [year, month, day] = value.split('-');
            if (year.length === 4 && month.length === 2 && day.length === 2) {
                const newDisplay = `${day}/${month}/${year}`;
                if (displayValue !== newDisplay) {
                    setDisplayValue(newDisplay);
                }
            }
        } else if (!value) {
            setDisplayValue('');
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        const inputType = (e.nativeEvent as any).inputType;

        // Don't modify if user is deleting. Just let them delete the character and the slash if it's there.
        if (inputType === 'deleteContentBackward') {
            setDisplayValue(val);
            onChange(''); // Invalidate standard date while they're typing
            return;
        }

        // Remove all non-digits for forward typing
        val = val.replace(/\D/g, '');

        // Limit to 8 digits (DDMMYYYY)
        if (val.length > 8) {
            val = val.slice(0, 8);
        }

        // Auto-add slashes
        if (val.length >= 5) {
            val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
        } else if (val.length >= 3) {
            val = `${val.slice(0, 2)}/${val.slice(2)}`;
        }

        setDisplayValue(val);

        // If it's a complete valid date mask (DD/MM/YYYY), try to send to parent in YYYY-MM-DD format
        if (val.length === 10) {
            const [day, month, year] = val.split('/');

            // Basic validation
            const d = parseInt(day, 10);
            const m = parseInt(month, 10);
            const y = parseInt(year, 10);

            if (m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= 2100) {
                const cleanISO = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

                // Compare with min/max if provided
                if (min && cleanISO < min) return;
                if (max && cleanISO > max) return;

                onChange(cleanISO);
            } else {
                onChange('');
            }
        } else {
            // If incomplete, send empty or handle validation on parent
            onChange('');
        }
    };

    return (
        <input
            ref={inputRef}
            type="text"
            className={className}
            style={style}
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={10} // DD/MM/YYYY
        />
    );
};

export default DateInput;
