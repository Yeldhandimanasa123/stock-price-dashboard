import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM


def build_model(input_shape):
    """
    Build LSTM neural network
    """

    model = Sequential()

    # First LSTM layer
    model.add(LSTM(50, return_sequences=True, input_shape=input_shape))

    # Second LSTM layer
    model.add(LSTM(50))

    # Dense layers
    model.add(Dense(25))
    model.add(Dense(1))

    model.compile(
        optimizer='adam',
        loss='mean_squared_error'
    )

    return model


def train_model(model, X_train, y_train):

    history = model.fit(
        X_train,
        y_train,
        batch_size=32,
        epochs=20
    )
def save_model(model, filename="stock_model.h5"):
    model.save(filename)


def load_saved_model(filename="stock_model.h5"):
    from tensorflow.keras.models import load_model
    return load_model(filename)

    return history