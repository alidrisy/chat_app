export function extractTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If the hour is 0 (midnight), convert it to 12

    // Pad hours if necessary
    const paddedHours = padZero(hours);

    // Initialize the time string with the 12-hour format
    let timeString = `${paddedHours}:${minutes} ${period}`;

    // Check if the date is not today
    if (date.toDateString() !== now.toDateString()) {
        // Include the day if the date is not today
        const day = padZero(date.getDate());
        timeString = `${day}, ${timeString}`;

        // Check if the date is not in the current month
        if (date.getMonth() !== now.getMonth() || date.getFullYear() !== now.getFullYear()) {
            // Include the short month name and day if not in the current month
            const month = monthNames[date.getMonth()];
            timeString = `${month} ${day}, ${timeString}`;

            // Check if the date is not in the current year
            if (date.getFullYear() !== now.getFullYear()) {
                // Include the year, short month name, and day if not in the current year
                const year = date.getFullYear();
                timeString = `${year} ${month} ${day}, ${timeString}`;
            }
        }
    }

    return timeString;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number): string {
    return number.toString().padStart(2, "0");
}
