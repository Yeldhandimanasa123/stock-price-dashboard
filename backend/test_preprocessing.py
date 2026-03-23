from data_fetch import fetch_stock_data
from preprocessing import preprocess_data, create_sequences

# fetch data
df = fetch_stock_data("AAPL")

# preprocess
scaled_data, scaler = preprocess_data(df)

# create sequences
X, y = create_sequences(scaled_data)

print("X shape:", X.shape)
print("y shape:", y.shape)