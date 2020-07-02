sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
	"use strict";

	return Controller.extend("lauro.viaCEP.controller.View1", {
		onInit: function () {

			var oModel = new JSONModel();
			this.getView().setModel(oModel);

		},

		onChange: function (oEvent) {
			var oSearchField = this.getView().byId("sfCEP");
			var sQuery = oEvent.getParameter("newValue");
			if (sQuery.length >= 8) {
				oSearchField.setShowSearchButton(true);
			} else {
				oSearchField.setShowSearchButton(false);
			}

		},

		onSearch: function (oEvent) {

			function isQueryValid(sQuery) {

				var numbers = /^[0-9]+$/;
				if (sQuery.match(numbers)) {
					return true;
				} else {
					return false;
				}
			}

			var sQuery = oEvent.getParameter("query");
			if (isQueryValid(sQuery)) {

				var oView = this.getView();
				var oForm = oView.byId("formCEP");
				var oModel = oView.getModel();

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

			} else {
				MessageBox.error("CEP '" + sQuery + "' inválido");
			}
		}

	});
});