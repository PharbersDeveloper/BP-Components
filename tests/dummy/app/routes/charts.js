import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return {
			month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			xAxis: {
				type: 'category',
				data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			},
			tooltip: {
				trigger: 'axis'
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				data: [320, 332, 301, 334, 390, 330, 320, 345, 533, 342, 343, 232]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				data: [820, 932, 901, 934, 1290, 1330, 1320, 343, 222, 333, 111, 332]
			}]
		};
	}
});
