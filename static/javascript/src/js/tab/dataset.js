window.onload = function() {
  getDatasetTableData();
};

//dataset 테이블 정보 가져오는 함수
function getDatasetTableData() {
  fetch("/dataset/get_ds_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then((response) => response.json())
      .then((data) => {
        var datasetList = data.data;

        var tableBody = document.getElementById("datasetTableBody");
        for (var i = 0; i < datasetList.length; i++) {
          var row = tableBody.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
          var cell9 = row.insertCell(8);

          cell1.classList.add("data-cell","firstcell");
          cell2.classList.add("data-cell", "center");
          cell3.classList.add("data-cell", "center");
          cell4.classList.add("data-cell", "center");
          cell5.classList.add("data-cell", "center");
          cell6.classList.add("data-cell", "center");
          cell7.classList.add("data-cell", "center");
          cell8.classList.add("data-cell", "center");
          cell9.classList.add("data-cell", "center");

            cell1.innerHTML = (datasetList.length - i) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + datasetList[i][1];
          cell2.innerHTML = datasetList[i][2]; // datasetType
          cell4.innerHTML =  convertDateType(datasetList[i][4]);// datasetModifyTime
          // cell5.innerHTML = convertDateType(datasetList[i][5]); // datasetDownloadTime
          cell5.innerHTML = 0; // datasetDownloadTime

          var detailImageSrc = "/static/javascript/src/images/detail.svg";
          var detailImage = document.createElement("img");
          detailImage.setAttribute("src", detailImageSrc);
          detailImage.setAttribute("alt", "Image");
          detailImage.onclick = (function(index) {
            return function() {
              detailDataset(datasetList[index][0]); // 이 부분에서 인덱스를 사용
            };
          })(i);
          cell6.appendChild(detailImage);

          var modifyImageSrc = "/static/javascript/src/images/modify.svg";
          var modifyImage = document.createElement("img");
          modifyImage.setAttribute("src", modifyImageSrc);
          modifyImage.setAttribute("alt", "Image");
          modifyImage.onclick = (function(index) {
              return function() {
                  modifyDataset(datasetList[index][0]); // 이 부분에서 인덱스를 사용
              };
          })(i);
          cell7.appendChild(modifyImage);

          cell8.innerHTML = '<img style="margin-left: 24px; margin-right: 16px" src="/static/javascript/src/images/download_2.svg" alt="Image" />' ;
          var deleteImageSrc = "/static/javascript/src/images/delete_2.svg";
          var deleteImage = document.createElement("img");
          deleteImage.setAttribute("style", "margin-left: 24px; margin-right: 16px");
          deleteImage.setAttribute("src", deleteImageSrc);
          deleteImage.setAttribute("alt", "Image");
            deleteImage.onclick = (function(index) {
                return function() {
                    deleteDataset(datasetList[index][0]); // 이 부분에서 인덱스를 사용
                };
            })(i);
            cell9.appendChild(deleteImage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

function deleteDataset(index) {
    var isConfirmed = confirm("데이터를 삭제하시겠습니까?");
    if (isConfirmed) {
        console.log(index + "번 데이터 삭제!");

        var requestData = {
            ds_idx: index
        };

        fetch("/dataset/db_ds_delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
                alert("데이터셋 삭제가 완료되었습니다.");
                location.reload();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {
        console.log("삭제 취소");
    }
}


function createDataset() {
  var createModal = document.getElementById("datasetCreateModal");
  createModal.style.display = "block";
}

function createModalClose() {
    selectedFiles = [];
    document.getElementById("agencySelect").value = "";
    document.getElementById("datasetCreateName").value = "";
    document.getElementById("fileInput").value = "";
    document.getElementById("datasetCreateComment").value = "";

    var table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    table.innerHTML = "";

    var createModal = document.getElementById("datasetCreateModal");
    createModal.style.display = "none";
}


function detailModalClose() {
  var detailModal = document.getElementById("datasetDetailModal");
  detailModal.style.display = "none";
}


//dataset 상세정보 조회 함수
function detailDataset(index) {
  var detailModal = document.getElementById("datasetDetailModal");
  detailModal.style.display = "block";

  index = index.toString()
  // 예를 들어, 해당 인덱스로 서버에 요청을 보낼 수 있습니다.
  fetch("/dataset/db_ds_get_detail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ds_idx: index,
    }),
  })
      .then((response) => response.json())
      .then((data) => {
        datasetDetailData = data.data[0]
        datasetIdx = datasetDetailData[0]
        datasetType = datasetDetailData[1]
        datasetUploadTime = datasetDetailData[2]
        datasetModifyTime = datasetDetailData[3]
        datasetDownloadCount = datasetDetailData[4]
        datasetComments = datasetDetailData[5]

          var datasetNameInput = document.getElementById("datasetName");
          var datasetTypeInput = document.getElementById("datasetType");
          var datasetUploadTimeInput = document.getElementById("datasetUploadTime");
          var datasetModifyTimeInput = document.getElementById("datasetModifyTime");
          var datasetDownloadCountInput = document.getElementById("datasetDownloadCount");
          var datasetCommentsTextarea = document.getElementById("datasetComments");
          var datasetDetailModalOkButton = document.getElementById("datasetDetailModalOkButton");

          if (datasetDetailModalOkButton) {
              datasetDetailModalOkButton.disabled = true;
          }

          if (datasetNameInput) {
              datasetNameInput.value = datasetDetailData[1];
              datasetNameInput.readOnly = true;
          }

          if (datasetTypeInput) {
              datasetTypeInput.value = datasetDetailData[2];
              datasetTypeInput.readOnly = true;
          }

          if (datasetUploadTimeInput) {
              datasetUploadTimeInput.value = convertDateType(datasetDetailData[3]);
              datasetUploadTimeInput.readOnly = true;
          }

          if (datasetModifyTimeInput) {
              datasetModifyTimeInput.value = convertDateType(datasetDetailData[4]);
              datasetModifyTimeInput.readOnly = true;
          }

          if (datasetDownloadCountInput) {
              datasetDownloadCountInput.value = datasetDetailData[5];
              datasetDownloadCountInput.readOnly = true;
          }

          if (datasetCommentsTextarea) {
              datasetCommentsTextarea.value = datasetDetailData[6];
              datasetCommentsTextarea.readOnly = true;
          }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

function modifyDataset(index) {
    var detailModal = document.getElementById("datasetDetailModal");
    detailModal.style.display = "block";

    index = index.toString()
    // 예를 들어, 해당 인덱스로 서버에 요청을 보낼 수 있습니다.
    fetch("/dataset/db_ds_get_detail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ds_idx: index,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            datasetDetailData = data.data[0]
            datasetIdx = datasetDetailData[0]
            datasetType = datasetDetailData[1]
            datasetUploadTime = datasetDetailData[2]
            datasetModifyTime = datasetDetailData[3]
            datasetDownloadCount = datasetDetailData[4]
            datasetComments = datasetDetailData[5]

            var datasetNameInput = document.getElementById("datasetName");
            var datasetTypeInput = document.getElementById("datasetType");
            var datasetUploadTimeInput = document.getElementById("datasetUploadTime");
            var datasetModifyTimeInput = document.getElementById("datasetModifyTime");
            var datasetDownloadCountInput = document.getElementById("datasetDownloadCount");
            var datasetCommentsTextarea = document.getElementById("datasetComments");
            var datasetDetailModalOkButton = document.getElementById("datasetDetailModalOkButton");

            if (datasetDetailModalOkButton) {
                datasetDetailModalOkButton.disabled = false;
            }

            if (datasetNameInput) {
                datasetNameInput.value = datasetDetailData[1];
                datasetNameInput.readOnly = false;
            }

            if (datasetTypeInput) {
                datasetTypeInput.value = datasetDetailData[2];
                datasetTypeInput.readOnly = false;
            }

            if (datasetUploadTimeInput) {
                datasetUploadTimeInput.value = convertDateType(datasetDetailData[3]);
                datasetUploadTimeInput.readOnly = false;
            }

            if (datasetModifyTimeInput) {
                datasetModifyTimeInput.value = convertDateType(datasetDetailData[4]);
                datasetModifyTimeInput.readOnly = false;
            }

            if (datasetDownloadCountInput) {
                datasetDownloadCountInput.value = datasetDetailData[5];
                datasetDownloadCountInput.readOnly = false;
            }

            if (datasetCommentsTextarea) {
                datasetCommentsTextarea.value = datasetDetailData[6];
                datasetCommentsTextarea.readOnly = false;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


function datasetCreate() {
    var agencySelect = document.getElementById("agencySelect");
    var company_name = agencySelect.value;

    var datasetCreateName = document.getElementById("datasetCreateName");
    var ds_name = datasetCreateName.value;

    var datasetCreateComment = document.getElementById("datasetCreateComment");
    var ds_description = datasetCreateComment.value;

    const companyIndices = {
        '그린광학': 1,
        '금진': 2,
        '리파코': 3,
        '산전정밀': 4,
        '새한': 5,
        'AND전자저울': 6,
        '이킴': 7,
        '킹텍스': 8,
        '한길이에스티': 9,
        '화인텍코리아': 10
    };

    var company_idx = companyIndices[company_name];
    var ds_path = "/../../..";
    var ds_type_idx = 11;

    var requestData = {
        ds_name: ds_name,
        ds_path: ds_path,
        ds_description: ds_description,
        company_idx: company_idx,
        ds_type_idx: ds_type_idx
    };

    fetch("/dataset/db_ds_create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
            alert("정보추가가 완료되었습니다.");
            createModalClose();
            location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
        });
}



fetch('/common/agency_list', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {
        var agencyList = data.data;
        var selectElement = document.getElementById('agencySelect');

        // 기존의 option 삭제
        selectElement.innerHTML = '';

        // 조회한 데이터로 option을 생성하여 추가
        agencyList.forEach(item => {
            var option = document.createElement('option');
            option.value = item[0];  // item의 속성에 따라 변경
            option.textContent = item[0];  // item의 속성에 따라 변경
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('데이터 가져오기 오류:', error);
    });

function openFileUploader() {
    document.getElementById('fileInput').click();
}

var selectedFiles = []; // 전역 변수로 선언
function handleFileUpload() {
    var fileInput = document.getElementById('fileInput');
    var selectedFile = fileInput.files[0];
    if (selectedFile) {
        console.log('Selected file:', selectedFile);

        var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(0);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);

        var imgElement = document.createElement('img');
        imgElement.src = 'static/javascript/src/images/sbox.svg';
        imgElement.alt = 'Default Image';
        cell1.appendChild(imgElement);

        imgElement.addEventListener('click', function () {
            if (imgElement.src.endsWith('sbox.svg')) {
                imgElement.src = 'static/javascript/src/images/sbox_check.svg';
                selectedFiles.push(selectedFile.name);
            } else {
                imgElement.src = 'static/javascript/src/images/sbox.svg';
                var index = selectedFiles.indexOf(selectedFile.name);
                if (index !== -1) {
                    selectedFiles.splice(index, 1);
                }
            }
        });

        var textNode = document.createTextNode(selectedFile.name);
        cell2.appendChild(textNode);
    }

}

function deleteDatasets() {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    for (var i = 0; i < selectedFiles.length; i++) {
        var fileNameToDelete = selectedFiles[i];

        for (var j = 0; j < table.rows.length; j++) {
            var rowFileName = table.rows[j].cells[1].innerText;
            if (fileNameToDelete === rowFileName) {
                table.deleteRow(j);
                break;
            }
        }
    }
    selectedFiles = [];
}

function modifyDetailData(){
    console.log("데이터 수정")
}