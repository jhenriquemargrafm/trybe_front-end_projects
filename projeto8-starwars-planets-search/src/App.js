import React from 'react';
import './App.css';
import Provider from './APIcontext/Provider';
import Table from './components/Table';
import NameInput from './components/NameInput';
import Options from './components/Options';
import FilterList from './components/FilterList';

function App() {
  return (
    <Provider>
      <NameInput />
      <Options />
      <FilterList />
      <Table />
    </Provider>
  );
}

export default App;
