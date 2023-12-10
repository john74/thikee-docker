import {
    Category,
} from ".";


function CategoriesGroup(props) {
    const styles = props.styles;
    const group = props.group;

    return (
      <div className={styles.bookmarkCategoryGroup}>
        {group.map(category => (
          <Category key={'bookmark-category-group-' + category.id} styles={styles} category={category} {...props} />
        ))}
      </div>
    );
  }

  export default CategoriesGroup;