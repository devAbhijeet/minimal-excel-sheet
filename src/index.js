import "./styles.css";

let sheetData = [];

let sheet = document.getElementById("sheet");
let addColBtn = document.getElementById("add-column");
let addRowBtn = document.getElementById("add-row");
let removeRowBtn = document.getElementById("remove-row");
let selectedRow = 0;
let colLimit = 5;

let sideEffect = () => {
  let inputCol = document.getElementsByClassName("input-col");
  Array.from(inputCol).forEach(element => {
    element.addEventListener("focus", e => {
      selectedRow = Number(e.target.parentNode.dataset.row);
    });
  });
};

let addSheetRow = () => {
  let newInputCol = document.createElement("input");
  sheetData = [...sheetData, [newInputCol]];
  selectedRow = sheetData.length - 1;
  render(sideEffect);
};

let addSheetCol = e => {
  let newInputCol = document.createElement("input");
  if (selectedRow > -1 && Array.isArray(sheetData[selectedRow])) {
    if (sheetData[selectedRow].length < colLimit) {
      sheetData[selectedRow].push(newInputCol);
    } else {
      selectedRow++;
      addSheetRow();
    }
  } else if (sheetData.length === 0) {
    addSheetRow();
  }
  render(sideEffect);
};

let removeSheetRow = () => {
  selectedRow = sheetData.length - 1;
  sheetData.pop();
  render(sideEffect);
};

let getColumn = (data, rowIndex) => {
  const inputCollection = data.map((input, colIndex) => {
    return `
      <input
        class="input-col"
        data-col=col-${rowIndex}-${colIndex}
      />
    `;
  });
  return inputCollection.join("");
};

function render(callback) {
  sheet.innerHTML = sheetData
    .map((data, index) => {
      return `
        <div class="sheet-row" data-row=${index}>
          ${getColumn(data, index)}
        </div>
      `;
    })
    .join("");
  callback();
}

render(sideEffect);
addRowBtn.addEventListener("click", addSheetRow);
addColBtn.addEventListener("click", addSheetCol);
removeRowBtn.addEventListener("click", removeSheetRow);

window.addEventListener("DOMContentLoaded", function() {});
