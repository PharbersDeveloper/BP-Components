import Component from '@ember/component';
import layout from '../../templates/components/bp-table/body';
import { computed } from '@ember/object';
import {htmlSafe} from '@ember/template';
import { equal }  from '@ember/object/computed';
import $ from 'jquery';

export default Component.extend({
  layout,
  classNames:['bp-table-tbody-wrapper'],
  classNameBindings: ['isHover:row-hover'],
  attributeBindings: ['style'],
  elementId: 'bp-tbody',
  hover: true,
  /**
   * @author Frank Wang
   * @property
   * @name isHover
   * @description 为 row 添加 hover 样式
   * @type {Boolean}
   * @default false
   * @private
  */
  isHover: equal('hover',true),
  /**
   * @author Frank Wang
   * @property
   * @name hasBorder
   * @description add's border for td
   * @type {String}
   * @default ''
   * @private
  */
  hasBorder: computed('border',function() {
    
    let border = this.get('border');
    
    return htmlSafe(border?`border-bottom: 0.5px solid rgba(9,30,66,0.08);`:'');

  }),
  didInsertElement() {
    this._super(...arguments)

    // Register your events here
    // this.$(document).on('#bp-tbody', 'body', this.eventHandler)
    // this.$(window).bind('scroll', this.eventHandler);
    // this.$ if the element is located inside the component
      var onScroll, _this = this;
  
      onScroll = function(){ 
        console.log('ddd')
          return _this.scrolled(); 
      };
  
      $(document).bind('touchmove', onScroll);
      $(window).bind('scroll', onScroll);
  
    },

  willDestroyElement() {
    this._super(...arguments)

    $(document).off('bp-tbody')
    // this.$ if the element is located inside the component
  },

  eventHandler(ev) {
    alert('something')
    console.log(ev)
      //Do sth with event
  }
  
});
