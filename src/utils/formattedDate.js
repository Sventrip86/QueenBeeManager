
    // getting date formatted as string 
export const getCreationDate = () => {
        let today = new Date()
        const month = today.getMonth()+1
        const day = today.getDate()
        const year = today.getFullYear()
        return `${day}/${month}/${year}`
      }
