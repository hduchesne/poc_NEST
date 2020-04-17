// The dialog window to insert / edit a chart type bar.
CKEDITOR.dialog.add( 'chartBarDialog', function(editor) {
    // The number of rows in Edit Chart dialog window.
    var inputRows = editor.config.chart_maxitems || 12;

    var dialog = {
        title: editor.lang.chart.titleDialogBox,
        minWidth: 400,
        minHeight: 100,

        // Executed every time a dialog is shown.
        onShow: function() {
            var widget = editor.widgets.focused;
            if (!widget)
                return;

            var datasetsSize = widget.data.values.datasets.length;

            for (var j = 0 ; j < inputRows ; j++) {
                if (widget.data.values.labels[j] != undefined) {
                    this.setValueOf('data', 'label' + j, widget.data.values.labels[j]);
                    this.setValueOf('data', 'dataset1_value' + j, widget.data.values.datasets[0].data[j].toString());

                    if (datasetsSize > 1) {
                        this.setValueOf('data', 'dataset2_value' + j, widget.data.values.datasets[1].data[j].toString());
                    }
                }
            }

            setColorsValue(this, widget, 0);
            this.setValueOf('data', 'dataset1Label', widget.data.values.datasets[0].label);
            if (datasetsSize > 1) {
                setColorsValue(this, widget, 1);
                this.setValueOf('data', 'dataset2Label', widget.data.values.datasets[1].label);
            }

            this.setValueOf('options', 'canvasHeight', widget.data.canvasHeight);
            this.setValueOf('options', 'canvasWidth', widget.data.canvasWidth);
        },

        // Executed every time a dialog is closed (OK is pressed).
        onOk : function(evt) {
            var widget = this.widget,
                labels = [],
                dataset1 = [],
                dataset2 = [],
                chartModel = this.getValueOf('data', 'chart');

            for (var j = 0 ; j < inputRows ; j++) {
                if (this.getValueOf('data', 'label' + j)) {
                    labels.push(this.getValueOf('data', 'label' + j));

                    var value1 = (this.getValueOf('data', 'dataset1_value' + j) != '') ?  parseFloat(this.getValueOf('data', 'dataset1_value' + j)): 0;
                    dataset1.push(value1);

                    var value2 = (this.getValueOf('data', 'dataset2_value' + j) != '') ?  parseFloat(this.getValueOf('data', 'dataset2_value' + j)) : 0;
                    dataset2.push(value2);
                }
            }

            // Check is they have value other than 0 in the second dataset
            var total = 0;
            for (var n in dataset2) {
                total += dataset2[n];
            }
            if (total == 0)
                dataset2 = [];

            var values = {labels: labels, datasets: []};

            addDatasetToValues(this, chartModel, values, 0, dataset1);
            if (dataset2.length > 0) {
                addDatasetToValues(this, chartModel, values, 1, dataset2);
            }

            widget.setData('values', values);
            widget.setData('chart', chartModel);
            widget.setData('canvasHeight', this.getValueOf('options', 'canvasHeight'));
            widget.setData('canvasWidth', this.getValueOf('options', 'canvasWidth'));
        },

        // Define elements in a dialog window.
        contents: [
            {
                id: 'data',
                label: editor.lang.chart.labelData,
                title: editor.lang.chart.labelData,
                elements: [
                    {
                        type: 'radio',
                        id: 'chart',
                        label: editor.lang.chart.labelChartType,
                        labelLayout: 'horizontal',
                        labelStyle: 'display:block;padding: 0 6px;',
                        items: [[editor.lang.chart.labelChartBar, 'bar'],
                            [editor.lang.chart.labelChartLine, 'line'],
                            [editor.lang.chart.labelChartRadar, 'radar']],
                        'default': 'bar',
                        style: 'margin-bottom:10px',
                        setup: function(widget) {
                            this.setValue(widget.data.chart);
                        }
                    },
                    {
                        type: 'html',
                        html: '<div>' + editor.lang.chart.textInfo1 + '</div>'
                    },
                    {
                        type: 'fieldset',
                        label: 'Labels',
                        children: [
                            {
                                type: 'html',
                                html: editor.lang.chart.textInfo5
                            },
                            {
                                type: 'hbox',
                                children: [
                                    {
                                        id: 'dataset1Label',
                                        type: 'text',
                                        label: editor.lang.chart.titleDataSet + ' #1'
                                    },
                                    {
                                        id: 'dataset2Label',
                                        type: 'text',
                                        label: editor.lang.chart.titleDataSet + ' #2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'hbox',
                        children: [
                            {
                                type: 'html',
                                html: '<strong>' + editor.lang.chart.titleLabel + '</strong>'
                            },
                            {
                                type: 'html',
                                html: '<strong>' + editor.lang.chart.titleDataSet + ' #1</strong>'
                            },
                            {
                                type: 'html',
                                html: '<strong>' + editor.lang.chart.titleDataSet + ' #2</strong>'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'colors0',
                label: editor.lang.chart.titleColorDataSet + ' #1',
                title: editor.lang.chart.titleColorDataSet + ' #1',
                elements: [
                    {
                        type: 'html',
                        html: '<div>' + editor.lang.chart.textInfo2 + '</div>'
                    }
                ]
            },
            {
                id: 'colors1',
                label: editor.lang.chart.titleColorDataSet + ' #2',
                title: editor.lang.chart.titleColorDataSet + ' #2',
                elements: [
                    {
                        type: 'html',
                        html: '<div>' + editor.lang.chart.textInfo3 + '</div>'
                    }
                ]
            },
            {
                id: 'options',
                label: editor.lang.chart.tittleChartOptions,
                title: editor.lang.chart.tittleChartOptions,
                elements: [
                    {
                        type: 'html',
                        html: '<div>' + editor.lang.chart.textInfo4 + '</div>'
                    },
                    {
                        type: 'hbox',
                        children: [
                            {
                                id: 'canvasHeight',
                                type: 'text',
                                'default': 200,
                                label: editor.lang.chart.labelHeight,
                                validate: function() {
                                    var value = this.getValue(),
                                        pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

                                    if (!pass) {
                                        alert(editor.lang.chart.alertValidNumber);
                                        this.select();
                                    }

                                    return pass;
                                }
                            },
                            {
                                id: 'canvasWidth',
                                type: 'text',
                                'default': 300,
                                label: editor.lang.chart.labelWidth,
                                validate: function() {
                                    var value = this.getValue(),
                                        pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

                                    if (!pass) {
                                        alert(editor.lang.chart.alertValidNumber);
                                        this.select();
                                    }

                                    return pass;
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    generateColorTabs(editor, dialog, 0);
    generateColorTabs(editor, dialog, 1);

    for (var i = 0 ; i < inputRows ; i++) {
        dialog.contents[0].elements.push({
            type : 'hbox',
            children:
                [
                    {
                        id: 'label' + i,
                        type: 'text'
                    },
                    {
                        id: 'dataset1_value' + i,
                        type: 'text',
                        validate: function() {
                            var value = this.getValue(),
                                pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

                            if (!pass) {
                                alert(editor.lang.chart.alertValidNumber);
                                this.select();
                            }

                            return pass;
                        }
                    },
                    {
                        id: 'dataset2_value' + i,
                        type: 'text',
                        validate: function() {
                            var value = this.getValue(),
                                pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));

                            if (!pass) {
                                alert(editor.lang.chart.alertValidNumber);
                                this.select();
                            }

                            return pass;
                        }
                    }
                ]
        } );
    }
    return dialog;
});

/**
 *	This method set the colors value in the tab
 */
function setColorsValue(that, widget, tabNumber) {
    that.setValueOf('colors' + tabNumber, 'fillColor', widget.data.values.datasets[tabNumber].fillColor);
    that.setValueOf('colors' + tabNumber, 'strokeColor', widget.data.values.datasets[tabNumber].strokeColor);
    if (widget.data.chart == 'bar') {
        that.setValueOf('colors' + tabNumber, 'highlightFill', widget.data.values.datasets[tabNumber].highlightFill);
        that.setValueOf('colors' + tabNumber, 'highlightStroke', widget.data.values.datasets[tabNumber].highlightStroke);
    } else {
        that.setValueOf('colors' + tabNumber, 'pointColor', widget.data.values.datasets[tabNumber].pointColor);
        that.setValueOf('colors' + tabNumber, 'pointStrokeColor', widget.data.values.datasets[tabNumber].pointStrokeColor);
        that.setValueOf('colors' + tabNumber, 'pointHighlightFill', widget.data.values.datasets[tabNumber].pointHighlightFill);
        that.setValueOf('colors' + tabNumber, 'pointHighlightStroke', widget.data.values.datasets[tabNumber].pointHighlightStroke);
    }
}

/**
 *	This method add dataset to the values object
 */
function addDatasetToValues(that, chartModel, values, tabNumber, dataset) {
    if (chartModel == 'bar') {
        values.datasets[tabNumber] = {
            label: that.getValueOf('data', 'dataset1Label'),
            fillColor: that.getValueOf('colors' + tabNumber, 'fillColor'),
            strokeColor: that.getValueOf('colors' + tabNumber, 'strokeColor'),
            highlightFill: that.getValueOf('colors' + tabNumber, 'highlightFill'),
            highlightStroke: that.getValueOf('colors' + tabNumber, 'highlightStroke'),
            data: dataset
        };
    } else {
        values.datasets[tabNumber] = {
            label: that.getValueOf('data', 'dataset1Label'),
            fillColor: that.getValueOf('colors' + tabNumber, 'fillColor'),
            strokeColor: that.getValueOf('colors' + tabNumber, 'strokeColor'),
            pointColor: that.getValueOf('colors' + tabNumber, 'pointColor'),
            pointStrokeColor: that.getValueOf('colors' + tabNumber, 'pointStrokeColor'),
            pointHighlightFill: that.getValueOf('colors' + tabNumber, 'pointHighlightFill'),
            pointHighlightStroke: that.getValueOf('colors' + tabNumber, 'pointHighlightStroke'),
            data: dataset
        };
    }
}

/**
 *	This Method generate colors tabs, as the tabs are similar
 */
function generateColorTabs(editor, dialog, tabNumber) {
    // default colors we will inject in the tabs
    var defaultColors = [
        {
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            pointColor: "rgba(220,220,220,1)",
            pointHighlightStroke: "rgba(220,220,220,1)"
        },
        {
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            highlightFill: 'rgba(151,187,205,0.75)',
            highlightStroke: 'rgba(151,187,205,1)',
            pointColor: "rgba(151,187,205,1)",
            pointHighlightStroke: "rgba(151,187,205,1)"
        }];

    // tabs contents
    dialog.contents[tabNumber + 1].elements.push({
            type: 'fieldset',
            label: editor.lang.chart.labelCoreColor,
            children: [
                {
                    type: 'hbox',
                    children: [
                        {
                            type: 'text',
                            id: 'fillColor',
                            label: editor.lang.chart.labelFillColor,
                            'default': defaultColors[tabNumber].fillColor,
                            labelLayout: 'vertical',
                            width: '150px'
                        },
                        {
                            type: 'button',
                            id: 'fillColorChoose',
                            'class': 'colorChooser',
                            label: editor.lang.chart.buttonPicker,
                            onLoad: function() {
                                this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                this.getElement().getParent().setStyle('width', '22%');
                                this.getElement().setStyle('width', '100px');
                                this.getElement().setStyle('float', 'right');
                                this.getElement().setStyle('margin-right', '25px');
                            },
                            onClick: function() {
                                editor.getColorFromDialog(function(a) {
                                    a && this.getDialog().getContentElement('colors' + tabNumber, 'fillColor').setValue(a);
                                    this.focus()
                                }, this)
                            }
                        },
                        {
                            type: 'text',
                            id: 'strokeColor',
                            label: editor.lang.chart.labelStrokeColor,
                            'default': defaultColors[tabNumber].strokeColor,
                            labelLayout: 'vertical',
                            width: '150px'
                        },
                        {
                            type: 'button',
                            id: 'strokeColorChoose',
                            'class': 'colorChooser',
                            label: editor.lang.chart.buttonPicker,
                            onLoad: function() {
                                this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                this.getElement().setStyle('width', '100px');
                                this.getElement().setStyle('float', 'right');
                            },
                            onClick: function() {
                                editor.getColorFromDialog(function(a) {
                                    a && this.getDialog().getContentElement('colors' + tabNumber, 'strokeColor').setValue(a);
                                    this.focus()
                                }, this)
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: 'hbox',
            children: [
                {
                    type: 'fieldset',
                    label: editor.lang.chart.labelBarColors,
                    children: [
                        {
                            type: 'hbox',
                            style: 'margin-bottom: 15px',
                            children: [
                                {
                                    type: 'text',
                                    id: 'highlightFill',
                                    label: editor.lang.chart.labelHighlihtFill,
                                    'default': defaultColors[tabNumber].highlightFill,
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'highlightFillColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'highlightFill').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        },
                        {
                            type: 'hbox',
                            children: [
                                {
                                    type: 'text',
                                    id: 'highlightStroke',
                                    label: editor.lang.chart.labelHighlihtStroke,
                                    'default': defaultColors[tabNumber].highlightStroke,
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'highlightStrokeColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'highlightStroke').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'fieldset',
                    label: editor.lang.chart.labelLineRadarColors,
                    children: [
                        {
                            type: 'hbox',
                            style: 'margin-bottom: 15px',
                            children: [
                                {
                                    type: 'text',
                                    id: 'pointColor',
                                    label: editor.lang.chart.labelPointColor,
                                    'default': defaultColors[tabNumber].pointColor,
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'pointColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'pointColor').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        },
                        {
                            type: 'hbox',
                            style: 'margin-bottom: 15px',
                            children: [
                                {
                                    type: 'text',
                                    id: 'pointStrokeColor',
                                    label: editor.lang.chart.labelPointStrokeColor,
                                    'default': '#fff',
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'pointStrokeColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'pointStrokeColor').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        },
                        {
                            type: 'hbox',
                            style: 'margin-bottom: 15px',
                            children: [
                                {
                                    type: 'text',
                                    id: 'pointHighlightFill',
                                    label: editor.lang.chart.labelPointHighlightFill,
                                    'default': '#fff',
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'pointHighlightFillColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'pointHighlightFill').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        },
                        {
                            type: 'hbox',
                            children: [
                                {
                                    type: 'text',
                                    id: 'pointHighlightStroke',
                                    label: 'Point highlight stroke',
                                    'default': defaultColors[tabNumber].pointHighlightStroke,
                                    labelLayout: 'vertical',
                                    width: '150px'
                                },
                                {
                                    type: 'button',
                                    id: 'pointHighlightStrokeColorChoose',
                                    'class': 'colorChooser',
                                    label: editor.lang.chart.buttonPicker,
                                    onLoad: function() {
                                        this.getElement().getParent().setStyle('vertical-align', 'bottom');
                                        this.getElement().setStyle('width', '100px');
                                        this.getElement().setStyle('float', 'right');
                                    },
                                    onClick: function() {
                                        editor.getColorFromDialog(function(a) {
                                            a && this.getDialog().getContentElement('colors' + tabNumber, 'pointHighlightStroke').setValue(a);
                                            this.focus()
                                        }, this)
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
}