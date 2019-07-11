import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import authPage from 'vault/tests/pages/auth';

module('Acceptance | redirect_to functionality', function(hooks) {
  setupApplicationTest(hooks);

  test('redirect to a route after authentication', async function(assert) {
    let url = '/vault/secrets/secret/create';
    await visit(url);
    assert.equal(
      currentURL(),
      `/vault/auth?redirect_to=${encodeURIComponent(url)}&with=token`,
      'encodes url for the query param'
    );
    await authPage.tokenInput('root').submit();
    assert.equal(currentURL(), url, 'navigates to the redirect_to url after auth');
  });

  test('redirect from root does not include redirect_to', async function(assert) {
    let url = '/';
    await visit(url);
    assert.equal(currentURL(), `/vault/auth?with=token`, 'there is no redirect_to query param');
  });
});
