	myApp.directive('jqdatepicker', function() {
	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModelCtrl) {

	      element.datepicker({
	        dateFormat: 'yy-mm-dd',
	        beforeShowDay: function(date) {
	          var day = date.getDay();
	          return [day == 0, ""];
	        },
	        onSelect: function(date) {

	          scope.startDate = date;
	          temp = new Date(date);
	          temp.setDate(temp.getDate() + 7)
	          scope.endDate = (temp.getYear() + 1900) + "-" +
	            formatSingleDigit(
	              temp.getMonth() + 1) + "-" + formatSingleDigit(temp.getDate());
	          try {
	            scope.$apply();
	          } catch (e) {}

	        }
	      });
	    }
	  };
	});
