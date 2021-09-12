import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  });

  const [listColumns, setListColumns] = useState([]);
  const [columns, setColumns] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const [currOrder, setOrder] = useState('ASC');
  const [currOption, setCurrOption] = useState('name');

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetchAPI = fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await fetchAPI;
      const { results } = await response.json();
      (results.sort((a, b) => {
        const inversion = -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return inversion;
        return 0;
      }));
      setData(results);
    };
    fetchPlanets();
  }, []);

  // Atualizações de data, de filtro de texto e de numéricos
  useEffect(() => {
    const filterPlanets = data.filter((planet) => planet.name
      .includes(filters.filterByName.name));
    if (filters.filterByNumericValues.length > 0
      && filters.filterByNumericValues !== undefined) {
      filters.filterByNumericValues.forEach((filter) => {
        if (filter.comparison === 'maior que') {
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] > filter.value));
        }
        if (filter.comparison === 'menor que') {
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] < +filter.value));
        }
        if (filter.comparison === 'igual a') {
          setFilteredPlanets(filterPlanets
            .filter((planet) => +planet[filter.column] === +filter.value));
        }
      });
    } else {
      setFilteredPlanets(filterPlanets);
    }
  }, [data, filters.filterByNumericValues, filters.filterByName]);

  const orderByNumeric = (column, sort) => {
    if (sort === 'ASC') {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (+a[column] > +b[column]) return 1;
        if (+a[column] < +b[column]) return inversion;
        return 0;
      }));
    } else {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (+a[column] < +b[column]) return 1;
        if (+a[column] > +b[column]) return inversion;
        return 0;
      }));
    }
    setFilteredPlanets(filteredPlanets);
  };

  const orderByTextual = (column, sort) => {
    if (sort === 'ASC') {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (a[column] > b[column]) return 1;
        if (a[column] < b[column]) return inversion;
        return 0;
      }));
    } else {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (a[column] < b[column]) return 1;
        if (a[column] > b[column]) return inversion;
        return 0;
      }));
    }
    setFilteredPlanets(filteredPlanets);
  };

  const setFilter = () => {
    setFilters({
      ...filters,
      order: { name: currOption, order: currOrder },
    });
    if (currOption === 'rotation_period'
      || currOption === 'diameter'
      || currOption === 'population'
      || currOption === 'orbital_period'
      || currOption === 'surface_water') {
      orderByNumeric(currOption, currOrder);
    } else {
      orderByTextual(currOption, currOrder);
    }
  };

  return (
    <Context.Provider
      value={ {
        data,
        filteredPlanets,
        setFilteredPlanets,
        filters,
        setFilters,
        listColumns,
        setListColumns,
        columns,
        setColumns,
        setFilter,
        currOrder,
        setOrder,
        currOption,
        setCurrOption,
      } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
