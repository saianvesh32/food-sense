import pandas as pd
import ydata_profiling as pp  # Use only ydata_profiling
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import warnings
import pickle

# Metrics and Model Selection
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.pipeline import make_pipeline, Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB

warnings.filterwarnings("ignore")

# Classification Metrics
def classification_metrics(model, X_train, y_train, X_test, y_test):
    y_pred = model.predict(X_test)
    conf_matrix = confusion_matrix(y_test, y_pred)
    
    print(f"Training Accuracy Score: {model.score(X_train, y_train) * 100:.1f}%")
    print(f"Validation Accuracy Score: {model.score(X_test, y_test) * 100:.1f}%")
    sns.heatmap(pd.DataFrame(conf_matrix), annot=True, cmap="YlGnBu", fmt="g")
    plt.title("Confusion Matrix", fontsize=20)
    plt.xlabel("Predicted label", fontsize=15)
    plt.ylabel("Actual label", fontsize=15)
    plt.show()
    print(classification_report(y_test, y_pred))

# Remove Outliers
def remove_outliers(df):
    numeric_cols = df.select_dtypes(include=np.number).columns
    Q1 = df[numeric_cols].quantile(0.25)
    Q3 = df[numeric_cols].quantile(0.75)
    IQR = Q3 - Q1
    df_cleaned = df[~((df[numeric_cols] < (Q1 - 1.5 * IQR)) | (df[numeric_cols] > (Q3 + 1.5 * IQR))).any(axis=1)]
    return df_cleaned

# Save Model
def save_model(model, filename):
    pickle.dump(model, open(filename, "wb"))

# Load Dataset
df = pd.read_csv("SmartCrop-Dataset.csv")

# Data Cleaning
df_cleaned = remove_outliers(df)

# Split Data to Training and Validation set
target = "label"
X_train, X_test, y_train, y_test = train_test_split(
    df_cleaned.drop(target, axis=1),
    df_cleaned[target],
    test_size=0.2,
    random_state=0
)

# Train and Evaluate Model
pipeline = make_pipeline(StandardScaler(), GaussianNB())
pipeline.fit(X_train, y_train)
classification_metrics(pipeline, X_train, y_train, X_test, y_test)

# Save Model
save_model(pipeline, "model.pkl")
