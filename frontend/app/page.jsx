import { getPageData } from "@lib";
import { HomePageContainer } from "@components";
import {
    headers
} from "next/headers";


const HomePage = async () => {
    const homePageData = await getPageData('home');
    const user = homePageData.user;
    const settings = homePageData.settings;
    const shortcuts = homePageData.shortcuts;
    const bookmarkCategoryGroups = homePageData.categories;
    const bookmarkSubCategoryGroups = homePageData.sub_categories;
    const bookmarks = homePageData.bookmarks;
    const searchEngines = homePageData.search_engines;
    const weatherData = homePageData.weather;
    /*
        To prevent the text content mismatch warning between server-side and client-side rendering,
        obtain the current date on the server side.
        This ensures consistency when using the date across the application,
        such as in the Weather component, during the initial page render.
    */

    const timeOffset = new Date().getTime() + 60 * 60 * 1000;
    const currentDate = new Date(timeOffset);

    const domain = headers()?.get("x-forwarded-host");
    const protocol = headers()?.get("x-forwarded-proto");
    const baseUrl = `${protocol}://${domain}`;

    const props = {
        user,
        settings,
        shortcuts,
        searchEngines,
        bookmarkCategoryGroups,
        bookmarkSubCategoryGroups,
        bookmarks,
        weatherData,
        currentDate,
        baseUrl,
    };

    return (
        <>
        <HomePageContainer {...props} />
        </>
    )
}

export default HomePage;