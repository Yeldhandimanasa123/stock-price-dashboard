import numpy as np
from sklearn.preprocessing import MinMaxScaler


def preprocess_data(df):
    """
    Select Close price and normalize data
    """

    close_prices = df[['Close']].values

    scaler = MinMaxScaler(feature_range=(0, 1))

    scaled_data = scaler.fit_transform(close_prices)

    return scaled_data, scaler


def create_sequences(data, sequence_length=60):
    """
    Convert time series into LSTM training sequences
    """

    X = []
    y = []

    for i in range(sequence_length, len(data)):
        X.append(data[i-sequence_length:i])
        y.append(data[i])

    X = np.array(X)
    y = np.array(y)

    return X, y