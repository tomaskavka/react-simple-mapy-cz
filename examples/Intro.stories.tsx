import React from 'react';

export default {
  title: 'Examples',
};

export const Intro = () => (
  <>
    <h1>React Simple Mapy.cz</h1>
    <img src="https://github.com/tomaskavka/react-simple-mapy-cz/actions/workflows/unit-tests.yml/badge.svg" />
    <img src="https://github.com/tomaskavka/react-simple-mapy-cz/actions/workflows/linter.yml/badge.svg" />
    <img src="https://codecov.io/gh/tomaskavka/react-simple-mapy-cz/branch/main/graph/badge.svg?token=OMdqIJe8u3" />
    <p>Mapy.cz for React, easy to lazy load</p>
    <h2>Getting started</h2>
    <h3>Install</h3>
    <code>npm install --save react-simple-mapy-cz</code>
    <p>or</p>
    <code>yarn add react-simple-mapy-cz</code>

    <h2>Examples</h2>
    <h3>Simple API</h3>
    <ul>
      <li>
        <a href="/?path=/story/examples-simple-api--basic">Basic</a>
      </li>
      <li>
        Markers
        <ul>
          <li>
            <a href="/?path=/story/examples-simple-api-markers--on-load">Add on load</a>
          </li>
          <li>
            <a href="/?path=/story/examples-simple-api-markers--after-action">Add on click</a>
          </li>
        </ul>
      </li>
    </ul>

    <h3>Full API</h3>
    <ul>
      <li>
        <a href="/?path=/story/examples-full-api--basic">Basic</a>
      </li>
      <li>
        Controls
        <ul>
          <li>
            <a href="/?path=/story/examples-full-api-controls--default">Default</a>
          </li>
          <li>
            <a href="/?path=/story/examples-full-api-controls--compass">Compass</a>
          </li>
          <li>
            <a href="/?path=/story/examples-full-api-controls--mouse">Mouse</a>
          </li>
          <li>
            <a href="/?path=/story/examples-full-api-controls--keyboard">Keyboard</a>
          </li>
        </ul>
      </li>
      <li>
        Markers
        <ul>
          <li>
            <a href="/?path=/story/examples-full-api-markers--on-load">Add on load</a>
          </li>
          <li>
            <a href="/?path=/story/examples-full-api-markers--after-action">Add on click</a>
          </li>
        </ul>
      </li>
    </ul>
  </>
);
