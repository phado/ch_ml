

let MxCellFormMapper = {}

let mapperList = {
    '<label>KeyPoint Data</label>' : {'type': '<label>KeyPoint Data</label>', 'data': 'ss','path': '' },
    '<label>Image Data</label>' : {'type': '<label>Image Data</label>','data': 'dd','path': '' },
    '<label>Sensor Data</label>' : {'type': '<label>Sensor Data</label>','data': 'pp','path': '' }
}



function mxCellType(cellId, cellType) {
    // 생성된 셀 타입 확인
    var mapper = mapperList[cellType]


    // 생성된 셀 타입으로 맴퍼 생성
    MxCellMapper[cellId] = mapper



}


function mxCellForm(cellType,mapperData) {
    // 생성된 셀 폼 생성
    if (cellType == '<label>Image Data</label>'){
        return ImageData(mapperData)

    }else if(cellType == ''){

    }



}

function ImageData(mapperData){
    var div = document.createElement("div");
    var dataInput = document.createElement("input");
    dataInput.type = "text";
    dataInput.placeholder = "Enter data";
    dataInput.id = "dataInput";
    if (mapperData['data'] != ''){
        dataInput.value = mapperData['data']
    }
    div.appendChild(dataInput)

    // 파일 경로를 입력하는 input 태그 생성
    var pathInput = document.createElement("input");
    pathInput.type = "file";
    pathInput.id = "pathInput";
    div.appendChild(pathInput)

    // body에 input 태그 추가
    return div
}


function mapperEditApply(){
    console.log('apply')
}
