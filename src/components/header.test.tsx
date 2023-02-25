// import React from 'react';
import { test } from 'vitest';
import renderer from 'react-test-renderer';

import Header from './header';
import { AppContextDOM } from '~/contexts/app';

test('Header component', () => {
  const render = renderer.create(
    <AppContextDOM>
      <Header />
    </AppContextDOM>,
  );
  const component = render.getInstance();
  console.log(component?.findAll(() => true));
});
