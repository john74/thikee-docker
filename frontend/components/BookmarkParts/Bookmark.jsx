import {
    BookmarkActions,
} from '.';


function Bookmark(props) {
    const styles = props.styles;
    const bookmarks = props.bookmarksArray;

    return (
        <div className={styles.bookmarks}>
            {bookmarks?.map(bookmark => (
                <div className={styles.bookmark} key={bookmark.id}>
                    <a className={styles.name} href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.name}</a>
                    <BookmarkActions styles={styles} bookmark={bookmark} {...props} />
                </div>
            ))}
        </div>
    );
  }

export default Bookmark;