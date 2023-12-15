from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


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
