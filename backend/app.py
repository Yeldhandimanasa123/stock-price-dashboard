from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

from data_fetch import fetch_stock_data
from preprocessing import preprocess_data
from model_training import load_saved_model
from prediction import predict_next_days

app = Flask(__name__)
CORS(app)

# Load model once
model = load_saved_model()


@app.route("/predict", methods=["GET"])
def predict():
    try:
        ticker = request.args.get("ticker", "AAPL")

        # Fetch data
        df = fetch_stock_data(ticker)

        # 🔥 HANDLE Date / Datetime SAFELY
        if 'Date' in df.columns:
            df['Date'] = pd.to_datetime(df['Date'])
        elif 'Datetime' in df.columns:
            df['Datetime'] = pd.to_datetime(df['Datetime'])
            df.rename(columns={'Datetime': 'Date'}, inplace=True)
        else:
            return jsonify({"error": "No Date column found"}), 400

        # Last 100 rows
        df_last = df.tail(100)

        dates = df_last['Date'].dt.strftime('%Y-%m-%d').tolist()
        actual_prices = df_last['Close'].tolist()

        # Preprocess
        scaled_data, scaler = preprocess_data(df)

        # Predict next 7 days
        future_prices = predict_next_days(model, scaled_data, scaler, 7)

        return jsonify({
            "dates": dates,
            "actual": actual_prices,
            "predicted": future_prices.flatten().tolist()
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)