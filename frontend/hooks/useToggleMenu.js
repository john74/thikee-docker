import { useEffect, useState } from 'react';


export default function useToggleMenu() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [lastClickedElement, setLastClickedElement] = useState(null);
    const [lastSelectedId, setLastSelectedId] = useState(null);

    const toggleMenu = (event, menuId) => {
        if (openMenuId == menuId) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(menuId);
        }
        setLastClickedElement(event.target);
        setLastSelectedId(menuId);
      };

    const closeMenuOnClick = event => {
        if (event.target?.closest("[data-delete]")) return;
        if (event.target != lastClickedElement) {
            setOpenMenuId(null);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenuOnClick);
        return () => document.body.removeEventListener('click', closeMenuOnClick);
    }, [openMenuId]);

    return {
        lastSelectedId,
        openMenuId,
        setOpenMenuId,
        toggleMenu,
    }
}