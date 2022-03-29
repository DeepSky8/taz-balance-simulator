import React from "react";
import ReactShallowRenderer from 'react-test-renderer/shallow';
import { NotFoundPage } from "../../../components/elements/NotFoundPage";

test('should render the NotFoundPage screen', () => {
    // const testRenderer = TestRenderer.create(<NotFoundPage />)
    // const testInstance = testRenderer.root;
    const renderer = new ReactShallowRenderer()
    renderer.render(<NotFoundPage />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();
})