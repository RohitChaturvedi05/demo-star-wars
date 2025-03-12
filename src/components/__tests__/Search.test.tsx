import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from '../Search';

describe('Search', () => {
    it('should run without crashing', () => {
        const onMockSearch = jest.fn();
        render(<Search onSearch={onMockSearch} />);
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'test' },
        });
        expect(onMockSearch).toHaveBeenCalledWith('test');
    });
});
