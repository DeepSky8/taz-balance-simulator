import React from "react";
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Welcome } from "../../../components/elements/Welcome";

test('should render the welcome screen', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Welcome />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})