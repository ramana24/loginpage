sap.ui.define(function() {
	"use strict";

	var Formatter = {

		
		Measure : function (oValue){
			var oValue;
	   
			if(oValue =="G"){
	   var oText= "Grams"
			  return oText;
	   
		   }else if(oValue == "KG"){
		   return "KiloGram";
		   }
		   else
		   {
			return oValue;
	   
		   }
	   },
	   MeasureState : function (oValue){
		var oValue;
   
		if(oValue =="G"){
   
		  return "Warning";
   
	   }else if(oValue == "KG"){
	   return "Success";
	   }
	   else
	   {
		return "Error";
   
	   }
   },
	   weightState :  function (fValue) {
		try {
			fValue = parseFloat(fValue);
			if (fValue < 0) {
				return "None";
			} else if (fValue < 1000) {
				return "Success";
			} else if (fValue < 2000) {
				return "Warning";
			} else {
				return "Error";
			}
		} catch (err) {
			return "None";
		}
	},
	


	};
	
	return Formatter;

}, /* bExport= */ true);
