import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleButton } from '../ToggleButton';

describe('ToggleButton', () => {
    it('should call onToggle when clicked', () => {
        const mockOnToggle = jest.fn();
        render(<ToggleButton onToggle={mockOnToggle} />);
        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });
});
