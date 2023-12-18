let MxCellFormMapper = {};

let mapperList = {
  "Image-Data": {
    type: "Image-Data",
    data: "",
    path: "",
  },
  "Sensor-Data": {
    type: "Sensor-Data",
    data: "",
    path: "",
  },
  "KeyPoint-Data": {
    type: "KeyPoint-Data",
    data: "",
    path: "",
  },
  "Object-Detection": {
    type: "Object-Detection",
    data: "",
    path: "",
  },
  "Classification": {
    type: "Classification",
    data: "",
    path: "",
  },
  "Deploy": {
    type: "Deploy",
    data: "",
    path: "",
  },
};

function mxCellType(cellId, cellType) {
  // 생성된 셀 타입 확인
  var mapper = mapperList[cellType];

  // 생성된 셀 타입으로 맴퍼 생성
  MxCellMapper[cellId] = mapper;
}

function mxCellForm(cellType, mapperData) {
  // 생성된 셀 폼 생성
  if (cellType == "Image-Data") {
    return ImageData(mapperData);
  } else if (cellType == "Sensor-Data") {
    return SenserData(mapperData);
  } else if (cellType == "KeyPoint-Data") {
    return KeyPointData(mapperData);
  } else if (cellType == "Object-Detection") {
    return ObjectDetection(mapperData);
  } else if (cellType == "Classification") {
    return Classification(mapperData);
  } else if (cellType == "Deploy") {
    return Deploy(mapperData);
  }
}

