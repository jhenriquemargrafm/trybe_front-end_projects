import React, { useContext } from 'react';
import Context from '../APIcontext/Context';

function Sort() {
  const {
    setFilter,
    setOrder,
    setCurrOption,
    filteredPlanets } = useContext(Context);

  const handleChangeOption = (target) => {
    setCurrOption(target.value);
  };

  const handleInputChange = (target) => {
    setOrder(target.value);
  };

  return (
    <div>
      <label htmlFor="order">
        <select
          onChange={ ({ target }) => handleChangeOption(target) }
          data-testid="column-sort"
          name="order"
          aria-label="coluna"
        >
          {filteredPlanets.length > 0
            ? Object.keys(filteredPlanets[0]).map((coluna) => (
              <option key={ coluna } value={ coluna }>{coluna}</option>
            )) : <option disabled>Empty</option> }
        </select>
      </label>
      <input
        type="radio"
        data-testid="column-sort-input-asc"
        name="order"
        value="ASC"
        onChange={ ({ target }) => handleInputChange(target) }
      />
      ASCENDENTE
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        name="order"
        value="DESC"
        onChange={ ({ target }) => handleInputChange(target) }
      />
      DESCENDENTE
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ setFilter }
      >
        Ordenar
      </button>
    </div>

  );
}

export default Sort;
