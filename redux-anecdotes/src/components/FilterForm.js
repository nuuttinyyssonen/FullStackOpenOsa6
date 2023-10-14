import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const FilterForm = () => {
    const dispatch = useDispatch()

    return(
        <div>
            <h3>Filter</h3>
            <input onChange={e => dispatch(filterChange(e.target.value))}/>
        </div>
    )
}

export default FilterForm