import { useContext, useState, createContext } from "react";


const SelectedApiaryContex = createContext();


export const SelectedApiaryProvider = ({children}) => {
    const [ selectedApiaryId, setSelectedApiaryId] = useState(null)

    const value = {
        selectedApiaryId,
        setSelectedApiaryId
    }

    return(
        <SelectedApiaryContex.Provider value={value}>
            {children}
        </SelectedApiaryContex.Provider>
    )
}

export const useSelectedApiary = () => {
    const context = useContext(SelectedApiaryContex)
    if(!context){
        throw new Error;

    }
    return context
}

