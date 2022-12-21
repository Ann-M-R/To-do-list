// module.exports.getDate = getDate;  //Not giving parantheses since it shouldn't be called everytime
// module.exports.getDay = getDay;
//
// function() {
//
//   var today = new Date();
//   var thisday = "";
//   var options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   };
//
//   var thisDay = today.toLocaleDateString("en-IN", options);
//
//   return thisDay;
// }
//
// function getDay() {
//
//   var today = new Date();
//   var thisday = "";
//   var options = {
//     weekday: "long",
//   };
//
//   var thisDay = today.toLocaleDateString("en-IN", options);
//
//   return thisDay;
// }

module.exports.getDate = function() {  //we can use exports instead of module.exports

  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var thisDay = today.toLocaleDateString("en-IN", options);

  return thisDay;
}

module.exports.getDay = function() {

  const today = new Date();
  const options = {
    weekday: "long",
  };

  var thisDay = today.toLocaleDateString("en-IN", options);

  return thisDay;
}
