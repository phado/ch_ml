import os
import urllib
from flask import Flask, render_template, request, jsonify
import postgres_curd
import requests
import json    
from flask import Flask,request, jsonify
import os
from werkzeug.utils import secure_filename
from common_management import make_response_json, success_message_json, fail_message_json
from db_conn import get_pool_conn
from db_query import db_ds_get_list,db_ds_get_detail,db_ds_create,db_ds_delete,db_train_list,db_train_detail,db_train_create,db_train_delete



app = Flask(__name__)
mariadb_pool = get_pool_conn()


# drawIO
@app.route('/modeling')
def modeling():  # put application's code here
    return render_template('index.html')

@app.route('/open', methods=['GET', 'POST'])
def projectOpen():
    return render_template('open.html')

@app.route('/dataInsertModal', methods=['GET', 'POST'])
def dataInsertModal():
    return render_template('dataInsertModal.html')

@app.route('/export' , methods=['POST'])
@app.route('/save' , methods=['POST'])
def save_to_server():
    format = request.form.get('format')
    data = request.form.get('xml')
    if format == 'svg':
            decoding_svg_data = urllib.parse.unquote(data)
            # try:
            #     with open(download_path, 'w') as file:
            #         file.write(decoding_svg_data)
            #     return '', 204 
            # except Exception as e:
            #     return jsonify({'message': f'Error: {str(e)}'}), 500
    elif format == 'png':
        # try:
        decoding_svg_data = urllib.parse.unquote(data)
        #     cairosvg.svg2png(bytestring=decoding_svg_data, write_to=download_path + '.png')
        #     return '', 204 
        # except Exception as e:
        #     return jsonify({'message': f'Error: {str(e)}'}), 500
@app.route('/rtspTest')
def rtsp_test():  # put application's code here
    return render_template('rtspTest.html')
@app.route('/title')
def title_bar():
    return render_template('common/title.html')

@app.route('/dataset_tab')
def dataset_tab ():
    return render_template('tab/dataset.html')

@app.route('/project_tab')
def project_tab ():
    return render_template('tab/projectManagement.html')

@app.route('/distribution_tab')
def distribution_tab ():
    return render_template('tab/distributionManagement.html')

@app.route('/resource_tab1')
def resource_tab1 ():
    return render_template('tab/resourceManagement.html')

@app.route('/resource_tab2')
def resource_tab2 ():
    return render_template('tab/resourceManagement2.html')

@app.route('/aax_tab')
def aax_tab ():
    return render_template('tab/aaxManagement.html')

@app.route('/modelingRun')
def modelingRun ():
    return render_template('tab/modelingRun.html')
'''
장재명 데이터 처리 관련 코드
'''
'''
데이터 업로드
'''
@app.route('/api/fileupload', methods=['post'])
def fileupload():
    try:

        # prj_name=request.json['s']
        prj_name="bbb/"
        image_path='../../../volumes/dataset/'
        files = request.files
        # filename = secure_filename(file.filename)
        os.makedirs(image_path+prj_name, exist_ok = True)
        for f in request.files.to_dict(flat=False)['file']:
            print("aaa")
            f.save(image_path+prj_name+'/'+secure_filename(f.filename))
        
        
        return jsonify({'req':'99'})
    except FileNotFoundError as fe:
        print(fe)
        return jsonify({'req':'99111'})
    except Exception as e:
        print(e)
        return jsonify({'req':'99112'})
'''
ML 상세보기데이터 처리 방법
'''
@app.route('/api/mlflow/explist', methods=['post'])
def explist():
    try:
        db = postgres_curd.CRUD()
        # print(db.readDB(sql="select m.run_uuid, m.value,  r.status, r.start_time, r.end_time  from metrics as m inner join runs as r on m.run_uuid =r.run_uuid inner join experiments as e on r.experiment_id = e.experiment_id  where m.key  = 'mAP.5-.95' and e.name = 'yolov5';"))
        result_data=db.readDB(sql="select r.experiment_id ,r.name,m.run_uuid, r.start_time, m.value from metrics as m inner join runs as r on m.run_uuid =r.run_uuid inner join experiments as e on r.experiment_id = e.experiment_id  where m.key  = 'mAP.5-.95' and e.name = 'yolov5';")
        print(result_data)
        print(f"http://210.178.0.65:31101/#/experiments/{result_data[0][0]}/runs/{result_data[0][2]}")

        
        return jsonify({'req':'99'})
    except Exception as e:
        print(e)
        return jsonify({'req':'99112'})
    
@app.route('/dataset/get_ds_list', methods=['POST'])
def get_ds_list():
    """
    데이터셋 목록 조회
    전체 조회
    output
    data[i][0] = 데이터셋 인덱스 
    data[i][1] = 데이터셋 이름
    data[i][2] = 타입(ex: [화재,끼임] )
    data[i][3] = 생성 시간
    data[i][4] = 수정 시간
    data[i][5] = 다운로드 시간
    ex : {'error': 'False', 'message': '', 'status': '0', 'data': [(1, 'test_1211', '이미지,화재센서', datetime.datetime(2023, 12, 11, 10, 30, 12), datetime.datetime(2023, 12, 11, 10, 30, 12), 0), (2, 'sample_1211', '팬스도어센서,대기질센서,온습도센서', datetime.datetime(2023, 12, 11, 14, 51, 58), datetime.datetime(2023, 12, 11, 14, 52, 31), 0)]}

    """
    try:

        # result_json = make_response_json([])
        result_json = db_ds_get_list(mariadb_pool)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json


