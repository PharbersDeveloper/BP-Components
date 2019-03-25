import Component from '@ember/component';
import layout from '../templates/components/bp-circle';

export default Component.extend({
	layout,
	classNames: ['bp-radar'],
	init() {
		this._super(...arguments);
		this.set('result', {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			color: ['#00875A', '#36B37E ', '#57D9A3 ', '#79F2C0'],
			legend: {
				show: false,
				orient: 'vertical',
				x: 'left',
				data: ['业务数据策略分析', '重点目标客户管理', '行政工作', '代表及KPI分析']
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: ['50%', '60%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [
						{ value: 335, name: '业务数据策略分析' },
						{ value: 310, name: '重点目标客户管理' },
						{ value: 234, name: '行政工作' },
						{ value: 135, name: '代表及KPI分析' },
					]
				}
			]
		})
	}
});
