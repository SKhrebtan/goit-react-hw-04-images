import css from 'Styles.module.css'

export default function Button({loadMore}) {
    return <button type="button"
        className={css.loadbutton}
        onClick={loadMore}
        >Load more</button>
}