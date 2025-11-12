const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    };

    return new Date(date).toLocaleDateString(undefined, options);
}

export default formatDate;