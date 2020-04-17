// The dialog window to insert / edit a chart type pie.
CKEDITOR.dialog.add('chartPieDialog', function(editor) {
    // The number of rows in Edit Chart dialog window.
    var inputRows = editor.config.chart_maxitems || 12;

    var dialog = {
        title: editor.lang.chart.titleDialogBox,
        minWidth: 350,
        minHeight: 100,
        // Executed every time a dialog is shown.
        onShow: function() {
            var widget = editor.widgets.focused;

            if (!widget)
                return;

            // Merge data
            for (var j = 0 ; j < inputRows ; j++) {
                if (widget.data.values[j]) {
                    // toString() is used here to set correctly zero values.
                    this.setValueOf('data', 'label' + j, widget.data.values[j].label);
                    this.setValueOf('data', 'value' + j, widget.data.values[j].value.toString());
                    this.setValueOf('data', 'color' + j, widget.data.values[j].color);
                    this.setValueOf('data', 'highlight' + j, widget.data.values[j].highlight);
                }
            }

            this.setValueOf('options', 'canvasHeight', widget.data.canvasHeight);
            this.setValueOf('options', 'canvasWidth', widget.data.canvasWidth);
        },
        // Executed every time a dialog is closed (OK is pressed).
        onOk : function(evt) {
            var widget = this.widget,
                values = [];

            for (var j = 0 ; j < inputRows ; j++) {
                if (this.getValueOf('data', 'label' + j) != '' && this.getValueOf('data', 'value' + j) != '') {
                    values.push({
                        label: this.getValueOf('data', 'label' + j),
                        value: parseFloat(this.getValueOf('data', 'value' + j)),
                        color: this.getValueOf('data', 'color' + j),
                        highlight: this.getValueOf('data', 'highlight' + j)
                    });
                }
            }
            widget.setData('values', values);
            widget.setData('chart', this.getValueOf('data', 'chart'));
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
                        items: [[editor.lang.chart.labelChartPie, 'pie'],
                            [editor.lang.chart.labelChartDoughnut, 'doughnut'],
                            [editor.lang.chart.labelChartPolar, 'polar']],
                        'default': 'pie',
                        style: 'margin-bottom:10px',
                        setup: function(widget) {
                            this.setValue(widget.data.chart);
                        }
                    },
                    {
                        type: 'hbox',
                        children: [
                            {
                                type: 'vbox',
                                children: [
                                    {
                                        type: 'html',
                                        html: '<strong>' + editor.lang.chart.labl + '</strong>'
                                    }
                                ]
                            },
                            {
                                type: 'vbox',
                                children: [
                                    {
                                        type: 'html',
                                        html: '<strong>' + editor.lang.chart.labelValue + '</strong>'
                                    }
                                ]
                            },
                            {
                                type: 'vbox',
                                children: [
                                    {
                                        type: 'html',
                                        html: '<strong>' + editor.lang.chart.labelColor + '</strong>'
                                    }
                                ]
                            },
                            {
                                type: 'vbox',
                                children: [
                                    {
                                        type: 'html',
                                        html: '<strong>' + editor.lang.chart.labelHighliht + '</strong>'
                                    }
                                ]
                            }
                        ]
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
                                'default': 200,
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

    // Generate row in dialog box
    for (var i = 0 ; i < inputRows ; i++) {
        dialog.contents[0].elements[1].children[0].children.push({
            id: 'label' + i,
            type: 'text',
            width: '150px'
        });

        dialog.contents[0].elements[1].children[1].children.push({
            id: 'value' + i,
            type: 'text',
            width: '50px',
            validate: function() {
                var value = this.getValue(),
                    pass = (!value || !!(CKEDITOR.dialog.validate.number(value) && value >= 0));
                if (!pass) {
                    alert(editor.lang.chart.alertValidNumber);
                    this.select();
                }

                return pass;
            }
        });

        dialog.contents[0].elements[1].children[2].children.push({
            type: 'hbox',
            children: [
                {
                    id: 'color' + i,
                    type: 'text',
                    width: '75px'
                },
                {
                    type: 'button',
                    id: 'colorChoose' + i,
                    'class': 'colorChooser',
                    label: editor.lang.chart.buttonPicker,
                    onLoad: function() {
                        this.getElement().setStyle('margin-top', '0');
                        this.getElement().setStyle('width', '100px');
                    },
                    onClick: function(c) {
                        var inputID = 'color' + c.sender.id.split("colorChoose")[1];
                        editor.getColorFromDialog(function(a) {
                            a && this.getDialog().getContentElement('data', inputID).setValue(a);
                            this.focus()
                        }, this)
                    }
                }
            ]
        });

        dialog.contents[0].elements[1].children[3].children.push({
            type: 'hbox',
            children: [
                {
                    id: 'highlight' + i,
                    type: 'text',
                    width: '75px'
                },
                {
                    type: 'button',
                    id: 'highlightColorChoose' + i,
                    'class': 'colorChooser',
                    label: editor.lang.chart.buttonPicker,
                    onLoad: function() {
                        this.getElement().setStyle('margin-top', '0');
                        this.getElement().setStyle('width', '100px');
                    },
                    onClick: function(c) {
                        var inputID = 'highlight' + c.sender.id.split("highlightColorChoose")[1];
                        editor.getColorFromDialog(function(a) {
                            a && this.getDialog().getContentElement('data', inputID).setValue(a);
                            this.focus()
                        }, this)
                    }
                }
            ]
        });
    }
    return dialog;
});