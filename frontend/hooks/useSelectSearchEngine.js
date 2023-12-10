import { useState } from 'react';


export default function useSelectSearchEngine() {
    const [selectedEngine, setSelectedEngine] = useState(null);
    const selectSearchEngine = engine => {
        setSelectedEngine({...engine});
    }

    return {
        selectedEngine,
        setSelectedEngine,
        selectSearchEngine
    }
}