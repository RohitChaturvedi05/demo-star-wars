import { render } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
    it('should run without crashing', () => {
        const { container } = render(<Footer />);
        expect(container).toMatchSnapshot();
    });
});
