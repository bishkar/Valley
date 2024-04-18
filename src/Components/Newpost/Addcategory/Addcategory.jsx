import './Addcategory.css'
import { getCategory } from '../../../redux/category.slice/getCategory.slice';
import { useDispatch } from 'react-redux';

const Addcategory = () => {
    // const dispatch = useDispatch();
    // dispatch(getCategory()).then((response) => {
    //     console.log(response.payload)
    // })


    return (
        <div className="addcategory">
            <select>
                <option value="0">Value 0</option>
            </select>

            <input type="text" className='add-link-input' placeholder='Write here new category'/>
        </div>
    )
}

export default Addcategory;