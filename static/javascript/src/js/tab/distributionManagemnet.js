function createDataset() {
  var createModal = document.getElementById("distributionCreateModal");
  createModal.style.display = "block";
}

function createModalClose() {
  var createModal = document.getElementById("distributionCreateModal");
  createModal.style.display = "none";
}

function detailDistribution() {
  var detailModal = document.getElementById("distributionDetailModal");
  detailModal.style.display = "block";
}
function detailDistributionModalClose() {
  var detailModal = document.getElementById("distributionDetailModal");
  detailModal.style.display = "none";
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('serviceNameInput').value = "게시판 서비스 이름_끼임";
  document.getElementById('cctvInput').value = "rtsp://220.125.197.245:10001/kpst";
});