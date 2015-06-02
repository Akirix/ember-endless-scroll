import Ember from 'ember';
import EndlessScrollMixin from '../../../mixins/endless-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | endless scroll');

// Replace this with your real tests.
test('it works', function(assert) {
  var EndlessScrollObject = Ember.Object.extend(EndlessScrollMixin);
  var subject = EndlessScrollObject.create();
  assert.ok(subject);
});
