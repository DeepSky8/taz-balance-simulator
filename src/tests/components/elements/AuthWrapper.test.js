import React from "react";
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { AuthWrapper } from '../../../components/elements/AuthWrapper';

test('should render the Authentication Wrapper', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<AuthWrapper />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})