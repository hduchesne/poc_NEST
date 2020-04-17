/**
 * @fileOverview charts plugin for CKEditor using Chart.js.
 */

'use strict';

// TODO make chart options configurable
(function() {
	CKEDITOR.plugins.add('chart', {
		// Add translation
		lang: 'en,fr,de',
		// Required plugins
		requires: 'widget,dialog,colordialog',
		// Name of the file in the "icons" folder
		icons: 'chartBar,chartPie',

		// Load library that renders charts inside CKEditor, if Chart object is not already available.
		afterInit: function(editor) {
			var plugin = this;

			if (typeof Chart  === 'undefined') {
				// Chart library is loaded asynchronously, so we can draw anything only once it's loaded.
				CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js'), function() {
					plugin.drawCharts();
				});
			}
		},

		// Function called on initialization of every editor instance created in the page.
		init: function(editor) {
			var plugin = this;

			// Inject required CSS stylesheet to classic editors because the <iframe> needs it.
			// Inline editors will ignore this, the developer is supposed to load chart.css directly on a page.
			// "this.path" is a path to the current plugin.
			editor.addContentsCss(CKEDITOR.getUrl(plugin.path + 'chart.css'));

			// A little bit of magic to support "Preview" feature in CKEditor (in a popup).
			// In order to transform downcasted widgets into nice charts we need to:
			// 1. Load the Chart.js library
			// 2. Load a helper script that will "upcast" widgets and initiate charts.
			editor.on('contentPreview', function(evt) {
				evt.data.dataValue = evt.data.dataValue.replace(/<\/head>/,
					'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js') + '"><\/script>' +
					'<script src="' + CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js') + '"><\/script><\/head>');
			});

			// Register our dialog file -- this.path is the plugin folder path.
			CKEDITOR.dialog.add( 'chartPieDialog', this.path + 'dialogs/chartPie.js' );

			// Register our dialog file -- this.path is the plugin folder path.
			CKEDITOR.dialog.add( 'chartBarDialog', this.path + 'dialogs/chartBar.js' );

			// Helper function that we'd like to run in case Chart.js library was loaded asynchronously.
			this.drawCharts = function() {
				// All available widgets are stored in an object, not an array.
				for (var id in editor.widgets.instances) {
					// The name was provided in editor.widgets.add()
					if (editor.widgets.instances[id].name == 'chart') {
						// Our "data" callback draws widgets, so let's call it.
						editor.widgets.instances[id].fire('data');
					}
				}
			};

			// Here we define the widget for chart type pie.
			editor.widgets.add('chartPie', {
				button: editor.lang.chart.buttonChartPie,
				dialog: 'chartPieDialog',
				template:'<div class="chartjs" data-chart="pie" data-chart-height="200" data-chart-width="200"><canvas height="200" width="200"></canvas><div class="chartjs-legend"></div></div>',
				styleableElements: 'div',
				pathName: 'chartPie',

				init: function() {
					if(this.element.data('chart-value')) {
						this.setData('values', JSON.parse(this.element.data('chart-value')));
					}

					this.setData('chart', this.element.data('chart'));
					this.setData('canvasHeight', this.element.data('chart-height'));
					this.setData('canvasWidth', this.element.data('chart-width'));

					this.on('dialog', function(evt) {
						evt.data.widget = this;
					}, this);
				},

				data: function() {
					if (typeof Chart === 'undefined')
						return;

					if (!this.data.values)
						return;

					var canvas = editor.document.createElement('canvas', {height: this.data.canvasHeight, width: this.data.canvasWidth});
					canvas.replace(this.element.getChild(0));
					canvas = canvas.$;

					var legend = this.element.getChild(1).$;
					legend.innerHTML = '';

					if (!canvas.getContext)
						return;

					renderCharts(canvas, this.data.chart, legend, this.data.values);
				},

				// ACF settings. Without allowing elements introduced by this plugin, CKEditor built-in filter would remove it.
				allowedContent:'div(!chartjs)[data-*]];jahia:resource',
				requiredContent: 'div(chartjs)[data-chart-value,data-chart,data-chart-height,data-chart-width];jahia:resource',

				// Executed when CKEditor loads content, when switching from source to wysiwyg mode. Makes HTML content a widget.
				upcast: function(element, data) {
					if (element.name == 'div' && element.hasClass('chartjs')
						&& (element.attributes['data-chart'] == 'pie'
						|| element.attributes['data-chart'] == 'doughnut'
						|| element.attributes['data-chart'] == 'polar')) {
						// Downcasted <div> could have contained some text like "chart" or &nbsp; which was there just to prevent <div>s from being deleted.
						// Get rid of it when upcasting.
						element.setHtml('');
						// Chart.js work on canvas elements, Prepare one.
						var canvas = new CKEDITOR.htmlParser.element('canvas', {height: element.attributes['data-chart-height'], width: element.attributes['data-chart-width']});
						element.add(canvas);
						// And make place for a legend.
						var div = new CKEDITOR.htmlParser.element('div', {'class':"chartjs-legend"});
						element.add(div);
						//var jahiaResource1 = new CKEDITOR.htmlParser.element('jahia:resource', {'src': CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js'), 'type': 'javascript'});
						//element.add(jahiaResource1);
						return element;
					}
				},

				// Executed when CKEditor returns content, when switching from wysiwyg to source mode. Transforms a widget back to a downcasted form.
				downcast: function(element) {
					// Should not happen unless someone has accidentally messed up ACF rules.
					if (!this.data.values)
						return;

					// Create the downcasted form of a widget (a simple <div>).
					var el = new CKEDITOR.htmlParser.element('div', {
						// We could pass here hardcoded "chartjs" class, but this way we would lose here all the classes applied through the Styles dropdown.
						// (In case someone defined his own styles for the chart widget)
						'class': element.attributes['class'],
						'data-chart': this.data.chart,
						'data-chart-height': this.data.canvasHeight,
						'data-chart-width': this.data.canvasWidth,
						'data-chart-value': JSON.stringify(this.data.values)
					});
					var jahiaResource1 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'chart.css'),
						'rel': 'stylesheet',
						'key': '',
						'type': 'css'
					});
					el.add(jahiaResource1);
					var jahiaResource2 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js'),
						'key': '',
						'type': 'javascript'
					});
					el.add(jahiaResource2);
					var jahiaResource3 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js'),
						'key': '',
						'type': 'javascript'
					});
					el.add(jahiaResource3);
					return el;
				}

			});

			// Here we define the widget for chart type bar.
			editor.widgets.add('chartBar', {
				// The *label* for the button. The button *name* is assigned automatically based on the widget name.
				button: editor.lang.chart.buttonChartBar,
				// Connect widget with a dialog defined earlier. So our toolbar button will open a dialog window.
				dialog : 'chartBarDialog',
				// Based on this template a widget will be created automatically once user exists the dialog window.
				template:'<div class="chartjs" data-chart="bar" data-chart-height="200" data-chart-width="300"><canvas height="200" width="300"></canvas><div class="chartjs-legend"></div></div>',
				// In order to provide styles (classes) for this widget through config.stylesSet we need to explicitly define the stylable elements.
				styleableElements: 'div',
				// Name to be displayed in the elements path (at the bottom of CKEditor),
				pathName: 'chartBar',

				// It is common to use the init method to populate widget data with information loaded from the DOM.
				init : function() {
					// When an empty widget is initialized after clicking a button in the toolbar, we do not have yet chart values.
					if (this.element.data('chart-value')) {
						this.setData('values', JSON.parse(this.element.data('chart-value')));
					}
					// Chart is specified in a template, so it is available even in an empty widget.
					this.setData('chart', this.element.data('chart'));
					this.setData('canvasHeight', this.element.data('chart-height'));
					this.setData('canvasWidth', this.element.data('chart-width'));

					// Pass the reference to this widget to the dialog. See "onOk" in the dialog definition, we needed widget there.
					this.on('dialog', function(evt) {
						evt.data.widget = this;
					}, this);
				},

				// Run when widget data is changed (widget is rendered for the first time, inserted, changed).
				data : function() {
					// Just in case Chart.js was loaded asynchronously and is not available yet.
					if (typeof Chart === 'undefined')
						return;
					// It's hard to draw a chart without numbers.
					if (!this.data.values)
						return;

					// It looks like Chartjs does not handle well updating charts.
					// When hovering over updated canvas old data is picked up sometimes, so we need to always replace an old canvas.
					var canvas = editor.document.createElement('canvas', {height: this.data.canvasHeight, width: this.data.canvasWidth});
					canvas.replace(this.element.getChild(0));
					canvas = canvas.$;

					var legend = this.element.getChild(1).$;
					legend.innerHTML = '';

					// IE8 can't handle the next part (without the help of excanvas etc.).
					if (!canvas.getContext)
						return;

					renderCharts(canvas, this.data.chart, legend, this.data.values);
				},

				// ACF settings. Without allowing elements introduced by this plugin, CKEditor built-in filter would remove it.
				allowedContent:'div(!chartjs)[data-*];jahia:resource',
				requiredContent: 'div(chartjs)[data-chart-value,data-chart,data-chart-height,data-chart-width];jahia:resource',

				// Executed when CKEditor loads content, when switching from source to wysiwyg mode. Makes HTML content a widget.
				upcast: function(element, data) {
					if (element.name == 'div' && element.hasClass('chartjs')
						&& (element.attributes['data-chart'] == 'bar'
						|| element.attributes['data-chart'] == 'line'
						|| element.attributes['data-chart'] == 'radar')) {
						// Downcasted <div> could have contained some text like "chart" or &nbsp; which was there just to prevent <div>s from being deleted.
						// Get rid of it when upcasting.
						element.setHtml('');
						// Chart.js work on canvas elements, Prepare one.
						var canvas = new CKEDITOR.htmlParser.element('canvas', {height: element.attributes['data-chart-height'], width: element.attributes['data-chart-width']});
						element.add(canvas);
						// And make place for a legend.
						var div = new CKEDITOR.htmlParser.element('div', {'class': 'chartjs-legend'});
						element.add(div);
						return element;
					}
				},

				// Executed when CKEditor returns content, when switching from wysiwyg to source mode. Transforms a widget back to a downcasted form.
				downcast: function(element) {
					// Should not happen unless someone has accidentally messed up ACF rules.
					if (!this.data.values)
						return;

					// Create the downcasted form of a widget (a simple <div>).
					var el = new CKEDITOR.htmlParser.element('div', {
						// We could pass here hardcoded "chartjs" class, but this way we would lose here all the classes applied through the Styles dropdown.
						// (In case someone defined his own styles for the chart widget)
						'class': element.attributes['class'],
						'data-chart': this.data.chart,
						'data-chart-height': this.data.canvasHeight,
						'data-chart-width': this.data.canvasWidth,
						'data-chart-value': JSON.stringify(this.data.values)
					});
					var jahiaResource1 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'chart.css'),
						'rel': 'stylesheet',
						'key': '',
						'type': 'css'
					});
					el.add(jahiaResource1);
					var jahiaResource2 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'lib/chart.min.js'),
						'key': '',
						'type': 'javascript'
					});
					el.add(jahiaResource2);
					var jahiaResource3 = new CKEDITOR.htmlParser.element('jahia:resource', {
						'path': CKEDITOR.getUrl(plugin.path + 'lib/widget2chart.js'),
						'key': '',
						'type': 'javascript'
					});
					el.add(jahiaResource3);
					return el;
				}
			});
		}
	});
})();

