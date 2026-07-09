import { useState, useEffect } from 'react'
import './App.css'
import StatisticCard from './components/StatisticCard.jsx'
import DashboardTable from './components/DashboardTable.jsx'
import FilterBar from './components/FilterBar.jsx'

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [mostObservations, setMostObservations] = useState(0);
  const [leastObservations, setLeastObservations] = useState(null);
  const [leastRecorded, setLeastRecorded] = useState([]);
  const [mostYears, setMostYears] = useState([]);
  const [mostMonths, setMostMonths] = useState([]);

  const monthsToString = async (monthNums) => {
    const monthNames = []
    for (const month of monthNums) {
      const date = new Date()
      date.setMonth(month - 1)
      monthNames.push(date.toLocaleString('default', { month: 'long' }))
    }

    return monthNames
  }

  const setStatisticsData = async (results) => {
    const maxSeen = Math.max(...results.map(item => item.taxon?.observations_count || 0))
    let minSeen = [maxSeen]
    let leastSeenOrganisms = []
    let yearFrequencies = {}
    let monthFrequencies = {}
    let maxYears = []
    let maxYearsCount = 0
    let maxMonths = []
    let maxMonthsCount = 0

    for (let index = 0; index < results.length; index++) {
      if (results[index].taxon.observations_count < minSeen) {
        minSeen = results[index].taxon.observations_count
        leastSeenOrganisms = [results[index].taxon.name]
      } else if (results[index].taxon.observations_count == minSeen) {
        leastSeenOrganisms.push(results[index].taxon.name)
      }

      yearFrequencies[results[index].observed_on_details.year] = (yearFrequencies[results[index].observed_on_details.year] || 0) + 1
      monthFrequencies[results[index].observed_on_details.month] = (monthFrequencies[results[index].observed_on_details.month] || 0) + 1

      if (yearFrequencies[results[index].observed_on_details.year] > maxYearsCount) {
        maxYearsCount = yearFrequencies[results[index].observed_on_details.year]
        maxYears = [results[index].observed_on_details.year]
      } else if (yearFrequencies[results[index].observed_on_details.year] == maxYearsCount) {
        maxYears.push(results[index].observed_on_details.year)
      }

      if (monthFrequencies[results[index].observed_on_details.month] > maxMonthsCount) {
        maxMonthsCount = monthFrequencies[results[index].observed_on_details.month]
        maxMonths = [results[index].observed_on_details.month]
      } else if (monthFrequencies[results[index].observed_on_details.month] == maxMonthsCount) {
        maxMonths.push(results[index].observed_on_details.month)
      }
    }

    setMostObservations(maxSeen)
    setLeastObservations(minSeen)
    setLeastRecorded(leastSeenOrganisms)
    setMostYears(maxYears)
    setMostMonths(await monthsToString(maxMonths))
  }
  
  const fetchAllItemsData = async () => {
    let query = "https://api.inaturalist.org/v1/observations?page=1&per_page=12&photos=true&identified=true&quality_grade=research&order_by=random"
    const response = await fetch(query)
    const json = await response.json()
    setList(json.results)

    setStatisticsData(json.results).catch(console.error)
  }

  useEffect(() => {
    fetchAllItemsData().catch(console.error)
  }, []);

  return (
    <div className="bottom-row">
      <div className="side-statistics">
        <StatisticCard statName="Least Recorded Organism" statValue={leastRecorded}></StatisticCard>
        <StatisticCard statName="Most Common Year" statValue={mostYears}></StatisticCard>
        <StatisticCard statName="Most Common Month" statValue={mostMonths}></StatisticCard>
      </div>

      <div className="main-dashboard">
        <FilterBar list={list} updateResults={setFilteredResults} minObservations={leastObservations} maxObservations={mostObservations}/>
        <DashboardTable list={list} filteredList={filteredResults}/>
      </div>
    </div>
  )
}

export default App
