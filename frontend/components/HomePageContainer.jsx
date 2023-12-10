"use client";

import { useState } from 'react';

import {
    useMarkForDeletion, useToggleMenu,
    useFormVisibility, useSelectSearchEngine,
} from '@hooks';

import {
    LeftSidebar, WebSearch, FormsContainer,
    BookmarkCategoryGroups, Weather, NavBar
} from "@components";

const HomePageContainer = (props) => {
    const [bookmarks, setBookmarks] = useState(props.bookmarks);
    const [bookmarkCategoryGroups, setBookmarkCategoryGroups] = useState(props.bookmarkCategoryGroups);
    const [bookmarkSubCategoryGroups, setBookmarkSubCategoryGroups] = useState(props.bookmarkSubCategoryGroups);
    const [shortcuts, setShortcuts] = useState(props.shortcuts);
    const [searchEngines, setSearchEngines] = useState(props.searchEngines);
    const [weatherData, setWeatherData] = useState(props.weatherData);
    const currentDate = props.currentDate;
    const user = props.user;
    const settings = props.settings;
    const markForDeletionHook = useMarkForDeletion();
    const toggleMenuHook = useToggleMenu();
    const formVisibilityHook = useFormVisibility();
    const selectSearchEngineHook = useSelectSearchEngine();
    const { formName } = formVisibilityHook;

    const baseUrl = props.baseUrl;
    const hasWeatherData = Boolean(Object.keys(weatherData).length);

    props = {
        setSearchEngines, setBookmarks, setBookmarkCategoryGroups, setShortcuts,
        setWeatherData, setBookmarkSubCategoryGroups, bookmarkCategoryGroups, bookmarks, shortcuts, searchEngines,
        toggleMenuHook, markForDeletionHook, formVisibilityHook, selectSearchEngineHook,
        weatherData, currentDate, baseUrl, user, settings, bookmarkSubCategoryGroups,
    }

    return (
        <>
        <div id="home">
            {formName && <FormsContainer {...props} />}
            <div id="top">
                <NavBar {...props} />
            </div>
            <div id="bottom">
                <div id="left">
                    <LeftSidebar {...props} />
                </div>
                <div id="right">
                    {hasWeatherData && <Weather {...props} /> }
                    <WebSearch {...props} />
                    <BookmarkCategoryGroups {...props} />
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePageContainer;