import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
  this.route('bm-radio');
  this.route('bp-input');
  this.route('bp-search-bar');
  this.route('show-button');
  this.route('button-group');
  this.route('layout');
  this.route('card');
  this.route('dropdown');
  this.route('show-nav');
  this.route('progress');
  this.route('modal');
  this.route('tabs');
  this.route('charts');
});

export default Router;
