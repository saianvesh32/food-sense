import streamlit as st
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.exceptions import NotFittedError

# Function to ensure TF-IDF is fitted
def ensure_tfidf_fitted(tfidf, dataset):
    try:
        tfidf.transform(["test"])  # Check if fitted
    except NotFittedError:
        tfidf.fit(dataset['Ingredients'])
        with open('tfidf.pkl', 'wb') as f:
            pickle.dump(tfidf, f)
    return tfidf

# Load models and data
try:
    with open('health_model.pkl', 'rb') as f:
        health_model = pickle.load(f)

    with open('risk_model.pkl', 'rb') as f:
        risk_model = pickle.load(f)

    with open('tfidf.pkl', 'rb') as f:
        tfidf = pickle.load(f)

    dataset = pd.read_csv('data.csv')
    # Clean and standardize column data
    dataset['Ingredients'] = dataset['Ingredients'].fillna('').str.lower()
    dataset['Product Name'] = dataset['Product Name'].str.strip().str.lower()  # Ensure names are clean and lowercase
except FileNotFoundError as e:
    st.error(f"Missing required file: {e.filename}. Please ensure all files are in place.")
    st.stop()

# Ensure TF-IDF is fitted
tfidf = ensure_tfidf_fitted(tfidf, dataset)

# Set Streamlit Page Configuration
st.set_page_config(
    page_title="Health & Risk Predictor",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# App title
st.title("🔍 Product Health & Risk Predictor")
st.write("Discover the health impacts, risks, and safer alternatives for everyday products.")

# Initialize session state for storing the selected product
if "selected_product" not in st.session_state:
    st.session_state.selected_product = None

# Search Bar with Auto-Suggest
st.header("Search Food Item")
search_query = st.text_input("Type the food name:", placeholder="Start typing to see suggestions...", key="search_box")

# Generate suggestions dynamically
if search_query:
    query_lower = search_query.lower().strip()
    # Filter dataset for substring matches
    suggestions = [product for product in dataset['Product Name'] if query_lower in product]
else:
    suggestions = []

# Display suggestions dynamically
if suggestions:
    st.write("**Suggestions:**")
    for suggestion in suggestions[:10]:  # Limit to 10 suggestions
        if st.button(suggestion.title()):  # Button click updates the selected product
            st.session_state.selected_product = suggestion

# Use session state to display results
selected_product = st.session_state.selected_product

# Display Results for Selected Product
# Display Results for Selected Product
if selected_product:
    # Match row case-insensitively
    product_row = dataset[dataset['Product Name'] == selected_product.lower()]
    if not product_row.empty:
        ingredients = product_row['Ingredients'].values[0]
        input_vector = tfidf.transform([ingredients])

        try:
            health_impact = health_model.predict(input_vector)[0]
            risk_level = risk_model.predict(input_vector)[0]
        except Exception as e:
            st.error(f"Model prediction failed: {e}")
            st.stop()

        # Find safer alternatives in the dataset
        safer_alternatives = product_row['Safer Alternative'].values[0].split(';') if 'Safer Alternative' in product_row.columns else []
        safer_alternatives = [alt.strip() for alt in safer_alternatives if alt.strip()]  # Clean up alternatives

        # If no alternatives found in the dataset, use AI to suggest
        if not safer_alternatives:
            st.info("No direct alternatives found in the dataset. Using AI to suggest alternatives.")
            product_vector = tfidf.transform([ingredients])
            similarity_scores = cosine_similarity(product_vector, tfidf.transform(dataset['Ingredients']))
            similar_indices = similarity_scores.argsort()[0][::-1]

            # Generate alternatives using AI
            for idx in similar_indices:
                similar_product = dataset.iloc[idx]['Product Name']
                if similar_product != selected_product.lower():
                    safer_alternative = dataset.iloc[idx]['Safer Alternative']
                    if safer_alternative and safer_alternative not in safer_alternatives:
                        safer_alternatives.append(safer_alternative)
                    if len(safer_alternatives) >= 3:
                        break

        # Display results
        st.success("Prediction Results")
        col1, col2 = st.columns([2, 3])
        with col1:
            st.write(f"**Product Name:** {selected_product.title()}")
            st.write(f"**Health Impact:** {health_impact}")
            st.write(f"**Risk Level:** {risk_level}")
        with col2:
            st.write("**Safer Alternatives:**")
            if safer_alternatives:
                for alternative in safer_alternatives:
                    st.write(f"- {alternative}")
            else:
                st.write("No safer alternatives available.")
    else:
        st.warning(f"No data found for the product '{selected_product.title()}' in the database.")
elif search_query and selected_product is None:
    st.warning(f"No matching products found in the database for '{search_query}'. Please try another food item.")
