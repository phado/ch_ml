

let MxCellFormMapper = {}

let mapperList = {
    '<label>KeyPoint Data</label>' : {'type': '<label>KeyPoint Data</label>', 'data': '','path': '' },
    '<label>Image Data</label>' : {'type': '<label>Image Data</label>','data': '','path': '' },
    '<label>Sensor Data</label>' : {'type': '<label>Sensor Data</label>','data': '','path': '' }
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

    var modal = document.createElement('div');
    modal.className = 'dataModal';

    var mainCategoryLabel = document.createElement('label');
    var labelText = document.createTextNode('메인 카테고리:');
    mainCategoryLabel.appendChild(labelText);
₩

    var mainCategoryDropdown = document.createElement('select');
    mainCategoryDropdown.id = 'mainCategory';

    var mainCategoryOptions = ['선택 없음', '카테1', '카테2', '카테3', '카테4'];
    mainCategoryOptions.forEach(function(optionText) {
        var option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        mainCategoryDropdown.appendChild(option);
    });


    var subCategoryLabel = document.createElement('label');
    labelText = document.createTextNode('서브 카테고리2:');
    subCategoryLabel.appendChild(labelText);


    var subCategoryDropdown = document.createElement('select');
    subCategoryDropdown.id = 'subCategory';


    var subCategoryOptions = ['선택 없음', '서브카테1', '서브카테2', '서브카테3'];
    subCategoryOptions.forEach(function(optionText) {
        var option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        subCategoryDropdown.appendChild(option);
    });


    var memoLabel = document.createElement('label');
    labelText = document.createTextNode('메모:');
    memoLabel.appendChild(labelText);



    var memoInput = document.createElement('input');
    memoInput.type = 'text';
    memoInput.id = 'memo';


    // 모달에 요소 추가
    modal.appendChild(mainCategoryLabel);
    modal.appendChild( mxUtils.br(div));
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

    return modal
}


function mapperEditApply(){
    console.log('apply')
}
