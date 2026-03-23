import numpy as np

def predict_next_days(model, data, scaler, days=7):
    predictions = []
    current_batch = data[-60:].reshape(1, 60, 1)

    for _ in range(days):
        pred = model.predict(current_batch)[0]
        predictions.append(pred)

        current_batch = np.append(current_batch[:,1:,:], [[pred]], axis=1)

    return scaler.inverse_transform(predictions)