function applyStyles(element, styles) {
  for (var style in styles) {
    element.style[style] = styles[style];
  }
}
let Roboto16Style = {
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "19px",
  letterSpacing: "0em",
  textAlign: "left",
};
let selectBoxStyle = {
  marginTop: "12px",
  marginBottom: "36px",
  width: "660px",
  height: "36px",
  borderRadius: "5px",
  border: "1px solid #9B9B9B",
};
let textareaStyle = {
  marginTop: "12px",
  marginBottom: "36px",
  width: "645px",
  height: "200px",
  borderRadius: "5px",
  border: "1px solid #9b9b9b",
  paddingTop: "7px",
  paddingLeft: "11px",
  resize: "none",
  overflowY: "auto",
};
var inputBoxStyle = {
  marginTop: "12px",
  marginBottom: "36px",
  width: "660px",
  height: "36px",
  borderRadius: "5px",
  border: "1px solid #9B9B9B",
};
var smallInputBoxStyle = {
  marginTop: "12px",
  marginBottom: "12px",
  width: "300px",
  height: "36px",
  borderRadius: "5px",
  border: "1px solid #9B9B9B",
};
function ImageData(mapperData) {
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  applyStyles(modal, {
    width: "100%",
    height: "95%",
  });

  var mainCategoryLabel = document.createElement("label");
  var labelText = document.createTextNode("메인 카테고리:");
  mainCategoryLabel.appendChild(labelText);
  applyStyles(mainCategoryLabel, Roboto16Style);

  var mainCategoryDropdown = document.createElement("select");
  mainCategoryDropdown.id = "mainCategory";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    mainCategoryDropdown.appendChild(option);
    applyStyles(mainCategoryDropdown, selectBoxStyle);
  });

  var subCategoryLabel = document.createElement("label");
  labelText = document.createTextNode("서브 카테고리2:");
  subCategoryLabel.appendChild(labelText);
  applyStyles(subCategoryLabel, Roboto16Style);


  var subCategoryDropdown = document.createElement("select");
  subCategoryDropdown.id = "subCategory";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    subCategoryDropdown.appendChild(option);
    applyStyles(subCategoryDropdown, selectBoxStyle);
  });

  var memoLabel = document.createElement("label");
  labelText = document.createTextNode("메모:");
  memoLabel.appendChild(labelText);
  applyStyles(memoLabel, Roboto16Style);

  var memoInput = document.createElement("textarea");
  memoInput.id = "memo";

  applyStyles(memoInput, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(mainCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(mainCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoInput);
  modal.appendChild(mxUtils.br(div));

  return modal;
}
function SenserData(mapperData) {
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  applyStyles(modal, {
    width: "100%",
    height: "95%",
  });

  var mainCategoryLabel = document.createElement("label");
  var labelText = document.createTextNode("메인 카테고리:");
  mainCategoryLabel.appendChild(labelText);
  applyStyles(mainCategoryLabel, Roboto16Style);

  var mainCategoryDropdown = document.createElement("select");
  mainCategoryDropdown.id = "mainCategory";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    mainCategoryDropdown.appendChild(option);
    applyStyles(mainCategoryDropdown, selectBoxStyle);
  });

  var subCategoryLabel = document.createElement("label");
  labelText = document.createTextNode("서브 카테고리2:");
  subCategoryLabel.appendChild(labelText);
  applyStyles(subCategoryLabel, Roboto16Style);


  var subCategoryDropdown = document.createElement("select");
  subCategoryDropdown.id = "subCategory";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    subCategoryDropdown.appendChild(option);
    applyStyles(subCategoryDropdown, selectBoxStyle);
  });

  var memoLabel = document.createElement("label");
  labelText = document.createTextNode("메모:");
  memoLabel.appendChild(labelText);
  applyStyles(memoLabel, Roboto16Style);

  var memoInput = document.createElement("textarea");
  memoInput.id = "memo";

  applyStyles(memoInput, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(mainCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(mainCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoInput);
  modal.appendChild(mxUtils.br(div));

  return modal;
}
function KeyPointData(mapperData) {
  var div = document.createElement("div");
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  applyStyles(modal, {
    width: "100%",
    height: "95%",
  });

  var mainCategoryLabel = document.createElement("label");
  var labelText = document.createTextNode("메인 카테고리:");
  mainCategoryLabel.appendChild(labelText);
  applyStyles(mainCategoryLabel, Roboto16Style);

  var mainCategoryDropdown = document.createElement("select");
  mainCategoryDropdown.id = "mainCategory";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    mainCategoryDropdown.appendChild(option);
    applyStyles(mainCategoryDropdown, selectBoxStyle);
  });

  var subCategoryLabel = document.createElement("label");
  labelText = document.createTextNode("서브 카테고리2:");
  subCategoryLabel.appendChild(labelText);
  applyStyles(subCategoryLabel, Roboto16Style);


  var subCategoryDropdown = document.createElement("select");
  subCategoryDropdown.id = "subCategory";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    subCategoryDropdown.appendChild(option);
    applyStyles(subCategoryDropdown, selectBoxStyle);
  });

  var memoLabel = document.createElement("label");
  labelText = document.createTextNode("메모:");
  memoLabel.appendChild(labelText);
  applyStyles(memoLabel, Roboto16Style);

  var memoInput = document.createElement("textarea");
  memoInput.id = "memo";

  applyStyles(memoInput, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(mainCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(mainCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoInput);
  modal.appendChild(mxUtils.br(div));

  return modal;
}

function ObjectDetection(mapperData) {
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  applyStyles(modal, {
    width: "100%",
    height: "95%",
    display: "flex",
  });

  // input area 1
  var inputArea1 = createInputArea("input-area1", "50%", 1, 6);
  modal.appendChild(inputArea1);

  // input area 2
  var inputArea2 = createInputArea("input-area2", "50%", 7, 11);
  modal.appendChild(inputArea2);

  return modal;
}

function createInputArea(id, width, start, end) {
  var inputArea = document.createElement("div");
  inputArea.id = id;
  applyStyles(inputArea, {
    width: width,
    boxSizing: "border-box",
    padding: "10px",
  });

  var propertyNames = ["","weights", "cfg", "data-class", "hyp", "epochs", "batch-size", "imgsz", "resume", "optimizer", "label-smoothing", "freeze"];

  for (var i = start; i <= end; i++) {
    var propertyName = propertyNames[i];
    var inputLabel = document.createElement("label");
    var labelText = document.createTextNode(propertyName );
    inputLabel.appendChild(labelText);
    applyStyles(inputLabel, Roboto16Style);

    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.id = propertyName;
    inputElement.placeholder = "선택 없음";
    applyStyles(inputElement, smallInputBoxStyle);

    // Fix: div 변수 정의
    var div = document.createElement("div");

    inputArea.appendChild(inputLabel);
    inputArea.appendChild(mxUtils.br(div));  // Fix: mxUtils.br에도 div 추가
    inputArea.appendChild(inputElement);
    inputArea.appendChild(mxUtils.br(div));
  }

  return inputArea;
}



function Classification(mapperData) {var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  var mainCategoryLabel = document.createElement("label");
  var labelText = document.createTextNode("메인 카테고리:");
  mainCategoryLabel.appendChild(labelText);

  var mainCategoryDropdown = document.createElement("select");
  mainCategoryDropdown.id = "mainCategory";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    mainCategoryDropdown.appendChild(option);
  });

  var subCategoryLabel = document.createElement("label");
  labelText = document.createTextNode("서브 카테고리2:");
  subCategoryLabel.appendChild(labelText);

  var subCategoryDropdown = document.createElement("select");
  subCategoryDropdown.id = "subCategory";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    subCategoryDropdown.appendChild(option);
  });

  var memoLabel = document.createElement("label");
  labelText = document.createTextNode("메모:");
  memoLabel.appendChild(labelText);

  var memoInput = document.createElement("input");
  memoInput.type = "text";
  memoInput.id = "memo";

  // 모달에 요소 추가
  modal.appendChild(mainCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(mainCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoInput);
  modal.appendChild(mxUtils.br(div));

  return modal;
}


function Deploy(mapperData) {
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  var mainCategoryLabel = document.createElement("label");
  var labelText = document.createTextNode("메인 카테고리:");
  mainCategoryLabel.appendChild(labelText);

  var mainCategoryDropdown = document.createElement("select");
  mainCategoryDropdown.id = "mainCategory";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    mainCategoryDropdown.appendChild(option);
  });

  var subCategoryLabel = document.createElement("label");
  labelText = document.createTextNode("서브 카테고리2:");
  subCategoryLabel.appendChild(labelText);

  var subCategoryDropdown = document.createElement("select");
  subCategoryDropdown.id = "subCategory";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    subCategoryDropdown.appendChild(option);
  });

  var memoLabel = document.createElement("label");
  labelText = document.createTextNode("메모:");
  memoLabel.appendChild(labelText);

  var memoInput = document.createElement("input");
  memoInput.type = "text";
  memoInput.id = "memo";

  // 모달에 요소 추가
  modal.appendChild(mainCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(mainCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(subCategoryDropdown);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoLabel);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(memoInput);
  modal.appendChild(mxUtils.br(div));

  return modal;
}

function mapperEditApply() {
  console.log("apply");
}
