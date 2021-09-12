import React, { useContext } from 'react';
import Context from '../APIcontext/Context';

function FilterList() {
  const { filters, filters: { filterByNumericValues },
    setFilters, listColumns, setListColumns, columns, setColumns } = useContext(Context);

  const removeFilter = ({ target: { value } }) => {
    setColumns([...columns, value]);
    setListColumns(listColumns.filter(((column) => column !== value)));
    const newFilter = filterByNumericValues.filter((filter) => filter.column !== value);
    setFilters({
      ...filters,
      filterByNumericValues: newFilter,
    });
  };

  return (
    <div>
      <h4>Filtros sendo usados</h4>
      {filterByNumericValues.length >= 1 ? filterByNumericValues.map((filter) => (
        <p data-testid="filter" key={ filter.column }>
          {' Coluna: '}
          { filter.column}
          {' Comparação: '}
          {filter.comparison }
          {' Valor: '}
          { filter.value }
          <button
            type="button"
            value={ filter.column }
            onClick={ (e) => removeFilter(e) }
          >
            X
          </button>
        </p>
      )) : <span>Nenhum filtro realizado</span>}
    </div>
  );
}

export default FilterList;
