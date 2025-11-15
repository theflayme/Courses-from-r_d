function formatDate(actualDate: Date): string {
    const date = new Date(actualDate);
    return date.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export default formatDate;