import matplotlib.pyplot as plt
import numpy as np

from data_fetch import fetch_stock_data
from preprocessing import preprocess_data, create_sequences
from model_training import build_model, train_model
from prediction import predict_next_days

# Fetch data
df = fetch_stock_data("AAPL")

# Preprocess
scaled_data, scaler = preprocess_data(df)
X, y = create_sequences(scaled_data)

# Train model
model = build_model((X.shape[1], 1))
train_model(model, X, y)

# Predict next 7 days
future_prices = predict_next_days(model, scaled_data, scaler)

print("Next 7 days predicted prices:")
print(future_prices)


# ==========================
# Visualization
# ==========================

# Last 100 days of actual data
actual_prices = df['Close'][-100:].values

# Create future index
future_days = np.arange(len(actual_prices), len(actual_prices) + 7)

plt.figure(figsize=(12,6))

# Plot actual prices
plt.plot(range(len(actual_prices)), actual_prices, label="Actual Prices")

# Plot predictions
plt.plot(future_days, future_prices.flatten(), label="Predicted Prices", linestyle='dashed')

plt.title("Stock Price Prediction (Next 7 Days)")
plt.xlabel("Days")
plt.ylabel("Price")
plt.legend()

plt.show()