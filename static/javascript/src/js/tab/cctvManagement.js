fetch('/acc_cctv/db_get_cctv', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {
        // 서버에서 받아온 데이터를 가지고 테이블에 추가
        updateCCTVTable(data.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// 테이블 업데이트 함수
function updateCCTVTable(cctvData) {
    // 테이블 요소와 tbody 요소 가져오기
    const cctvTable = document.getElementById("cctvTable");
    const tbody = cctvTable.querySelector("tbody");

    // 기존 행 삭제
    tbody.innerHTML = "";

    for (let i = 0; i < cctvData.length; i++) {
        const row = tbody.insertRow();

        const cellCompanyName = row.insertCell(0);
        cellCompanyName.textContent = cctvData[i][1];

        const cellFactoryName = row.insertCell(1);
        cellFactoryName.textContent = cctvData[i][2];

        const cellRedZoneName = row.insertCell(2);
        cellRedZoneName.textContent = cctvData[i][4];

        const cellCCTVName = row.insertCell(3);
        cellCCTVName.textContent = cctvData[i][6];

        const cellCCTVURL = row.insertCell(4);
        cellCCTVURL.textContent = cctvData[i][7];

        cellCCTVURL.addEventListener('click', function() {
            copyToClipboard(cellCCTVURL.textContent);
        });

        cellCCTVURL.style.cursor = 'pointer';
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    showNotification('Copied to clipboard: ' + text);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}