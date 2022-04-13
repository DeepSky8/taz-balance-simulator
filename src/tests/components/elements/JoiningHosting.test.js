import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { JoiningHosting } from '../../../components/elements/JoiningHosting';

test('should render JoiningHosting screen', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<JoiningHosting />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})