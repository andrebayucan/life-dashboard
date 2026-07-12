const GenericDetail = ({category, value}) => {
    return (
        <li>
            <span className="bold-text">{category}:</span> {value ? value : "N/A"}
        </li>
    )
}

export default GenericDetail