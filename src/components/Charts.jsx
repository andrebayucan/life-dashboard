import YearReport from './charts/YearReport'
import OrganismObservations from './charts/OrganismObservations'
import './Charts.css'

const Charts = ({organisms}) => {
    return (
        <div className="charts-container">
            <YearReport />
            {
                organisms?.map(item => (
                    <OrganismObservations taxon_id={item.id} name={item.name} />
                ))
            }
        </div>
    )
}

export default Charts