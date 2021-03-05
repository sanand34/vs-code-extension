// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
function outputdiv(inp) {
  document.body.appendChild(document.createElement("div")).innerHTML = inp;
}
function outputspan(inp) {
  document.body.appendChild(document.createElement("span")).innerHTML = inp;
}

document.getElementById("myButton").onclick = function getInputValue() {
  // Selecting the input element and get its value
  var inputVal = document.getElementById("myInput").value;

  // Displaying the value

  var obj = httpGet(inputVal);
  var str = JSON.stringify(obj);
  var block = " ----";
  for (var i = 0; i < str.length; i++) {
    if (/[{},]+/g.exec(str.charAt(i))) {
      if (/[{]+/g.exec(str.charAt(i))) {
        prevblock = block;
        if (/[,]+/g.exec(str.charAt(i - 1))) {
          block = block;
        } else {
          block = block + "-----------";
        }
      }
      if (/[}]+/g.exec(str.charAt(i))) {
        block = prevblock;
      }
      outputdiv(block + str.charAt(i));
      outputspan(block);
    } else {
      if (!/[\\]+/g.exec(str.charAt(i))) {
        if (/["]+/g.exec(str.charAt(i))) {
          outputspan(str.charAt(i));
        } else {
          outputspan(" " + str.charAt(i));
        }
      }
    }
  }
};
