fetch('/cctv/db_acc_result', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {
        var acc = data.data;
        var eventListContainer = document.getElementById('eventListContainer');

        for (var i = 0; i < acc.length; i++) {
            (function(index) {
                var accCompanyName = acc[index][0];
                accCompanyName = accCompanyName !== null ? accCompanyName : " ";

                var accFactoryName = acc[index][1];
                accFactoryName = accFactoryName !== null ? accFactoryName : " ";

                var accRedZone = acc[index][2];
                accRedZone = accRedZone !== null ? accRedZone : " ";

                var accDisaster = acc[index][3];
                accDisaster = accDisaster !== null ? accDisaster : " ";

                // var accSnapShot = acc[index][4];
                // accSnapShot = accSnapShot !== null ? accSnapShot : " ";

                var accGenerationTime = acc[index][4];
                accGenerationTime = accGenerationTime !== null ? accGenerationTime : " ";

                var accIndex = acc[index][5];
                accIndex = accIndex !== null ? accIndex : " ";

                var listItem = document.createElement('div');
                listItem.className = 'eventListOne';
                listItem.textContent = accCompanyName + '_'  + convertDateType(accGenerationTime);
                eventListContainer.appendChild(listItem);

                listItem.addEventListener('click', function() {
                    showEventDetails();
                    showEventPhoto(accIndex);
                });
                listItem.style.cursor = 'pointer';

                function showEventDetails() {
                    var eventDetailContainer = document.querySelector('.eventDetail');
                    eventDetailContainer.innerHTML = '';
                    var detailInfo = document.createElement('div');
                    detailInfo.innerHTML =
                        '회사 이름 : ' + accCompanyName +
                        '<br><br> 공장 이름 : ' + accFactoryName +
                        '<br><br> 레드 존 이름 : ' + accRedZone +
                        '<br><br> 재해 종류 : ' + accDisaster +
                        '<br><br> 발생 시간: ' + convertDateType(accGenerationTime);
                    eventDetailContainer.appendChild(detailInfo);
                }

                function showEventPhoto(accIndex) {
                    var imageContainer = document.getElementById('imageContainer');
                    imageContainer.innerHTML = '';
                    if (imageContainer) {
                        displayBlobImage(accIndex, imageContainer);
                    } else {
                        console.error('imageContainer를 찾을 수 없습니다.');
                    }
                }
            })(i);
        }
    })
    .catch(error => {
        console.error('데이터 가져오기 오류:', error);
    });

function displayBlobImage(accIndex, container) {
    var requestData = {
        accIndex: accIndex
    };

    fetch("/cctv/db_image_result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            // 이미지 조회 쿼리
            try {

                var img = document.createElement('img');
                img.src = "data:image/png;base64," + data.data[0];


                img.onload = function() {
                    if (img.height > img.width) {
                        img.style.height = "100%";
                    } else {
                        img.style.width = "100%";
                    }
                    img.style.objectFit = "cover";
                };

                img.alt = "등록된 이미지가 없습니다.";
                container.appendChild(img);

                img.style.objectFit = "cover";
            } catch (error) {
                console.error("Error displaying image:", error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });


}

