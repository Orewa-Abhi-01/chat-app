export function formatMessageTime(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${date.getMonth() + 1}/${date.getDate() }/${date.getFullYear()}, ${formattedHours}:${formattedMinutes} ${ampm}`;
}

// export function formatMessageTime(date) {
//     return new Date(date).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//     });
// }