sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
            "sap/m/MessageToast",
			"ux/loginpage/util/formatter",
			"sap/ui/model/odata/v2/ODataModel",
			"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MBox,MessageToast,formatter,ODataModel,Filter,FilterOperator,exportLibrary,Spreadsheet) {
		"use strict";
//formatter: formatter,
		return Controller.extend("ux.loginpage.controller.Main", {
			onInit: function () {

				this._sServiceUrl="/sap/opu/odata/iwbep/GWSAMPLE_BASIC/";
				
            },
			createColumnConfig: function() {
				var aCols = [];
				var EdmType = exportLibrary.EdmType;
	
				aCols.push({
					label: 'Product',
					property: ['ProductID', 'Category'],
					type: EdmType.String,
					template: '{0}, {1}'
				});
	
				aCols.push({
					label: 'SupplierName',
					type: EdmType.String,
					property: 'SupplierName',
					scale: 0
				});
	
				aCols.push({
					label: 'Dimensions',
					property: ['Width','Depth','Height','DimUnit'],
					type: EdmType.String,
					template: '{0},{1},{2},{3}'
				});
	
				aCols.push({
					label: 'Weight',
					property: 'WeightMeasure',
					type: EdmType.String
				});
	
				aCols.push({
					label: 'Price',
					property: 'Price',
					type: EdmType.String
				});
	
				
	
				return aCols;
			},
            login:function(){

                var oMail= this.getView().byId("mail").getValue();
				var oPwd =this.getView().byId("pwd").getValue();
				
				if(oMail !=="" && oMail===oPwd){
					MBox.success("Your are logged in.");
				}else{
					MBox.error("Please verfiy. Username Password combination is incorrect.");
					}
					
            },

			onSearch: function (oEvent) {
				var oTableSearchState = [],
					sQuery = oEvent.getParameter("query");
	
				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("ProductID", FilterOperator.Contains, sQuery)];
				}
	
				this.getView().byId("idProductsTable").getBinding("items").filter(oTableSearchState, "Application");
			},

            onSignupPress:function(){
					MessageToast.show("Thanks for Signing up.");
				},

				onExport: function() {
					var aCols, oRowBinding, oSettings, oSheet, oTable;
					
		
					if (!this._oTable) {
						this._oTable = this.byId('idProductsTable');
					}
		
					oTable = this._oTable;
					oRowBinding = oTable.getBinding('items');


					// Optional : To fetch url from manifest
      const entryPath = "/ux/loginpage/dataSources/mainService/uri";
      const serviceUrl = this.getOwnerComponent().getManifestEntry(entryPath);
				
		
					aCols = this.createColumnConfig();
		var oModelData = this.getView().byId("idProductsTable").getModel().oData;
					var oModel = oRowBinding.getModel();
	
					// oSettings = {
					// 	workbook: {
					// 		columns: aCols,
					// 		hierarchyLevel: 'Level'
					// 	},
					// 	dataSource: oModelData,
					// 	fileName: 'Table export sample.xlsx'
					// //	worker: false // We need to disable worker because we are using a MockServer as OData Service
					// };
					oSettings = {
						workbook: {
									columns: aCols,
							// 		hierarchyLevel: 'Level'
								},
								dataSource:{		
						type: "OData",
                    useBatch: true,
                  serviceUrl: this._sServiceUrl,
                     headers: oRowBinding.getModel().getHeaders(),
                     dataUrl: oRowBinding.getDownloadUrl(), // includes the $expand param.
          /*E.g.*/ count: oRowBinding.getLength(), // usually: listBinding.getLength()
          /*E.g.*/ sizeLimit: 5,
					},
					fileName: 'Table export sample.xlsx',
					worker: true
				};
		
					oSheet = new Spreadsheet(oSettings);
					oSheet.build().finally(function() {
						oSheet.destroy();
					});
				},
            
		});
	});
