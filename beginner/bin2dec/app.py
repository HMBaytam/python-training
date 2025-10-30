from flask import Flask, render_template, request
from main import bin_converter

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def convert():
    bin_num = request.form['bin_num']
    is_binary = all(char in '01' for char in str(bin_num))
    if is_binary:
        decimal_num = bin_converter(bin_num)
        return render_template('index.html', decimal_num=decimal_num, bin_num=bin_num)
    else:
        error_message = "Invalid Binary Number"
        return render_template('index.html', error_message=error_message, bin_num=bin_num)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)