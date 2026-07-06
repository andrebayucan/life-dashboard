import './FilterBar.css'
import { useState, useEffect } from 'react'

const FilterBar = ({list, updateResults, minObservations, maxObservations}) => {
    const [barInput, setBarInput] = useState("")
    const [sliderValue, setSliderValue] = useState(maxObservations)

    useEffect(() => {
        setSliderValue(maxObservations)
    }, [maxObservations])

    useEffect(() => {
        if (list == null) return
        const filteredData = list.filter(item => item.taxon.observations_count <= sliderValue)
        if (barInput !== "") {
            const barFilteredData = filteredData.filter(item =>
                item.taxon.name.toLowerCase().includes(barInput) ||
                item.observed_on_details.date.toLowerCase().includes(barInput) ||
                String(item.taxon.observations_count).includes(barInput)      
            )
            updateResults(barFilteredData)
            return
        }
        updateResults(filteredData)

    }, [barInput, sliderValue])

    const searchItemsBar = searchValue => {
        setBarInput(searchValue.toLowerCase().replaceAll(" ", ""))
    }

    const searchItemsRange = async (event) => {
        const newValue = event.target.value
        setSliderValue(newValue)
    }

    return (
        <div className="filter-bar">
            <div className="range-section">
                Max observations: {sliderValue}
                <input
                className="range-bar"
                type="range"
                id="observations"
                name="observations"
                min={minObservations}
                max={maxObservations}
                value={sliderValue}
                step="1"
                onChange={(event) => searchItemsRange(event)}
                />
            </div>

            <input
                className="input-box"
                type="text"
                id="name"
                name="name"
                placeholder="Search..."
                onChange={(inputString) => searchItemsBar(inputString.target.value)}
            />
        </div>
    )
}

export default FilterBar