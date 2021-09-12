import React, { useContext, useState } from 'react';
import Context from '../APIcontext/Context';

function Filters() {
  const { filters, setFilters, listColumns, setListColumns,
    columns, setColumns } = useContext(Context);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const SendValueToGlobalHooks = () => {
    setColumns([...columns, ...columns.splice(columns.indexOf(column), 1)]);
    setColumns(columns);
    setColumn(columns[0]);
    setListColumns([...listColumns, column]);
    const currFilter = { column, comparison, value };
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, currFilter],
    });
  };

  return (
    <div>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {columns.map((category) => (
            <option
              key={ category }
              value={ category }
            >
              {category}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option key="maior que" value="maior que">maior que</option>
          <option key="menor que" value="menor que">menor que</option>
          <option key="igual a" value="igual a">igual a</option>
        </select>
      </label>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ SendValueToGlobalHooks }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
