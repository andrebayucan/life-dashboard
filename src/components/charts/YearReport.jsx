import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import './sharedCharts.css'

const YearReport = () => {

    const [ monthAmounts, setMonthAmounts ] = useState([])
    const [ displayYear, setDisplayYear ] = useState(null)
    
    const monthToString = monthNum => {
        const date = new Date()
        date.setMonth(monthNum - 1)
        return date.toLocaleString('default', { month: 'long' }).substring(0, 3)
    }

    const fetchMonthlyData = async () => {
        const tempData = []
        const currentYear = new Date().getFullYear()
        setDisplayYear(currentYear)
        for (let monthNum = 1; monthNum <= 12; monthNum++) {
            let query = `https://api.inaturalist.org/v1/observations?page=1&per_page=0&month=${monthNum}&year=${currentYear - 1}`
            const response = await fetch(query)
            const json = await response.json()
            tempData.push({ month: monthToString(monthNum), numObservations: await json.total_results })
        }
        return tempData
    }

    useEffect(() => {
        const getData = async () => {
            const tempData = await fetchMonthlyData().catch(console.error)
            setMonthAmounts(tempData)
        }

        getData()
    },[])

    useEffect(() => {
        console.log(monthAmounts)
    },[monthAmounts])

    return (
        <div className="chart">
            <h2>Number of Observations in {displayYear}</h2>
            <BarChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1 }}
                responsive
                data={monthAmounts}
                margin={{
                    top: 10,
                    right: 20,
                    bottom: 40,
                    left: 30
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{value: "Month", position: "insideBottom", offset: -10}} dataKey="month" type="category" interval={0} />
                <YAxis label={{value: "# of Observations", position: "insideLeft", angle: -90, offset: -10}} dataKey="numObservations" type="number" width={80} />
                <Tooltip />
                <Bar dataKey="numObservations" fill="#50975fff" activeBar={{ fill: "#49de69ff", stroke: "blue" }} radius={[10, 10, 0, 0]} />
                <RechartsDevtools />
            </BarChart>
        </div>
    )
}

export default YearReport