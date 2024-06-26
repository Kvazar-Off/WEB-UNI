function summ(a, b) {
    var phrase = a+b;
    alert(phrase);
}

function funk(a)
{
    return a % 2 == 0;
}

function filter(arr, func) {
    //var arr = [1, 2, 3, 4, 5, 6, 7];
    var positiveArr = arr.filter(func());
      
    alert( positiveArr ); // 2,4,6
}


function sum(a) {
    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function() {
        return currentSum;
    };

    return f;
}