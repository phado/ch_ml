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
          var row = tableBody.insertRow(i);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
          var cell5 = row.insertCell(4);
          var cell6 = row.insertCell(5);
          var cell7 = row.insertCell(6);
          var cell8 = row.insertCell(7);
          var cell9 = row.insertCell(8);

          cell1.classList.add("data-cell");
          cell2.classList.add("data-cell", "center");
          cell3.classList.add("data-cell", "center");
          cell4.classList.add("data-cell", "center");
          cell5.classList.add("data-cell", "center");
          cell6.classList.add("data-cell", "center");
          cell7.classList.add("data-cell", "center");
          cell8.classList.add("data-cell", "center");
          cell9.classList.add("data-cell", "center");

          // 데이터셋 정보 채우기
          cell1.innerHTML = '<img style="margin-left: 24px; margin-right: 16px" src="/static/javascript/src/images/box.svg" alt="Image" />' + datasetList[i][1]; // datasetName
          cell2.innerHTML = datasetList[i][2]; // datasetType
          cell4.innerHTML =  convertDateType(datasetList[i][4]);// datasetModifyTime
          // cell5.innerHTML = convertDateType(datasetList[i][5]); // datasetDownloadTime
          cell5.innerHTML = 0; // datasetDownloadTime

          // 이미지 엘리먼트 생성
          var detailImageSrc = "/static/javascript/src/images/detail.svg";
          var detailImage = document.createElement("img");
          detailImage.setAttribute("style", "margin-left: 24px; margin-right: 16px");
          detailImage.setAttribute("src", detailImageSrc);
          detailImage.setAttribute("alt", "Image");
          detailImage.onclick = (function(index) {
            return function() {
              detailDataset(datasetList[index][0]); // 이 부분에서 인덱스를 사용
            };
          })(i);
          cell6.appendChild(detailImage);

          cell7.innerHTML = '<img style="margin-left: 24px; margin-right: 16px" src="/static/javascript/src/images/modify.svg" alt="Image" />' ;
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
            alert("삭제완료")
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function createDataset() {
  var createModal = document.getElementById("datasetCreateModal");
  createModal.style.display = "block";
}

function createModalClose() {
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

          if (datasetNameInput) {
              datasetNameInput.value = datasetDetailData[0];
          }

          if (datasetTypeInput) {
              datasetTypeInput.value = datasetDetailData[1];
          }

          if (datasetUploadTimeInput) {
              datasetUploadTimeInput.value = convertDateType(datasetDetailData[2]);
          }

          if (datasetModifyTimeInput) {
              datasetModifyTimeInput.value = convertDateType(datasetDetailData[3]);
          }

          if (datasetDownloadCountInput) {
              datasetDownloadCountInput.value = datasetDetailData[4];
          }

          if (datasetCommentsTextarea) {
              datasetCommentsTextarea.value = datasetDetailData[5];
          }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

function datasetCreate() {
    var agencySelect = document.getElementById("agencySelect");
    var company_idx = agencySelect.value;

    var datasetCreateName = document.getElementById("datasetCreateName");
    var ds_name = datasetCreateName.value;

    var datasetCreateComment = document.getElementById("datasetCreateComment");
    var ds_description = datasetCreateComment.value;

    var ds_path = "/../../..";
    var ds_type_idx = "type";

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
            alert("정보 추가 완료!")
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
