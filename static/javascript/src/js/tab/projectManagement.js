function createDataset() {
  var createModal = document.getElementById("projectCreateModal");
  createModal.style.display = "block";
}

function createModalClose() {
    document.getElementById("projectName").value = "";
    document.getElementById("projectModelName").value = "";
    document.getElementById("projectCycle").value = "";
    document.getElementById("projectDescription").value = "";

    var createModal = document.getElementById("projectCreateModal");
    createModal.style.display = "none";
}


function detailModalClose() {
  var detailModal = document.getElementById("projectDetailModal");
  detailModal.style.display = "none";
}

window.onload = function() {
  getProjectTableData();
};

//dataset 테이블 정보 가져오는 함수
function getProjectTableData() {
  fetch("/train_project/db_train_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then((response) => response.json())
      .then((data) => {
        var datasetList = data.data;

        var tableBody = document.getElementById("ProjectTableBody");
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
          var cell10 = row.insertCell(9);
          var cell11 = row.insertCell(10);

          cell1.classList.add("data-cell","firstcell");
          cell2.classList.add("data-cell", "center");
          cell3.classList.add("data-cell", "center");
          cell4.classList.add("data-cell", "center");
          cell5.classList.add("data-cell", "center");
          cell6.classList.add("data-cell", "center");
          cell7.classList.add("data-cell", "center");
          cell8.classList.add("data-cell", "center");
          cell9.classList.add("data-cell", "center");
          cell10.classList.add("data-cell", "center");
          cell11.classList.add("data-cell", "center");

          cell1.innerHTML =  (i+1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + datasetList[i][1];
          cell2.innerHTML = datasetList[i][2];
          cell3.innerHTML = datasetList[i][3];
          cell4.innerHTML = datasetList[i][4];
          cell5.innerHTML = convertDateType(datasetList[i][5]);
          cell6.innerHTML = datasetList[i][6]
          cell7.innerHTML = datasetList[i][7]
          cell8.innerHTML = convertDateType(datasetList[i][8])

          var detailImageSrc = "/static/javascript/src/images/detail.svg";
          var detailImage = document.createElement("img");
          detailImage.setAttribute("src", detailImageSrc);
          detailImage.setAttribute("alt", "Image");
          detailImage.onclick = (function(index) {
            return function() {
              detailProject(datasetList[index][0]);
            };
          })(i);
          cell9.appendChild(detailImage);

         var modifyImage = document.createElement("img");
         modifyImage.setAttribute("style", "margin-left: 3px;");
         modifyImage.setAttribute("src", "/static/javascript/src/images/modify.svg");
         modifyImage.setAttribute("alt", "Image");
         modifyImage.onclick = (function(index) {
             return function() {
                 modifyProject(datasetList[index][0]);
             };
         })(i);

        cell10.appendChild(modifyImage);

          var deleteImageSrc = "/static/javascript/src/images/delete_2.svg";
          var deleteImage = document.createElement("img");
          deleteImage.setAttribute("src", deleteImageSrc);
          deleteImage.setAttribute("alt", "Image");
          deleteImage.onclick = (function(index) {
            return function() {
              deleteProject(datasetList[index][0]); // 이 부분에서 인덱스를 사용
            };
          })(i);
          cell11.appendChild(deleteImage);
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

function detailProject(index) {
  var detailModal = document.getElementById("projectDetailModal");
  detailModal.style.display = "block";

  index = index.toString()
  fetch("/train_project/db_train_detail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        tr_idx: index,
    }),
  })
      .then((response) => response.json())
      .then((data) => {
        projectDetailData = data.data[0]
        projectIdx = projectDetailData[0]
        projectUploadTime = projectDetailData[1]
        projectDataset = projectDetailData[2]
        projectMAP = projectDetailData[3]
        projectMlflow = projectDetailData[4]

        var projectIndexInput = document.getElementById("projectIndex");
        var projectDateInput = document.getElementById("projectDate");
        var projectDatasetInput = document.getElementById("projectDataset");
        var projectMapInput = document.getElementById("projectMap");
        var projectHyperInput = document.getElementById("projectHyper");
        var projectMlflowTextarea = document.getElementById("projectMlflow");
        var projectDetailModalOkButton = document.getElementById("projectDetailModalOkButton");

        if (projectDetailModalOkButton) {
            projectDetailModalOkButton.disabled = true;
        }

        if (projectIndexInput) {
          projectIndexInput.value = projectIdx;
          projectIndexInput.readOnly = true;
        }

        if (projectDateInput) {
          projectDateInput.value =  convertDateType(projectUploadTime);
          projectDateInput.readOnly = true;

        }

        if (projectDatasetInput) {
          projectDatasetInput.value = projectDataset;
          projectDatasetInput.readOnly = true;
        }

        if (projectMapInput) {
          projectMapInput.value = projectMAP;
          projectMapInput.readOnly = true;
        }

        if (projectHyperInput) {
          projectHyperInput.value = "hyper";
          projectHyperInput.readOnly = true;
        }

        if (projectMlflowTextarea) {
          projectMlflowTextarea.value = projectMlflow;
          projectMlflowTextarea.readOnly = true;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

}

function modifyProject(index) {
    var detailModal = document.getElementById("projectDetailModal");
    detailModal.style.display = "block";

    index = index.toString()
    fetch("/train_project/db_train_detail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tr_idx: index,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            projectDetailData = data.data[0]
            projectIdx = projectDetailData[0]
            projectUploadTime = projectDetailData[1]
            projectDataset = projectDetailData[2]
            projectMAP = projectDetailData[3]
            projectMlflow = projectDetailData[4]

            var projectIndexInput = document.getElementById("projectIndex");
            var projectDateInput = document.getElementById("projectDate");
            var projectDatasetInput = document.getElementById("projectDataset");
            var projectMapInput = document.getElementById("projectMap");
            var projectHyperInput = document.getElementById("projectHyper");
            var projectMlflowTextarea = document.getElementById("projectMlflow");

            if (projectIndexInput) {
                projectIndexInput.value = projectIdx;
            }

            if (projectDateInput) {
                projectDateInput.value =  convertDateType(projectUploadTime);

            }

            if (projectDatasetInput) {
                projectDatasetInput.value = projectDataset;
            }

            if (projectMapInput) {
                projectMapInput.value = projectMAP;
            }

            if (projectHyperInput) {
                projectHyperInput.value = "hyper";
            }

            if (projectMlflowTextarea) {
                projectMlflowTextarea.value = projectMlflow;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}
function deleteProject(index) {
    var isConfirmed = confirm("프로젝트를 삭제하시겠습니까?");
    if (isConfirmed) {
        var requestData = {
            tr_idx: index
        };

        fetch("/train_project/db_train_delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                location.reload();
                alert("삭제완료");
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {
        console.log("삭제 취소");
    }
}

function createProject(){
    var projectName = document.getElementById("projectName").value;
    var projectModelName = document.getElementById("projectModelName").value;
    var projectCycle = document.getElementById("projectCycle").value;
    var projectDescription = document.getElementById("projectDescription").value;

    // 데이터를 서버로 전송
    fetch('/train_project/db_train_create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tr_name: projectName,
          tr_name_air: projectModelName,
          tr_deploy_cycle: projectCycle,
          tr_description: projectDescription,
          // ds_idx: datasetCreateIdx,
        }),
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('projectName', projectName);
            window.location.href = '/modeling';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function projectDetialModify(){
    console.log("수정!!")
}