/**
 *	This method display chart in CKeditor
 */
function renderCharts(canvas, chartModel, legend, values) {
	// Prepare canvas and chart instance.
	var ctx = canvas.getContext('2d'),
		chart = new Chart(ctx);

	// Render Line chart.
	if (chartModel == 'bar') {
		var currentChart = chart.Bar(values);

		// For "Bar" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart);
	}
	else if (chartModel == 'line') {
		var currentChart = chart.Line(values);

		// For "Line" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart)
	}
	else if (chartModel == 'radar') {
		var currentChart = chart.Radar(values);

		// For "Radar" type legend makes sense only with more than one dataset.
		setLegend(values, legend, currentChart)
	}
	// Render Pie chart and legend.
	else if (chartModel == 'pie') {
		legend.innerHTML = chart.Pie(values).generateLegend();
	}
	// Render Doughnut chart and legend.
	else if (chartModel == 'doughnut') {
		legend.innerHTML = chart.Doughnut(values).generateLegend();
	}
	// Render Polar chart and legend.
	else if (chartModel == 'polar') {
		legend.innerHTML = chart.PolarArea(values).generateLegend();
	}
}

function setLegend(values, legend, currentChart) {
	if (values.datasets.length > 1) {
		legend.innerHTML = currentChart.generateLegend();
	}
}