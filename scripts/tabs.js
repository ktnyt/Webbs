
// initial Grids
var ini_Grid = [
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' '],
		[' ', , , ,' '],[' ', , , ,' '],[' ', , , ,' ']
		];

// Definition Columns
function variable_grid(){
    //make the cell to edit
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
    var v_sm = Ext.create('Ext.selection.CheckboxModel');     //Checkbox for CreateLogger
    var v_store = Ext.create('Ext.data.ArrayStore', {
	    fields: [{name: 'v_id'}, {name: 'path'}, {name: 'value', type: 'float'}, {name: 'molarconc', type: 'float'}],
	    data: ini_Grid
	});
    var v_grid = Ext.create('Ext.grid.Panel',{
	    title: 'Variable',
		height: '100%',
		columnWidth: 3.5/10,
		split: true,
		store: v_store,
		selModel: v_sm,
		columns: [{
		    text: 'ID', sortable : true, dataIndex: 'v_id', columWidth: 1/5
			},{
		    text: 'Path', sortable : true, dataIndex: 'path', columWidth: 3/10
			},{
		    text: 'Value', sortable : true, dataIndex: 'value', columWidth: 1/4, renderer: change, editor:{xtype: 'numberfield', allowBlank: false}
		},{
		    text: 'Molar Conc', width : 150, sortable : true, dataIndex: 'molarconc', columWidth: 1/4, renderer: change, editor:{xtype: 'numberfield', allowBlank: false}
		}],
		plugins: [cellEditing]
	});

    //change Value or MolarConc
    v_grid.on('edit', function(editor, e) {
	    alert("fuck");
	    var gridrecord = v_grid.getSelectionModel().getSelection();
	    //            var gridrecord = variable_grid.getSelectionModel().getSelection();
	    //alert(gridrecord[0].data);
	    
	    //written by Duke
	    var v_ID = gridrecord[0].data.v_id;
	    var Path = gridrecord[0].data.path;
	    var path_ID = Path +"/"+ v_ID;
	    var set_value = e.value;
	    console.log(set_value);
	    
	    //SetValue_sucsess
	    function set_value_success(response){
		if (response.responseText !== undefined) {
		    var resultJSON = JSON.parse(response.responseText);
		    console.log(resultJSON);
		}
	    }
	    //v_grid.getStore().loadData(responseJSON);    
		    
	    //SetValue_failure
            function set_value_failure(response){
                if (response.responseText !== undefined) {
                    alert("Missed setting value")
                        }
            }
	    
            //SetValue
            var params = { "sessionID":session_ID,"PathID":path_ID,"setValue":set_value};
            Ext.Ajax.request({
                    url: "/dysuke/es/SetValue.cgi",
                        method: "GET",
                        params: params,
                        success: set_value_success,
                        failure: set_value_failure,
                        });
	});
    //    v_grid.getStore().loadData(responseJSON);
    return v_grid;
    


//return this;






};


function process_grid(){
    var p_store = Ext.create('Ext.data.ArrayStore', {
	    fields: [{name: 'p_id'}, {name: 'p_path'}, {name: 'activity',  type: 'float'}, {name: 'm_activity',  type: 'float'}, {name: 'classname'}, {name: 'expression'}, {name: 'v_r_l'}, {name: 'property'}],
	    data: ini_Grid
	});    
    return Ext.create('Ext.grid.Panel',{
	    title: 'Process',
		columnWidth: 3.5/10,
		height: '100%',
		store: p_store,
		split: true,
		margin: '0 3 0 0',
		columns: [{
		    text: 'ID', sortable : true, dataIndex: 'p_id', columWidth: 1/5
			},{
		    text: 'Path', sortable : true, dataIndex: 'p_path', columWidth: 3/10
			},{
		    text: 'Activity', sortable : true, dataIndex: 'activity', columWidth: 2/10, renderer: change
			},{
		    text: 'Molar Activity', sortable : true, dataIndex: 'm_activity', columWidth: 2/10, renderer: change
			},{
		    text: 'ClassName', sortable : true, dataIndex: 'classname', columWidth: 1/10
		        }],
		listeners:{
		selectionchange: function(model, records) {
		    var gridrecord = this.getSelectionModel().getSelection();
		    console.log(gridrecord[0].data.p_path);
		    var PATH = gridrecord[0].data.p_path + ":" + gridrecord[0].data.p_id;
		    
		    params.PATH = PATH;
		    params.sessionID = session_ID;
		    
		    if (records[0]) {
			Ext.Ajax.request({
				url: "/dysuke/es/getEachProcessProperty.cgi",
				    method: "GET",
				    params: params,
				    success: getPropertySuccess,
				    failure: getPropertyFailure,
				    });		    
		    }
		}
	    }
	});
    //    process_grid.getStore().loadData(responseJSON);
    return process_grid;    
};

function meta_grid(){
    var meta_column ={
	xtype: 'form',
	border: false,
	columnWidth: 3/10,
	margin: '0 2 0 0',
	items: [{
		title: 'Simulation Time',
		xtype: 'fieldset',
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Start Time',
			value: '0'
		    },{
			fieldLabel: 'End Time',
			value: '100'
		    }]
	    },{
		title: 'Property Details(editable)',
		xtype: 'fieldset',
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'ID',
			name: 'p_id',
			id: 'process_ID',
			value: ''
		    },{
			fieldLabel: 'Expression',
			name: 'expression',
			xtype: 'textareafield',
		    },{
			fieldLabel: 'Variable Reference List',
			name: 'v_r_l',
			xtype: 'textareafield',
		    },{
			fieldLabel: 'Property List',
			xtype: 'textareafield',
		    }]
	    },{
		xtype: 'panel',
		border: false,
		style: { "background-color": '#ffffff', "text-align": 'center'  },
		items: [Ext.create('Ext.Button', {
			    text: 'Simulation Start',
			    scale: 'large',
			    width: 250,
			    handler: function() {
				var params = { "session_ID": session_ID };
				Ext.Ajax.request({
					url: "/ecell/python_jy3.cgi",
					    method: "GET",
					    params: params,
					    success: result_graph_success,
					    failure: result_graph_failure
					    });
			    }
			})]
	    }]
    };
    return meta_column;
};

var entity_panel = Ext.create('Ext.tab.Panel',{
	layout: 'fit',
	border: false,
	items:[{
		title: 'Entity',
		width: "100%",
		height: '100%',
		border: false,
		layout: 'column',
		items:[ variable_grid( ini_Grid ), process_grid( ini_Grid ), meta_grid(ini_Grid)]
	    }]
    });

var tabs = Ext.create('Ext.tab.Panel',{
	layout:'fit',
	renderTo: document.body,
	margin: '0 1 0 0',
	items: [{
		title: 'Model Name',
		layout:'fit',
		border: false,
		items:[entity_panel]
	    }]
    });

