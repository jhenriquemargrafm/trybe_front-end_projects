import React, { useContext } from 'react';
import Context from '../APIcontext/Context';

function NameInput() {
  const { setFilters, filters } = useContext(Context);
  const handleInput = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  };

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          name="name-filter"
          type="text"
          data-testid="name-filter"
          placeholder="Digite um termo de busca..."
          onChange={ handleInput }
        />
      </label>
    </div>
  );
}

export default NameInput;
