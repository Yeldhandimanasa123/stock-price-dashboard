import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt


def fetch_stock_data(ticker="AAPL", period="5y"):
    """
    Fetch historical stock data from Yahoo Finance
    """

    stock = yf.Ticker(ticker)

    df = stock.history(period=period)

    df.reset_index(inplace=True)

    return df


# Run this only when the file is executed directly
if __name__ == "__main__":

    df = fetch_stock_data("AAPL")

    print(df.head())

    # Plot stock price
    plt.figure(figsize=(10,5))
    plt.plot(df["Date"], df["Close"])
    plt.title("Stock Closing Price")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.show() 