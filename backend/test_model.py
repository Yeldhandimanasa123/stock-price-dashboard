from data_fetch import fetch_stock_data
from preprocessing import preprocess_data, create_sequences
from model_training import build_model, train_model

# Fetch data
df = fetch_stock_data("AAPL")

# Preprocess
scaled_data, scaler = preprocess_data(df)

X, y = create_sequences(scaled_data)

# Build model
model = build_model((X.shape[1], 1))

# Train model
train_model(model, X, y)

print("Training complete")