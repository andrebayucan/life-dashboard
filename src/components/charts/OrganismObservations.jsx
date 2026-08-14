import { useEffect, useState } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
/* import { RechartsDevtools, RECHARTS_DEVTOOLS_PORTAL_ID } from '@recharts/devtools'; */
import './sharedCharts.css'
import { all } from 'axios';

const OrganismObservations = ({taxon_id, name}) => {

    const [ sortedObservations, setSortedObservations ] = useState({
        casual: [],
        needs_id: [],
        research: []
    })
    const [ yearList, setYearList ] = useState([])
    
    const getNumObservations = () => {
        let total = 0
        for (const observationsArr of Object.values(sortedObservations)) {
            total += observationsArr.length
        }
        return total
    }

    const setStackingOrder = (observationsList) => {
        observationsList.sort((a, b) => a.date.localeCompare(b.date))

        let yCounts = {}
        let stackedData = observationsList.map(observation => {
            let year = new Date(observation.date).getFullYear()

            yCounts[year] = (yCounts[year] || 0) + 1

            return ({
                ...observation,
                value: yCounts[year]
            })
        })

        let years = []
        for (const key of Object.keys(yCounts))
        {
            years.push(parseInt(key))
        }

        setYearList(years)

        return stackedData
    }

    const organizeObservations = (observationsList => {
        const stackedList = setStackingOrder(observationsList)
        let updatedData = {
            casual: [],
            needs_id: [],
            research: []
        }

        for (const observation of stackedList) {
            updatedData[observation.quality].push(observation)
        }

        setSortedObservations(updatedData)
    })

    const getListObservations = async (json) => {
        let data = await json
        let finalList = []
        for (const observation of data) {
            finalList.push({
                date: observation.observed_on_details.date,
                url: observation.uri,
                quality: observation.quality_grade,
                year: new Date(observation.observed_on_details.date).getFullYear()
            })
        }

        return finalList
    }

    const fetchObservationsData = async () => {
        if (taxon_id == null)
            return

        let query = `https://api.inaturalist.org/v1/observations?page=1&per_page=30&identified=true&order_by=observed_on&order=desc&taxon_id=${taxon_id}`
        const response = await fetch(query)
        const json = await response.json()
        organizeObservations(await getListObservations(json.results))
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
                <p>{`Date: ${payload[0].payload.date}`}</p>
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
            <h2>{getNumObservations()} Most Recent Observations of {name}</h2>
            <h3>Click an observation to visit its record!</h3>
            <ScatterChart
                style={{ width: '100%', maxWidth: '700px', aspectRatio: 16 / 9}}
                responsive
                margin={{
                    top: 10,
                    right: 20,
                    bottom: 40,
                    left: 20
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={
                    {value: "Date(s)", position: "insideBottom", offset: -10}}
                    dataKey="year"
                    type="number"
                    allowDuplicatedCategory={false}
                    name="Date"
                    tick={{fontSize: "0.8em"}}
                    ticks={yearList}
                    domain={[Math.min(...yearList), Math.max(...yearList)]}
                />
                <YAxis hide={true} dataKey="value" type="number" name="Stack Height" />
                <ZAxis dataKey="url" type="category" name="link" />
                <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" wrapperStyle={{paddingBottom: 40}}/>
                <Scatter name="Casual" data={sortedObservations.casual} fill="#d31e1eff" isAnimationActive={true}
                    onClick={(data) => {
                        window.open(data.url, "_blank").focus()
                    }}
                    style={{cursor: "pointer"}}
                />
                <Scatter name="Needs ID" data={sortedObservations.needs_id} fill="#c27707ff" isAnimationActive={true}
                    onClick={(data) => {
                        window.open(data.url, "_blank").focus()
                    }}
                    style={{cursor: "pointer"}}
                />
                <Scatter name="Research Grade" data={sortedObservations.research} fill="#37b618ff" isAnimationActive={true}
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