@app.route('/dataset/db_ds_get_detail', methods=['GET', 'POST'])
def db_dataset_get_detail():
    """
    데이터셋 상세정보 조회
    ds_idx
    데이터셋 idx
    data[i][0] = 데이터셋 인덱스
    data[i][1] = 타입(ex: [화재,끼임] )
    data[i][2] = 생성 시간
    data[i][3] = 수정 시간
    data[i][4] = 다운로드 시간
    data[i][5] = 설명
    """

    try:
        data = request.get_json()
        ds_idx = data["ds_idx"]

        # result_json = make_response_json([])
        result_json = db_ds_get_detail(mariadb_pool,ds_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json


@app.route('/dataset/db_ds_create', methods=['POST'])
def db_dataset_create():
    """
    데이터셋 생성
    ds_name 데이터셋 이름
    ds_path 데이터셋 경로[]
    ds_type_idx 데이터 타입
    ds_description 데이터셋 설명
    company_idx 실증 기업명
    """

    try:
        data = request.get_json()
        ds_name = data["ds_name"]
        ds_path = data["ds_path"]
        ds_description = data["ds_description"]
        company_idx = data["company_idx"]
        ds_type_idx= data["ds_type_idx"]
        # result_json = make_response_json([])
        result_json = db_ds_create(mariadb_pool,ds_name,ds_path,ds_description,company_idx,ds_type_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json


@app.route('/dataset/db_ds_delete', methods=['GET', 'POST'])
def db_dataset_delete():
    """
    데이터셋 삭제
    ds_idx 데이터셋 idx
    """
    
    try:
        data = request.get_json()
        ds_idx= data["ds_idx"]
        # result_json = make_response_json([])
        result_json = db_ds_delete(mariadb_pool,ds_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json

@app.route('/train_project/db_train_list', methods=['POST'])
def database_train_list():
    """
  학습 프로젝트 목록조회
    company_idx
    
    data[i][0]=학습 프로젝트 index
    data[i][1]=학습 프로젝트 name
    data[i][2]=알고리즘 명
    data[i][3]=상태
    data[i][4]=생성일 
    data[i][5]]=map
    data[i][6]=생성 주기
    data[i][7]=마지막 수정일
    data[i][8]=설명
    
    """
    
    try:
        # result_json = make_response_json([])
        result_json = db_train_list(mariadb_pool)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json


@app.route('/train_project/db_train_detail', methods=['POST'])
def database_train_detail():
    """
    학습 프로젝트 상세 정보 표시
    tr_idx
    
    data[i][0]= index
    data[i][1]=생성일
    data[i][2]=데이터셋[]
    data[i][3]=map
    data[i][4]=mlflow 
    
    """
    
    try:
        data = request.get_json()
        tr_idx= data["tr_idx"]
        # result_json = make_response_json([])
        result_json = db_train_detail(mariadb_pool,tr_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json

@app.route('/train_project/db_train_create', methods=['POST'])
def db_train_create():
    """
    tr_name  :학습 프로젝트 이름
    tr_name_air : airflow 경로
    company_idx : 회사 idx
    tr_deploy_cycle :학습 주기
    tr_description : 설명
    ds_idx : 데이터셋 idx 
    """
    
    try:
        data = request.get_json()
        tr_name= data["tr_name"]
        tr_name_air= data["tr_name_air"]
        company_idx= data["company_idx"]
        tr_deploy_cycle= data["tr_deploy_cycle"]
        tr_description= data["tr_description"]
        ds_idx= data["ds_idx"]
        # result_json = make_response_json([])
        result_json = db_train_create(mariadb_pool,tr_name,tr_name_air,company_idx,tr_deploy_cycle,tr_description,ds_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json

@app.route('/train_project/db_train_delete', methods=['POST'])
def database_train_delete():
    """
    데이터셋 삭제
    ds_idx 데이터셋 idx
    """
    
    try:
        data = request.get_json()
        tr_idx= data["tr_idx"]
        # result_json = make_response_json([])
        result_json = db_train_delete(mariadb_pool,tr_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json


@app.route('/deploy_model/db_deploy_list', methods=['POST'])
def db_deploy_list():
    """
    배포 화면 리스트 
    data[i][0] = 서비스 idx
    data[i][1] = 서비스 이름
    data[i][2] = 타입
    data[i][3] = 상태
    data[i][4] = 생성시간
    data[i][5] = 수정일
    """
    
    try:

        # result_json = make_response_json([])
        result_json = db_train_create(mariadb_pool)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json

@app.route('/deploy_model/db_deploy_detail', methods=['POST'])
def db_deploy_detail():
    """
    데이터셋 삭제
    ds_idx 데이터셋 idx
    """
    
    try:
        data = request.get_json()
        svc_idx= data["svc_idx"]
        # result_json = make_response_json([])
        result_json = db_train_create(mariadb_pool,svc_idx)

    except ValueError as e:
        print(e)
        result_json = fail_message_json(result_json)

    return result_json









if __name__ == '__main__':
    app.run()
