

export default function Button({loadMore}) {
    return <button type="button"
        className="loadbutton"
        onClick={loadMore}
    >Load more</button>
}