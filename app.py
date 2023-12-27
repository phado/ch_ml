import os
import urllib

from flask import Flask, render_template, request, jsonify
import postgres_curd
import requests
import json    
from flask import Flask,request, jsonify
import os
from werkzeug.utils import secure_filename



app = Flask(__name__)

# dfdf
@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')

@app.route('/open', methods=['GET', 'POST'])
def projectOpen():
    return render_template('open.html')

@app.route('/dataInsertModal', methods=['GET', 'POST'])
def dataInsertModal():
    return render_template('dataInsertModal.html')


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







if __name__ == '__main__':
    app.run()
