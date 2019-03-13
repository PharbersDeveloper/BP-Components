import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('choose-group/item', 'Integration | Component | choose group/item', {
	integration: true
});

test('it renders', function (assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });

	this.render(hbs`{{choose-group/item}}`);

	assert.equal(this.$().text().trim(), '');

	// Template block usage:
	this.render(hbs`
    {{#choose-group/item}}
      template block text
    {{/choose-group/item}}
  `);

	assert.equal(this.$().text().trim(), 'template block text');
});
