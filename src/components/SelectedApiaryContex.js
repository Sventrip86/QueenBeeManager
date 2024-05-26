import { useContext, useState, createContext } from "react";

// create a new context for selected apiary
const SelectedApiaryContex = createContext();

// provider component to wrap the app and provide the selected apiary context to its children
export const SelectedApiaryProvider = ({children}) => {
    const [ selectedApiaryId, setSelectedApiaryId] = useState(null)

    const value = {
        selectedApiaryId,
        setSelectedApiaryId
    }
    // return context provider with the value object
    return(
        <SelectedApiaryContex.Provider value={value}>
            {children} 
        </SelectedApiaryContex.Provider>
    )
}

// custom hook to use the context
export const useSelectedApiary = () => {
    const context = useContext(SelectedApiaryContex)
    if(!context){
        throw new Error;

    }

    return context
}

