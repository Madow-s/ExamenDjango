function FormatDate(date){

    const newDate = new Date(date)
    
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }
    
    return newDate.toLocaleDateString("fr-FR", options)
    
    }
    
    export default FormatDate