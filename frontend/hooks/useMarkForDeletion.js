import { useEffect, useState } from 'react';


export default function useMarkForDeletion() {
    const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);

    const markForDeletion = (elementId) => {
        if (isMarkedForDeletion) return;
        setIsMarkedForDeletion(elementId);
      };

    const unmark = () => {
        setIsMarkedForDeletion(false);
      };

    useEffect(() => {
        if (!isMarkedForDeletion) return;

        const timeout = setTimeout(() => {
            setIsMarkedForDeletion(false);
        }, 5000);

        return () => clearTimeout(timeout);
      }, [isMarkedForDeletion]);

    return {
        isMarkedForDeletion,
        setIsMarkedForDeletion,
        markForDeletion,
        unmark
    }
}