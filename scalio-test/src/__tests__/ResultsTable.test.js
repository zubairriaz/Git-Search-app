import React from 'react';

import {  render} from '@testing-library/react';


import ResultsTable from '../components/ResultsTable';
import {StoreProvider} from "../store/Store"
import {columns} from "../utils/constants"


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


    

 






