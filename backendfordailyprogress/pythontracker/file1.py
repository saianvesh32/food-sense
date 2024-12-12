from flask import Flask, render_template_string, request, jsonify
import json
from flask_cors import CORS  # Correct import

app = Flask(__name__)
CORS(app)  # Use app, not APPEND

# Load the food data from the JSON file
with open("file.json") as f:
    food_data = json.load(f)

# Initialize the overall nutrient intake as 0
overall = {
    "Calories": 0,
    "Fats": 0,
    "Proteins": 0,
    "Carbohydrates": 0
}

# Max daily limits for tracking
max_limits = {
    "Calories": 2400,
    "Fats": 30,
    "Proteins": 100,
    "Carbohydrates": 130
}

@app.route("/")
def index():
    html_content = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nutrient Tracker</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
            }
            h1 { 
                text-align: center; 
                color: #4caf50; 
            }
            #main-container {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 20px;
                margin-top: 30px;
            }
            #input-section {
                text-align: center;
                width: 30%;
            }
            #input-section input, #calculate-btn {
                width: 80%;
                padding: 10px;
                margin: 10px auto;
                display: block;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            #calculate-btn {
                background-color: #4caf50;
                color: white;
                border: none;
                cursor: pointer;
            }
            #calculate-btn:hover {
                background-color: #45a049;
            }
            #pie-charts {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 35%;
            }
            .chart-row {
                display: flex;
                justify-content: space-between;
                gap: 10px;
            }
            .chart-container {
                width: 48%;
                height: 200px;
            }
            #tracker {
                width: 30%;
            }
            .nutrient-row {
                margin-bottom: 10px;
            }
            .nutrient-btn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background: #f9f9f9;
                border-radius: 5px;
                border: 1px solid #ddd;
            }
            .progress-bar {
                height: 4px;
                background: #f3f3f3;
                margin-top: 5px;
                overflow: hidden;
                border-radius: 2px;
            }
            .progress {
                height: 100%;
                background: #4caf50;
                border-radius: 2px;
            }
            .suggestion-item {
                padding: 10px;
                cursor: pointer;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .suggestion-item:hover {
                background: #f4f4f4;
            }

            .suggestion-item .item-name {
                font-size: 16px;
                color: #333;
                flex-grow: 1;
            }

        </style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
        <h1>Nutrient Tracker</h1>
        <div id="main-container">
            <div id="input-section">
                <input type="text" id="food-item" placeholder="Type a food item">
                <ul id="suggestions"></ul>
                <input type="number" id="quantity" placeholder="Quantity (e.g., grams)">
                <button id="calculate-btn">Calculate</button>
            </div>
            <div id="pie-charts">
                <div class="chart-row">
                    <div class="chart-container">
                        <canvas id="calories-chart"></canvas>
                        <p>Calories</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="carbohydrates-chart"></canvas>
                        <p>Carbohydrates</p>
                    </div>
                </div>
                <div class="chart-row">
                    <div class="chart-container">
                        <canvas id="proteins-chart"></canvas>
                        <p>Proteins</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="fats-chart"></canvas>
                        <p>Fats</p>
                    </div>
                </div>
            </div>
            <div id="tracker">
                {% for nutrient, max_limit in max_limits.items() %}
                <div class="nutrient-row">
                    <button class="nutrient-btn">
                        <span id="{{ nutrient.lower() }}-percentage">0%</span>
                        <span class="nutrient-name">{{ nutrient }}</span>
                        <span id="{{ nutrient.lower() }}-intake">0/{{ max_limit }}</span>
                    </button>
                    <div class="progress-bar">
                        <div class="progress" id="{{ nutrient.lower() }}-progress" style="width: 0%;"></div>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        <script>
        // Save progress to local storage
            function saveProgressToLocalStorage(overall) {
                localStorage.setItem('nutrientProgress', JSON.stringify(overall));
            }

            // Load progress from local storage
            function loadProgressFromLocalStorage() {
                const storedProgress = localStorage.getItem('nutrientProgress');
                return storedProgress ? JSON.parse(storedProgress) : null;
            }
            document.addEventListener('DOMContentLoaded', () => {
                const foodInput = document.getElementById('food-item');
                const suggestions = document.getElementById('suggestions');
                const savedProgress = loadProgressFromLocalStorage();
                 if (savedProgress) {
                    fetch('/current_progress')
                        .then(response => response.json())
                        .then(data => {
                            updateProgressAndCharts({ nutrients: {}, overall: savedProgress, max_limits: data.max_limits });
                        })
                        .catch(error => console.error('Error loading current progress:', error));
                }
                
                function renderSuggestions(items) {
                    suggestions.innerHTML = '';
                    items.forEach(item => {
                        const li = document.createElement('li');
                        li.classList.add("suggestion-item");
                        li.innerHTML = `
                            <span class="item-name">${item}</span>
                        `;
                        li.addEventListener('click', () => {
                            foodInput.value = item;
                            suggestions.innerHTML = '';
                        });
                        suggestions.appendChild(li);
                    });
                }

                let suggestionTimeout;
                foodInput.addEventListener('input', () => {
                    clearTimeout(suggestionTimeout);
                    suggestionTimeout = setTimeout(() => {
                        const query = foodInput.value.trim();
                        if (query.length === 0) {
                            suggestions.innerHTML = '';
                            return;
                        }

                        fetch('/search', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ query })
                        })
                        .then(response => response.json())
                        .then(data => renderSuggestions(data.results))
                        .catch(error => console.error('Error fetching suggestions:', error));
                    }, 300);
                });

                const calculateBtn = document.getElementById('calculate-btn');
                calculateBtn.addEventListener('click', () => {
                    const foodItem = foodInput.value.trim();
                    const quantity = document.getElementById('quantity').value;

                    fetch('/calculate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ food_item: foodItem, quantity })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            alert(data.error);
                        } else {
                            updateProgressAndCharts(data);
                        }
                    })
                    .catch(error => console.error('Error calculating nutrition:', error));
                });

                function updateProgressAndCharts(data) {
                    const { nutrients, overall, max_limits } = data;

                    // Update the progress bars and percentage for each nutrient
                    ["calories", "carbohydrates", "proteins", "fats"].forEach(nutrient => {
                        const nutrientCap = nutrient.charAt(0).toUpperCase() + nutrient.slice(1); // Capitalize first letter
                        const intake = overall[nutrientCap];
                        const maxLimit = max_limits[nutrientCap];

                        // Calculate percentage
                        const percentage = Math.min((intake / maxLimit) * 100, 100);

                        // Update text for intake and percentage
                        document.getElementById(`${nutrient}-intake`).textContent = `${intake.toFixed(1)}/${maxLimit}`;
                        document.getElementById(`${nutrient}-percentage`).textContent = `${Math.round(percentage)}%`;

                        // Update the progress bar width
                        const progressBar = document.getElementById(`${nutrient}-progress`);
                        progressBar.style.width = `${percentage}%`;
                    });
                      saveProgressToLocalStorage(overall);

                    // Update the pie charts
                    updateCharts(overall, max_limits);
                }


                // Initialize Chart.js pie charts
                let charts = {};
                function updateCharts(overall, max_limits) {
                    const colors = {
                        calories: ["#ff6384", "#ffccd5"], // Pink tones
                        carbohydrates: ["#36a2eb", "#dbeffe"], // Blue tones
                        proteins: ["#ffce56", "#fff7d6"], // Yellow tones
                        fats: ["#4bc0c0", "#d6f5f5"], // Teal tones
                    };

                    ["calories", "carbohydrates", "proteins", "fats"].forEach(nutrient => {
                        const nutrientCap = nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
                        const percentage = (overall[nutrientCap] / max_limits[nutrientCap]) * 100;

                        if (!charts[nutrient]) {
                            const ctx = document.getElementById(`${nutrient}-chart`).getContext('2d');
                            charts[nutrient] = new Chart(ctx, {
                                type: 'doughnut',
                                data: {
                                    labels: [`${nutrientCap}`, "Remaining"],
                                    datasets: [{
                                        data: [percentage, 100 - percentage],
                                        backgroundColor: colors[nutrient],
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { display: false }
                                    }
                                }
                            });
                        } else {
                            // Update existing chart data
                            charts[nutrient].data.datasets[0].data = [percentage, 100 - percentage];
                            charts[nutrient].update();
                        }
                    });
                }

            });
        </script>
    </body>
    </html>
    '''
    return render_template_string(html_content, max_limits=max_limits)

@app.route("/search", methods=["POST"])
def search_food_item():
    query = request.form.get("query", "").lower()
    matching_items = [item["Food_items"] for item in food_data if query in item["Food_items"].lower()]
    return jsonify({"results": matching_items})

@app.route("/calculate", methods=["POST"])
def calculate():
    try:
        food_item = request.form.get("food_item")
        quantity = float(request.form.get("quantity", 0))

        # Find the food item in the JSON file
        item = next((i for i in food_data if i["Food_items"].lower() == food_item.lower()), None)
        if not item:
            return jsonify({"error": "Food item not found"}), 404

        # Calculate nutrient intake based on quantity
        nutrients = {key: (item[key] * quantity) / 100 for key in ["Calories", "Fats", "Proteins", "Carbohydrates"]}

        # Update overall intake and ensure it doesn't exceed max limits
        for key in nutrients:
            overall[key] = min(overall[key] + nutrients[key], max_limits[key])

        # Send updated nutrient data back to the frontend
        return jsonify({"nutrients": nutrients, "overall": overall, "max_limits": max_limits})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred"}), 500


@app.route("/current_progress", methods=["GET"])
def current_progress():
    return jsonify({"overall": overall, "max_limits": max_limits})

if __name__ == "__main__":
    app.run(debug=True)
                                                                                                                                                        