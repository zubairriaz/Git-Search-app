import React from 'react';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'


import Search from '../components/search/Search';
import {StoreProvider} from "../store/Store"



test('Typing In Input Renders Correct Result', async () => {
  render(<StoreProvider><Search onChangeText ={()=>{}}/></StoreProvider>);
  userEvent.type(screen.queryByPlaceholderText(/Enter Login Text/i),"hello")
  await waitFor(() => {
     expect(screen.queryByPlaceholderText(/Enter Login Text/i)).toHaveValue("hello");
  });
});

test("Form can be submited", () => {

    const mockSubmit = jest.fn();
    const { debug, queryByTestId } = render(<Search onSubmitForm={mockSubmit}/>);

    fireEvent.click(queryByTestId("submit-button"));

    expect(mockSubmit).toHaveBeenCalled(); // Test if handleSubmit has been called 

});




