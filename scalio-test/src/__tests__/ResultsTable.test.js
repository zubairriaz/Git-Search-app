import React from 'react';

import { fireEvent, render} from '@testing-library/react';

import { shallow } from 'enzyme';

import ResultsTable from '../components/ResultsTable';
import {StoreProvider} from "../store/Store"
import {columns} from "../utils/constants"

test('Check If Results Table Loads Successfully', () => {
  const search = shallow(<StoreProvider><ResultsTable/></StoreProvider>);
  expect(search).toMatchSnapshot();
});
let table;
beforeEach(()=>{table = render(<StoreProvider><ResultsTable columns={columns} data={[]}/></StoreProvider>)})


test('Table Have First columns',  () => {
   const header = table.getByText(columns[0].name)  
    expect(header).toBeDefined();
});

test('Table Have last Column',  () => {
    const header = table.getByText(columns[columns.length - 1].name)  
     expect(header).toBeDefined();
 });


    

 






