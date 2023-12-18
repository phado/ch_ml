import os
import urllib

from flask import Flask, render_template, request, jsonify

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



if __name__ == '__main__':
    app.run()
