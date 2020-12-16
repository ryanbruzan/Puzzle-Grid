/*
Copyright (C) 2013, Ryan Bruzan - Puzzle Grid
v2.0
*/

(function($) {

	$.fn.puzzleGrid = function (userOptions) {
		var options = $.extend({
			gridWidth: "1200px",
			columnNumber: 3,
			margin: 20
		}, userOptions);
		

		return $(this).each(function(){
			var self = this;
			$(self).addClass("puzzleGridContainer").css({"width":"100%", "max-width":options.gridWidth});
			var colCount = 0;
			var margin = options.margin;
			var colWidth = (parseInt(options.gridWidth,10)/parseInt(options.columnNumber,10))-(margin);
			var spaceLeft = 0;
			var containerWidth = 0;
			var panels = [];
			
			function setuppanels() {
				containerWidth = $(self).width();
				panels = [];
			
				// Calculate the margin so the panels are evenly spaced within the window
				colCount = Math.floor(containerWidth/(colWidth));
				if (colCount < 1) {
					colCount = 1;
					spaceLeft = -margin;
				} else {
					spaceLeft = ($(self).width()-((colWidth*colCount)+(margin*(colCount+1))))/2;
					}
				
				for(var i=0;i<colCount;i++){
					panels.push(margin);
				}
				positionpanels();
			}
			
			function positionpanels() {
				$(self).find(".panel:not('.hidden')").each(function(i){
					var min = Array.min(panels);
					var index = $.inArray(min, panels);
					var leftPos = margin+(index*(colWidth+margin));
					$(this).css({
						'left':Math.floor(leftPos+spaceLeft)+'px',
						'top':Math.floor(min)+'px'
					});
					panels[index] = min+$(this).outerHeight(true)+margin;
					$(this).css({"width":"100%","max-width":Math.floor(colWidth)});
					});
				var max = Array.max(panels);
				var index2 = $.inArray(max, panels);
				$(self).css({"height":Math.floor(max)});
			}
			
			// Function to get the Min value in Array
			Array.min = function(array) {
			    return Math.min.apply(Math, array);
			};
			
			// Function to get the Max value in Array
			Array.max = function(array) {
			    return Math.max.apply(Math, array);
			};
			
			setuppanels();
			$(window).resize(setuppanels);
			$(window).trigger("resize");
		});
	};
})(jQuery);