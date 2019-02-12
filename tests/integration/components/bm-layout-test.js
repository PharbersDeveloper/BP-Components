import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bm-layout', 'Integration | Component | bm layout', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{bm-layout}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
    {{#bm-layout}}
      template block text
    {{/bm-layout}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});
