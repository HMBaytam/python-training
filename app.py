from flask import Flask, render_template, request, url_for
import funcs

app = Flask(__name__)

@app.route('/')
def homepage():
    links = []
    for rule in app.url_map.iter_rules():
    # Filter out rules not intended for browser navigation
    # and those requiring parameters that aren't provided by defaults
        if "GET" in rule.methods and len(rule.defaults or ()) >= len(rule.arguments):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint)) # Store URL and endpoint name
    return render_template('index.html', links=links)

@app.route('/bin2dec')
def bin2dec():
    return render_template('bin2dec.html', bin_num='1010')

@app.route('/bin2dec', methods=['POST'])
def convert():
    bin_num = request.form['bin_num']
    is_binary = all(char in '01' for char in str(bin_num))
    if is_binary:
        decimal_num = funcs.bin_converter(bin_num)
        return render_template('bin2dec.html', decimal_num=decimal_num, bin_num=bin_num)
    else:
        error_message = "Invalid Binary Number"
        return render_template('bin2dec.html', error_message=error_message, bin_num=bin_num)
@app.route('/calculator')
def calculator():
    return render_template('calculator.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)