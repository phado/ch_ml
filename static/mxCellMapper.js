let MxCellFormMapper = {};

const arrowMapper = {"id" : -1 , 'source' : -1 , 'target' : -1 }

let mapperList = {
  "Image-Data": {
    type: "Image-Data",
    data : "",
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

  var ImageDataLabel1 = document.createElement("label");
  var labelText = document.createTextNode("기업 선택");
  ImageDataLabel1.appendChild(labelText);
  applyStyles(ImageDataLabel1, Roboto16Style);

  var ImageDataSelect1 = document.createElement("select");
  ImageDataSelect1.id = "ImageDataSelect1";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    ImageDataSelect1.appendChild(option);
    applyStyles(ImageDataSelect1, selectBoxStyle);
  });

  var ImageDataLabel2 = document.createElement("label");
  labelText = document.createTextNode("데이터셋 선택");
  ImageDataLabel2.appendChild(labelText);
  applyStyles(ImageDataLabel2, Roboto16Style);


  var ImageDataSelect2 = document.createElement("select");
  ImageDataSelect2.id = "ImageDataSelect2";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    ImageDataSelect2.appendChild(option);
    applyStyles(ImageDataSelect2, selectBoxStyle);
  });

  var ImageDataLabel3 = document.createElement("label");
  labelText = document.createTextNode("메모");
  ImageDataLabel3.appendChild(labelText);
  applyStyles(ImageDataLabel3, Roboto16Style);

  var ImageDataInput1 = document.createElement("textarea");
  ImageDataInput1.id = "ImageDataInput1";

  applyStyles(ImageDataInput1, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(ImageDataLabel1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ImageDataSelect1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ImageDataLabel2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ImageDataSelect2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ImageDataLabel3);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ImageDataInput1);
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

  var SenserDataLabel1 = document.createElement("label");
  var labelText = document.createTextNode("기업 선택");
  SenserDataLabel1.appendChild(labelText);
  applyStyles(SenserDataLabel1, Roboto16Style);

  var SenserDataSelect1 = document.createElement("select");
  SenserDataSelect1.id = "SenserDataSelect1";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    SenserDataSelect1.appendChild(option);
    applyStyles(SenserDataSelect1, selectBoxStyle);
  });

  var SenserDataLabel2 = document.createElement("label");
  labelText = document.createTextNode("데이터셋 선택");
  SenserDataLabel2.appendChild(labelText);
  applyStyles(SenserDataLabel2, Roboto16Style);


  var SenserDataSelect2 = document.createElement("select");
  SenserDataSelect2.id = "SenserDataSelect2";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    SenserDataSelect2.appendChild(option);
    applyStyles(SenserDataSelect2, selectBoxStyle);
  });

  var SenserDataLabel3 = document.createElement("label");
  labelText = document.createTextNode("메모");
  SenserDataLabel3.appendChild(labelText);
  applyStyles(SenserDataLabel3, Roboto16Style);

  var SenserDataInput1 = document.createElement("textarea");
  SenserDataInput1.id = "SenserDataInput1";

  applyStyles(SenserDataInput1, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(SenserDataLabel1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(SenserDataSelect1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(SenserDataLabel2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(SenserDataSelect2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(SenserDataLabel3);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(SenserDataInput1);
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

  var KeyPointDataLabel1 = document.createElement("label");
  var labelText = document.createTextNode("기업 선택");
  KeyPointDataLabel1.appendChild(labelText);
  applyStyles(KeyPointDataLabel1, Roboto16Style);

  var KeyPointDataSelect1 = document.createElement("select");
  KeyPointDataSelect1.id = "KeyPointDataSelect1";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    KeyPointDataSelect1.appendChild(option);
    applyStyles(KeyPointDataSelect1, selectBoxStyle);
  });

  var KeyPointDataLabel2 = document.createElement("label");
  labelText = document.createTextNode("데이터셋 선택");
  KeyPointDataLabel2.appendChild(labelText);
  applyStyles(KeyPointDataLabel2, Roboto16Style);


  var KeyPointDataSelect2 = document.createElement("select");
  KeyPointDataSelect2.id = "KeyPointDataSelect2";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    KeyPointDataSelect2.appendChild(option);
    applyStyles(KeyPointDataSelect2, selectBoxStyle);
  });

  var KeyPointDataLabel3 = document.createElement("label");
  labelText = document.createTextNode("메모");
  KeyPointDataLabel3.appendChild(labelText);
  applyStyles(KeyPointDataLabel3, Roboto16Style);

  var KeyPointDataInput1 = document.createElement("textarea");
  KeyPointDataInput1.id = "KeyPointDataInput1";

  applyStyles(KeyPointDataInput1, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(KeyPointDataLabel1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(KeyPointDataSelect1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(KeyPointDataLabel2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(KeyPointDataSelect2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(KeyPointDataLabel3);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(KeyPointDataInput1);
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

  var ClassificationLabel1 = document.createElement("label");
  var labelText = document.createTextNode("기업 선택");
  ClassificationLabel1.appendChild(labelText);

  var ClassificationSelect1 = document.createElement("select");
  ClassificationSelect1.id = "ClassificationSelect1";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    ClassificationSelect1.appendChild(option);
  });

  var ClassificationLabel2 = document.createElement("label");
  labelText = document.createTextNode("데이터셋 선택");
  ClassificationLabel2.appendChild(labelText);

  var ClassificationSelect2 = document.createElement("select");
  ClassificationSelect2.id = "ClassificationSelect2";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    ClassificationSelect2.appendChild(option);
  });

  var ClassificationLabel3 = document.createElement("label");
  labelText = document.createTextNode("메모");
  ClassificationLabel3.appendChild(labelText);

  var ClassificationInput1 = document.createElement("input");
  ClassificationInput1.type = "text";
  ClassificationInput1.id = "ClassificationInput1";

  // 모달에 요소 추가
  modal.appendChild(ClassificationLabel1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ClassificationSelect1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ClassificationLabel2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ClassificationSelect2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ClassificationLabel3);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(ClassificationInput1);
  modal.appendChild(mxUtils.br(div));

  return modal;
}

function Deploy(mapperData) {
  var div = document.createElement("div");

  var modal = document.createElement("div");
  modal.className = "dataModal";

  applyStyles(modal, {
    width: "100%",
    height: "95%",
  });

  var DeployLabel1 = document.createElement("label");
  var labelText = document.createTextNode("기업 선택");
  DeployLabel1.appendChild(labelText);
  applyStyles(DeployLabel1, Roboto16Style);

  var DeployLabelSelect1 = document.createElement("select");
  DeployLabelSelect1.id = "DeployLabelSelect1";

  var mainCategoryOptions = ["선택 없음", "카테1", "카테2", "카테3", "카테4"];
  mainCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    DeployLabelSelect1.appendChild(option);
    applyStyles(DeployLabelSelect1, selectBoxStyle);
  });

  var DeployLabel2 = document.createElement("label");
  labelText = document.createTextNode("데이터 유형 선택 ");
  DeployLabel2.appendChild(labelText);
  applyStyles(DeployLabel2, Roboto16Style);


  var DeployLabelSelect2 = document.createElement("select");
  DeployLabelSelect2.id = "DeployLabelSelect2";

  var subCategoryOptions = ["선택 없음", "서브카테1", "서브카테2", "서브카테3"];
  subCategoryOptions.forEach(function (optionText) {
    var option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    DeployLabelSelect2.appendChild(option);
    applyStyles(DeployLabelSelect2, selectBoxStyle);
  });

  var DeployLabel3 = document.createElement("label");
  labelText = document.createTextNode("메모");
  DeployLabel3.appendChild(labelText);
  applyStyles(DeployLabel3, Roboto16Style);

  var DeployInput1 = document.createElement("textarea");
  DeployInput1.id = "DeployInput1";

  applyStyles(DeployInput1, textareaStyle);

  // 모달에 요소 추가
  modal.appendChild(DeployLabel1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(DeployLabelSelect1);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(DeployLabel2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(DeployLabelSelect2);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(DeployLabel3);
  modal.appendChild(mxUtils.br(div));
  modal.appendChild(DeployInput1);
  modal.appendChild(mxUtils.br(div));

  return modal;
}

function mapperEditApply() {
  console.log("apply");
}


function cellDataBinder(cellValue){
  if(cellValue =='Image-Data'){
      var image1Select = document.getElementById('ImageDataSelect1');
      var image1SelectedValue = image1Select.value;

      var image2Select = document.getElementById('ImageDataSelect2');
      var image2SelectedValue = image2Select.value;

      var image1Input = document.getElementById('ImageDataInput1');
      var image1InputValue = image1Input.value;

      console.log(image1SelectedValue)
      console.log(image2SelectedValue)
      console.log(image1InputValue)
  }

  if(cellValue =='Sensor-Data'){
      var image1Select = document.getElementById('SenserDataSelect1');
      var image1SelectedValue = image1Select.value;

      var image2Select = document.getElementById('SenserDataSelect2');
      var image2SelectedValue = image2Select.value;

      var image1Input = document.getElementById('SenserDataInput1');
      var image1InputValue = image1Input.value;

      console.log(image1SelectedValue)
      console.log(image2SelectedValue)
      console.log(image1InputValue)
  }

  if(cellValue =='KeyPoint-Data'){
      var image1Select = document.getElementById('KeyPointDataSelect1');
      var image1SelectedValue = image1Select.value;

      var image2Select = document.getElementById('KeyPointDataSelect2');
      var image2SelectedValue = image2Select.value;

      var image1Input = document.getElementById('KeyPointDataInput1');
      var image1InputValue = image1Input.value;

      console.log(image1SelectedValue)
      console.log(image2SelectedValue)
      console.log(image1InputValue)
  }

  if(cellValue =='KeyPoint-Data'){
      var image1Select = document.getElementById('KeyPointDataSelect1');
      var image1SelectedValue = image1Select.value;

      var image2Select = document.getElementById('KeyPointDataSelect2');
      var image2SelectedValue = image2Select.value;

      var image1Input = document.getElementById('KeyPointDataInput1');
      var image1InputValue = image1Input.value;

      console.log(image1SelectedValue)
      console.log(image2SelectedValue)
      console.log(image1InputValue)
  }
}