from flask import Flask, jsonify
import requests
import random

app = Flask(__name__)


def fetch_financial_data():

    api_url = "https://api.example.com/financial-data"
    
    # Make a GET request to the API
    response = requests.get(api_url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Extract financial data from the response
        financial_data = response.json()
        return financial_data
    else:
        # If the request failed, return an empty dictionary
        return {}


def calculate_growth_trends(data):
    # Iterate through each dataset and add 10 to each data point
    for dataset in data['datasets']:
        dataset['data'] = [value + 10 for value in dataset['data']]
    return data


def generate_visualization_data(growth_trends_data):
    # Extract labels and datasets from growth trends data
    labels = growth_trends_data['labels']
    datasets = growth_trends_data['datasets']


    dataset_label = datasets[0]['label']
    data = datasets[0]['data']

    # Prepare chart data
    chart_data = {
        'labels': labels,
        'datasets': [{
            'label': dataset_label,
            'data': data
        }]
    }
    return chart_data

@app.route('/financial-data', methods=['GET'])
def get_financial_data():
    # Fetch financial data from an API
    financial_data = fetch_financial_data()

    # Calculate growth trends
    growth_trends_data = calculate_growth_trends(financial_data)

    # Return growth trends data as JSON
    return jsonify(growth_trends_data)

@app.route('/visualization-data', methods=['GET'])
def get_visualization_data():
    # Fetch financial data from an API
    financial_data = fetch_financial_data()

    # Calculate growth trends
    growth_trends_data = calculate_growth_trends(financial_data)

    # Generate data for visualization
    visualization_data = generate_visualization_data(growth_trends_data)

    # Return visualization data as JSON
    return jsonify(visualization_data)

if __name__ == '__main__':
    app.run(debug=True)
