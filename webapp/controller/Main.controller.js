sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
            "sap/m/MessageToast",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageBox,MessageToast) {
		"use strict";

		return Controller.extend("ux.loginpage.controller.Main", {
			onInit: function () {

            },
            login:function(){

                var oMail= this.getView().byId("mail").getValue();
				var oPwd =this.getView().byId("pwd").getValue();
				
				if(oMail !=="" && oMail===oPwd){
					MessageBox.success("Your are logged in.");
				}else{
						MessageBox.error("Please verfiy. Username Password combination is incorrect.");
					}
					
            },

            onSignupPress:function(){
					MessageToast.show("Thanks for Signing up.");
				}
            
		});
	});
