import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-page-header/right', 'Integration | Component | bp page header/right', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-page-header/right}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-page-header/right}}
      template block text
    {{/bp-page-header/right}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
