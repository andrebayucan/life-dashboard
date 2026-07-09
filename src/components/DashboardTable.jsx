import { Link } from 'react-router'
import './DashboardTable.css'

const DashboardTable = ({list, input, sliderValue, filteredList}) => {
    return (
        <table className="table-display">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th># of Observations</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredList?.map(item => (
                        <tr key={item.uuid}>
                            <td>
                                <Link to={`/lifeDetails/${item.uuid}`}>{item.taxon.name}</Link>
                            </td>
                            <td>{item.observed_on_details.date}</td>
                            <td>{item.taxon.observations_count}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default DashboardTable