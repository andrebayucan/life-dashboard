import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
/* import { RechartsDevtools, RECHARTS_DEVTOOLS_PORTAL_ID } from '@recharts/devtools'; */
import './sharedCharts.css'

const OrganismObservations = ({taxon_id, name}) => {

    const [ recentObservations, setRecentObservations ] = useState([])
    
    useEffect(() => {
        console.log(recentObservations)
    }, [recentObservations])
    
    const setStackingOrder = (observationsList) => {
        let yCounts = {}
        let stackedData = observationsList.map(observation => {
            yCounts[observation.date] = (yCounts[observation.date] || 0) + 1

            return ({...observation, value: yCounts[observation.date]})
        })

        return stackedData
    }

    const getListObservations = async (json) => {
        let data = await json
        let finalList = []
        for (const observation of data) {
            finalList.push({ date: observation.observed_on_details.date, url: observation.uri, quality: observation.quality_grade })
        }

        return finalList
    }

    const fetchObservationsData = async () => {
        if (taxon_id == null)
            return

        let query = `https://api.inaturalist.org/v1/observations?page=1&per_page=30&identified=true&order_by=observed_on&order=desc&taxon_id=${taxon_id}`
        const response = await fetch(query)
        const json = await response.json()
        setRecentObservations(setStackingOrder(await getListObservations(json.results)))
     }

    useEffect(() => {
        fetchObservationsData().catch(console.error)
    }, [taxon_id]);

    function CustomTooltip({ payload, label, active }) {
        if (active && payload && payload.length) {
            return (
            <div
                className="custom-tooltip"
                style={{
                border: '1px solid #d88488',
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '1px 1px 2px #d88488',
                lineHeight: '100px',
                fontSize: '15px'
                }}
            >
                <p>{`Date: ${payload[0].value}`}</p>
                <p>{`Quality: ${payload[0].payload.quality}`}</p>
                <p className="desc" style={{ margin: '0', borderTop: '1px dashed #f5f5f5' }}>
                </p>
            </div>
            );
        }

        return null;
    }

    return (
        <div className="chart">
            <h2>30 Most Recent Observations of {name}</h2>
            <h3>Click an observation to visit its record!</h3>
            <ScatterChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1}}
                responsive
                margin={{
                    top: 10,
                    right: 20,
                    bottom: 40,
                    left: 10
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{value: "Date(s)", position: "insideBottom", offset: -10}} dataKey="date" type="category" allowDuplicatedCategory={false} name="Date" tick={{fontSize: "0.8em"}}/>
                <YAxis hide={true} dataKey="value" type="number" name="Stack Height" />
                <ZAxis dataKey="url" type="category" name="link" />
                <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" wrapperStyle={{paddingBottom: 40}}/>
                <Scatter name="Casual" data={recentObservations.sort((a, b) => a.date.localeCompare(b.date)).filter(observation => observation.quality == "casual")} fill="#d31e1eff" isAnimationActive={true}
                    onClick={(data) => {
                        window.open(data.url, "_blank").focus()
                    }}
                    style={{cursor: "pointer"}}
                />
                <Scatter name="Needs ID" data={recentObservations.sort((a, b) => a.date.localeCompare(b.date)).filter(observation => observation.quality == "needs_id")} fill="#c27707ff" isAnimationActive={true}
                    onClick={(data) => {
                        window.open(data.url, "_blank").focus()
                    }}
                    style={{cursor: "pointer"}}
                />
                <Scatter name="Research Grade" data={recentObservations.sort((a, b) => a.date.localeCompare(b.date)).filter(observation => observation.quality == "research")} fill="#37b618ff" isAnimationActive={true}
                    onClick={(data) => {
                        window.open(data.url, "_blank").focus()
                    }}
                    style={{cursor: "pointer"}}
                />
            </ScatterChart>
        </div>
    )
}

export default OrganismObservations