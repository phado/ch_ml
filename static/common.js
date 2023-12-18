
function createDropdown(dv) {

    var dropdownContainer = dv


    var dropdown = document.createElement('select');
    dropdown.id = 'dropdown';

    // 드롭다운 옵션 추가
    var options = ['data1', 'data2', 'data3']; // 데이터베이스 조회해서 정보 가저와야한다.

    options.forEach(function (optionText) {
        var option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function () {
        updateSelectedValue();
    });
    dropdownContainer.appendChild(dropdown);

    var selectedTag = document.createElement('div');
    selectedTag.id = 'selected';

    dropdownContainer.appendChild(selectedTag);

    return dropdownContainer
}


function updateSelectedValue() {
    var dropdown = document.getElementById('dropdown');
    var selectedTag = document.getElementById('selected');


    var selectedValue = dropdown.options[dropdown.selectedIndex].value;


    selectedTag.textContent = 'Selected: ' + selectedValue;
}
