import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-pagination/previous', 'Integration | Component | bp pagination/previous', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-pagination/previous}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-pagination/previous}}
      template block text
    {{/bp-pagination/previous}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
