sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("lauro.viaCEP.controller.View1", {
		onInit: function () {

			var oModel = new JSONModel();
			this.getView().setModel(oModel);

		},

		onSearch: function (oEvent) {

			var oView = this.getView();
			var oForm = oView.byId("formCEP");
			var oModel = oView.getModel();
			var sQuery = oEvent.getParameter("query");

			if (!sQuery) {

				oModel.setData({
					emptyData: {}
				});

				oForm.setVisible(false);

				return;
			}

			var sURL = "https://viacep.com.br/ws/" + sQuery + "/json/";

			$.get(sURL, function (data, status) {
				oModel.setData(data);
				oForm.setVisible(true);
			});

		}
	});
});