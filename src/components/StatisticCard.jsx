import './StatisticCard.css'

const StatisticCard = ({statName, statValue}) => {
    return (
        <div className="stat-div">
            <div className="stat-name-text">
                {`${statName}` + (statValue.length > 1 ? "s" : "") + ":"}
            </div>
            <div className="stat-value-text">
                {statValue.length > 1 ? statValue.join(", ") : statValue}
            </div>
        </div>
    )
}

export default StatisticCard