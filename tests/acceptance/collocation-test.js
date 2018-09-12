import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import getStyles from 'ember-cli-styles-collocation/test-support/get-style';

module('Acceptance | collocation', function(hooks) {
  setupApplicationTest(hooks);

  test('collocated styles are included.', async function(assert) {
    await visit('/');

    assert.equal(getStyles('.collocated-styles-test br.component-element').order, '1', 'component styles work');
    assert.equal(getStyles('br.route-element').order, '1', 'route styles work');
  });
});
