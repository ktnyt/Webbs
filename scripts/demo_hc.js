$(document).ready(function() {
	var chart = new Highcharts.Chart({
		chart: {
		    renderTo: 'container', //表示するid名
		    defaultSeriesType: 'line', //グラフのタイプline, spline, area, areaspline, column, bar, pie,scatter
		    margin: [50, 150, 60, 80] //余白
		},
		title: {
		    text: '月別平均気温', //グラフタイトル
		    style: {margin: '10px 100px 0 0' } // 余白
		},
		subtitle: {
		    text: '出典：日本気象協会', //サブタイトル
		    style: {margin: '0 100px 0 0' }// 余白
		},
		xAxis: { //X軸
		    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], //ラベル
		    title: {text: '月'} //タイトル
		},
		yAxis: { //Y軸
		    title: {text: '気温 (°C)'}, //タイトル
		    plotLines: [{ //ラインのスタイル
			    value: 0, 
			    width: 1,
			    color: '#808080'
			}]
		},
		tooltip: { //ツールチップ
		    formatter: function() {
			return ''+ this.series.name +''+ this.x +': '+ this.y +'°C'; }
		},
		legend: { //項目名
		    layout: 'vertical',
		    style: {
			left: 'auto',
			bottom: 'auto',
			right: '10px',
			top: '100px'
		    }
		},
		series: [ //ここからグラフ内容指定
	{ 
	    name: '東京',
	    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	}, {
	    name: 'NY',
	    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
	}, {
	    name: 'ベルリン',
	    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	}, {
	    name: 'ロンドン',
	    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	}]
	    });
    });