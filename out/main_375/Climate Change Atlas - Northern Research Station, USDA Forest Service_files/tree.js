		function getPercentage( inTotal, inCategory ) {
			var percentage = ( inCategory / inTotal ) * 100;
			return Math.round( percentage );
		}
		
		function disableShift() {
			$(".switch-field input").attr('disabled','disabled');
			$(".switch-field label").removeClass("allow").addClass("disallow");
			$("#shift-yes").prop('checked', false);
			$("#shift-no").prop('checked', true);
		}
	
		function hideTable() {
			$("#statTable").hide();
		}	
	
		function showTable() {
			$("#statTable").show();
		}
	
		function enableShift() { // Check logic - may need to set gcm to gcm
			$("#selGCM option.model").show().removeAttr('disabled');
			$(".switch-field input").removeAttr('disabled');
			$(".switch-field label").removeClass("disallow").addClass("allow");
		}
	
		function checkShift() {
			var shiftCheck = $("#selMap").val();
			if(shiftCheck == "gcm") {
				enableShift();
			} else {
				disableShift();
			}
		}
		
		function currentOnly() {
			var intRel = $("#ModRel").val();
			if(intRel == 0) {
				$("#selMap").prop('disabled', true);
				$("#selGCM").prop('disabled', true);
			}
		}

	function manageUnderMenu() {
		var currMap = $("#selMap").val();
		var intClim = $("#selMap").find(':selected').data('climate');
		var intPred = $("#selMap").find(':selected').data('pred');
		var mapFile = $("#selMap").find(':selected').data('map');
		var legFile = $("#selMap").find(':selected').data('legend');
		if(intPred == 1) {
			// Disable Shift
			disableShift();
			// Predictor - Enable current
			$("#selGCM option.current").show().removeAttr('disabled');
			// check for climate
			if(intClim == 1) {
				// Hide model
				$("#selGCM option.model").hide();
				$("#selGCM option.current").prop('selected', true);
				$("#selGCM option.predClimate").show().removeAttr('disabled');
				$("#selGCM optgroup.predClimate").show().removeAttr('disabled');
			} else {
				// disable and hide prediction options
				$("#selGCM option.current").prop('selected', true);
				$("#selGCM option.predClimate").attr('disabled','disabled').hide();
				$("#selGCM optgroup.predClimate").attr('disabled','disabled').hide();				
			}
		} else {
			checkShift();
			// disable and hide prediction options
			$("#selGCM option.predClimate").attr('disabled','disabled').hide();
			$("#selGCM optgroup.predClimate").attr('disabled','disabled').hide();
			if(intClim == 1) {
				var selGCM = $("#selGCM").val();
				$("#selGCM option.current").attr('disabled','disabled')
				$("#selGCM option.model").show().removeAttr('disabled');
				if(selGCM != "45") $("#selGCM option.model[value='85']").prop('selected', true);
			} else {
				$("#selGCM option.current").removeAttr('disabled').prop('selected', true);
				$("#selGCM option.model").show().attr('disabled','disabled');
			}
			
		}
	}
	
	// Interpretation help
	//	function addTooltip() {
	//		$("#sppNarrative").text(function () {
	//			return $(this).text().replace("SHIFT", "<span class=\"tooltip\" title=\"A model that calculates the likelihood of colonization, for each 1x1 km cell, based on current abundance over an approximately 100-year time period to match the future suitable habitats predicted by DISTRIB-II.\">SHIFT</span>"); 	//									
	//		});
	//	}
	
		function getPredMap() {
			hideTable();
			var imgBase = "/nrs/atlas/tree/v4/maps/800/";
			var lgdBase = "/nrs/atlas/tree/v4/legends/"
			var imgDir;			
			var intClim = $("#selMap").find(':selected').data('climate');
			var intPred = $("#selMap").find(':selected').data('pred');
			var mapFile = $("#selMap").find(':selected').data('map');
			var legFile = $("#selMap").find(':selected').data('legend');
			//var intPred = climateCheck();
			var prefix = "";
			var selMap = $("#selMap option:selected").text();
			//console.log("My scenario: " + selMap);
			if(intPred == 1) {
				if(intClim == 1) {
					// enable under menu
					//enableScenario();
					// Get gcm and scenario
					var predGCM = $("#selGCM").find(':selected').data('scenario');
					var predScenario = $("#selGCM").find(':selected').data('gcm');
					if(predScenario) {
						prefix = predScenario + predGCM + "_";
					} else {
						//prefix = "ccsm" + gcm + "_";
						prefix = "";
					}
				} else {
					//disableScenario();				
				}
				// display current
				imgDir = imgBase + prefix + mapFile;
				$("#current_legend img").attr('src',lgdBase + legFile);
				$("#current_legend img").attr('alt',"Legend for " + selMap);
				return imgDir;
			}
		}
	
		function getLegend() {
			var legFile = $("#selMap").find(':selected').data('legend');
			if(!legFile) {
				legFile = "rfmod_leg.gif";
			}
			legFile = "/nrs/atlas/tree/v4/legends/" + legFile;
			//console.log("Legend: " + legFile);
			return legFile;
		}
	
		function buidLabel() {
			// Check for SHIFT
			var isShift = $("#shift-yes:checked").length > 0;
			console.log("Is SHIFT On?" + isShift);			
		}
	
		function drawMap() {
			$(".dataRow").hide();
			$("#shiftHelp").hide();
			var imgBase = "/nrs/atlas/tree/v4/maps/800/";
			var imgDir;
			var currMap = $("#selMap").val();
			var intClim = $("#selMap").find(':selected').data('climate');
			var intPred = $("#selMap").find(':selected').data('pred');
			var mapFile = $("#selMap").find(':selected').data('map');
			var legFile = $("#selMap").find(':selected').data('legend');			
			var SHIFT = $("input[name='switch']:checked").val();
			var selMapText = $("#selMap option:selected").text();
			var src;
			console.log(SHIFT);
			var gcm = $("#selGCM").val()

			var intSpp = $("#spp").val();
			var map = $("#selMap").val();
			var tableRow = map + gcm;
			var shiftLabel = "";
			if(SHIFT == "yes" && map == "gcm") {
				src = imgBase + intSpp + "_shift_" + gcm + ".png";
				$("#current_legend img").attr('src','/nrs/atlas/tree/v4/legends/shift_lgd.png');
				shiftLabel = "DISTRIB-II + SHIFT: ";
				$("#shiftHelp").show();
			} else {
				checkShift();
				var strLegend = getLegend();
				$("#current_legend img").attr('src',strLegend);
				$("#current_legend img").attr('alt',"Legend for selMapText");
				if (intPred == 0) {
					showTable();
					src = imgBase + intSpp + "_hybrid_d2_" + map + gcm + ".png";
				} else {
					src= getPredMap();
				}
			}
			//src = src + gcm + ".png";
			// Get labels and alt text
			var labelMap = $("#selMap option:selected" ).text();
			var labelEm = $("#selGCM").find(':selected').data('scenario');
			var labelGCM = $("#selGCM option:selected" ).text();
			console.log(src);
			$("#imgMap").attr('src',src).attr('alt',labelMap + " under " + labelGCM);
			//$("#mapLabel").html(shiftLabel + labelMap + " under " + labelEm + " " + labelGCM);
			$("#mapLabel").html(shiftLabel + labelMap + " under " + labelGCM);
			//console.log("Show: " + "#tr_" +tableRow);
			$("#tr_" +tableRow).show();
		}
 	
		function loadShift(inId) {
			hideTable();
			var gcmOpt;
			gcmOpt = $("#"+inId).data("gcm"); 
			console.log("In ID: " + inId);
			//$("#selGCM").val(gcmOpt);
			enableShift();
			$("#selGCM option.model[value='" + gcmOpt + "']").prop('selected', true);
			$("#selMap").val("gcm");
			$("#shift-yes").prop('checked', true);
			$("#shift-no").prop('checked', false);
			drawMap();
			// Update legend and link to modal
			$("#shiftHelp").show();
		};	

			
	
		$( document ).ready( function () {
			$("#treeMenu").addClass("usa-current");
			currentOnly();
			manageUnderMenu();
			$("#shiftHelp").hide();
			$(".dataRow").hide();
			$("#tr_act").show();
			$(".sb").hide();
			$(".predClimate").hide();
			//$("#act").show();
			checkShift();
			$("#selGCM").change(function(){
						//manageUnderMenu();
						drawMap();		
								});
			$("#selMap").change(function(){
						manageUnderMenu();
						checkShift();
						drawMap();		
								});
			$('input[type=radio][name=switch]').change(function() {
						manageUnderMenu();
						drawMap();
			});
			
			$(".loadSHIFT").click(function() {
				checkShift();
				var myID;
				myId = $(this).attr('id');
				loadShift(myId);
			});
			
			$("#shift-yes").click(function() {
				$("#shiftHelp").show();
			});
			
			// Manage Life History menu
			$("#lifeHistory").on("shown.r.modal", function(event) {
                //$("table").hide();
				console.log("hide the table");
            });
			
			// Manage modals on close
			$("YOUR_TRIGGER_SELECTOR").on("hide.r.modal", function(event) {
				// Your custom behaviour...
			});
			
			} );
