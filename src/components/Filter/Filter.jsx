// import { useDispatch } from 'react-redux';

// import css from './Filter.module.css';
// import { setFilter } from 'redux/filterSlice';

// export const Filter = () => {
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <label>
//         Find contacts by Name
//         <input
//           className={css.filterName}
//           onChange={e => dispatch(setFilter(e.currentTarget.value))}
//           type="text"
//           name="filter"
//         />
//       </label>
//     </div>
//   );
// };

import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleFilterChange = event => {
    return dispatch(setFilter(event.target.value));
  };

  const filterId = 'name';

  return (
    <div>
      <label htmlFor={filterId} className={css.filterLabel}>Find contacts by name</label>
      <input
        id={filterId}
        className={css.filterName}
      type="text"
      name="filter"
      placeholder="Find contacts by name"
      value={filter}
        onChange={handleFilterChange}
        autoComplete="name"
    /></div>
    
  );
};