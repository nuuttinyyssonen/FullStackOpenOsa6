import { useDispatch } from 'react-redux'
import { filterReducer } from '../reducers/filterReducer'

const FilterForm = () => {
    const dispatch = useDispatch()

    return(
        <div>
            <h3>Filter</h3>
            <input onChange={e => dispatch(filterReducer(e.target.value))}/>
        </div>
    )
}

export default FilterForm