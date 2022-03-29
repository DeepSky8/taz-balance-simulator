import React from "react";
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { GameSetup } from "../../../components/elements/GameSetup";

test('should render GameSetup screen', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<GameSetup />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})