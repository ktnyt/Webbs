
Ext.define('StoreModel', {
        extend: 'Ext.data.Model',
            //fields: [{name:'model'}]
            fields: [{name:'model_name'}]
            });

// make list of models
var store_model = Ext.create('Ext.data.Store', {
        storeId: 'store_model',
        model: 'StoreModel',
        sorters: ['model'],
        groupField: 'model'
    });

//E-Cellのモデルのデータベース読み込み
var ecell_model = Ext.create('Ext.grid.Panel', {
        autoScroll:true,
        flex: 1,
        border:false,
        iconCls:'nav',
        store: store_model,
        columns: [{
                text: 'Model Name',
                flex: 1,
                dataIndex: 'model_name'
            }],
    });

//////Insert info model data to Grid
var count = 0;
var model_name = ''
ecell_model.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
	//ecell_model.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
        params = { "ID": selectedRecord[0].data.model_name + ".em" };
        //send Ajax Request
	Ext.Ajax.request({
		//                url: "/ecell/test.cgi",
		url: "/dysuke/es/CreateValueList.cgi",
                    method: "GET",
                    params: params,
                    success: handleSuccess,
                    failure: handleFailure,
                    });
	count = count +1;
	model_name = selectedRecord[0].data.model_name;
    });
//モデルのアノテーションの取得
ecell_model.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
        params = { file_name: selectedRecord[0].data.model_name + ".em" };
        //send Ajax Request                                                                          
        Ext.Ajax.request({
                url: "/ecell/annotation_list.cgi",
                    method: "GET",
                    params: params,
                    success: annotationSuccess,
                    failure: annotationFailure,
                    });
    });

//モデルのPathwayMapの取得
ecell_model.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
        params = { file_name: selectedRecord[0].data.model_name + ".em" };
	console.log(selectedRecord[0].data.model_name);
        //send Ajax Request                                                                          
        Ext.Ajax.request({
                url: "/ecell/pathway_map.cgi",
                    method: "GET",
                    params: params,
                    success: mapSuccess,
                    failure: mapFailure,
                    });
    });
