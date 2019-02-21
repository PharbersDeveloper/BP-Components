import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bp-page-header/footer', 'Integration | Component | bp page header/footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bp-page-header/footer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bp-page-header/footer}}
      template block text
    {{/bp-page-header/footer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
