function convertDateType(dateString){
    var date = new Date(dateString);

    var formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'GMT'
    });

    formattedDate = formattedDate.replace(/(\d{4})\/(\d{2})\/(\d{2}),/, '$1/$2/$3');

    return formattedDate
}