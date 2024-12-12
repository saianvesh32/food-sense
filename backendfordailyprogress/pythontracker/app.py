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
            /* Celebration Overlay */
.celebration-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.5s ease;
}

.celebration-message {
    color: #fff;
    font-size: 24px;
    text-align: center;
    background: #4caf50;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    animation: popUp 0.5s ease-out;
}

/* Fade In Animation */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Pop-Up Animation */
@keyframes popUp {
    from {
        transform: scale(0.5);
        opacity: 0.5;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
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
            // Function to show congratulatory message
            function showCongratulations(nutrient) {
                const celebration = document.createElement('div');
                celebration.className = 'celebration-overlay';
                celebration.innerHTML = ` 
                    <div class="celebration-message">
                        🎉 Congratulations! 🎉<br>
                        You've reached your daily goal for <strong>${nutrient}</strong>!
                    </div>
                `;
                document.body.appendChild(celebration);

                // Remove the message after 3 seconds
                setTimeout(() => {
                    document.body.removeChild(celebration);
                }, 3000);
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
                        li.innerHTML = `<span class="item-name">${item}</span>`;
                        suggestions.appendChild(li);
                    });
                }
                // Search for food items
                foodInput.addEventListener('input', () => {
                    const query = foodInput.value;
                    if (query.length > 2) {
                        fetch('/search', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ query: query })
                        })
                        .then(response => response.json())
                        .then(data => renderSuggestions(data.results));
                    }
                });

                const calculateBtn = document.getElementById('calculate-btn');
                calculateBtn.addEventListener('click', () => {
                    const quantity = parseFloat(document.getElementById('quantity').value);
                    const foodItem = foodInput.value;
                    if (!foodItem || quantity <= 0) {
                        alert('Please select a valid food item and quantity.');
                        return;
                    }

                    fetch('/calculate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ food_item: foodItem, quantity: quantity })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.nutrients) {
                            updateProgressAndCharts(data);
                            saveProgressToLocalStorage(data.overall);
                        }
                    });
                });

                function updateProgressAndCharts(data) {
                    const { overall, max_limits } = data;
                    for (const nutrient in overall) {
                        const progress = document.getElementById(`${nutrient.toLowerCase()}-progress`);
                        const percentageElement = document.getElementById(`${nutrient.toLowerCase()}-percentage`);
                        const intakeElement = document.getElementById(`${nutrient.toLowerCase()}-intake`);

                        const currentProgress = overall[nutrient];
                        const maxLimit = max_limits[nutrient];
                        const percentage = Math.min((currentProgress / maxLimit) * 100, 100);

                        progress.style.width = `${percentage}%`;
                        percentageElement.innerText = `${percentage.toFixed(1)}%`;
                        intakeElement.innerText = `${currentProgress.toFixed(1)}/${maxLimit}`;

                        // Show congratulatory message if the user reaches their goal
                        if (currentProgress >= maxLimit) {
                            showCongratulations(nutrient);
                        }
                    }
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
