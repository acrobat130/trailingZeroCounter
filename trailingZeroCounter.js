// Trailing Zero Counter

// Create a function that takes a single, whole number as the input and returns the number of trailing 0's that number has. Achieve O(log n) time complexity.

// Examples:
// trailingZeroCounter(505) // 0
// trailingZeroCounter(10) // 1
// trailingZeroCounter(10500) // 2
// trailingZeroCounter(40000000) // 7

var trailingZeroCounter = function(number, existingCount) {
	// initialize the count
	var count = existingCount || 0;
	// make number into an array of digits - change number to string then split based on ''
	var numberArray = number.toString().split('');
	// grab the length of the input number
	var numberLength = numberArray.length;
	// set exponent to be half the length
	var exponent = Math.floor(numberLength/2);

	// grab index to split at, depending if odd or even length
	var splitIndex;
	if (numberLength % 2 === 0) {
		splitIndex = exponent;
	} else {
		splitIndex = exponent + 1;
	}

	// divide number by (10^exponent) -  this is left side of number
	var leftSideOfNumber = number/(Math.pow(10, exponent));
	// grab right half of the numberArray
	var rightSideOfNumber = numberArray.slice(splitIndex).join('');

	// base case: only have a single digit left
	if (numberLength === 1) {
		// if number === 0, increase count
		if (number === 0) {
			count++;
		}
		// else number is 1-9, return count
		return count;
	}

	// if left side is a decimal,
	if (!Number.isInteger(leftSideOfNumber))
		// recurse on right side
		return trailingZeroCounter(rightSideOfNumber, count);
	// else left side isn't a decimal, so the right side is all 0's
	else {
		// add exponent to count
		count += exponent;
		// recurse on left side
		return trailingZeroCounter(leftSideOfNumber, count);
	}
}

//////////////////////////////////////////////////////////////


// linear time complexity solution:
var trailingZeroCounterV1 = function(number) {
	// initialize the count
	var count = 0;

	// make number into an array of digits - change number to string then split based on ''
	var numberArray = number.toString().split('');

	// grab index of last element in numberArray
	var currentIndex = numberArray.length - 1;

	// iterate backwards through numberArray while digit is 0, increase count each time
	while (numberArray[currentIndex] === '0') {
		count ++;
		currentIndex --;
	}

	return count;
}


//////////////////////////////////////////////////////////////

// second linear time complexity solution:
var trailingZeroCounterV2 = function(number, existingCount) {
	// initialize the count
	var count = existingCount || 0;

	// if remainder after dividing number by 10 === 0
	if (number % 10 === 0) {
		var newNumber = number / 10;
		// last digit was 0 so increase count
		count++;
		// recurse with new number
		return trailingZeroCounterV2(newNumber, count);
	} else {
		return count;
	}
}






