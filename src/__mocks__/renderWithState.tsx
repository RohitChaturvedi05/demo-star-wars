import { render } from '@testing-library/react';
import React from 'react';
import { StateProvider } from '../state';

export const renderWithState = (Component: React.ReactNode) => {
    return render(<StateProvider>{Component}</StateProvider>);
};
