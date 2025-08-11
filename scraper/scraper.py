import requests
from bs4 import BeautifulSoup
import pandas as pd
import psycopg2
import re  # for regex cleanup

BASE_URL = "http://books.toscrape.com/catalogue/page-{}.html"

titles, prices, ratings, availability = [], [], [], []

for page in range(1, 3):  # Scrape first 2 pages for example
    res = requests.get(BASE_URL.format(page))
    soup = BeautifulSoup(res.text, 'html.parser')

    for book in soup.select('.product_pod'):
        titles.append(book.h3.a['title'])

        # Clean price: remove £ and any spaces/non-breaking spaces
        raw_price = book.select_one('.price_color').text
        numeric_price = re.sub(r'[^\d\.]', '', raw_price)  # keep only digits & dot
        prices.append(float(numeric_price))

        ratings.append(book.p['class'][1])  # e.g. "Three"
        availability.append(book.select_one('.availability').text.strip())

df = pd.DataFrame({
    'title': titles,
    'price': prices,
    'rating': ratings,
    'availability': availability
})

# Save to CSV
df.to_csv('books.csv', index=False)

# Insert into PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    dbname="bookdb",   # make sure this matches the DB you created
    user="postgres",
    password="yboliver",  # replace with your actual password
    port=5432
)
cur = conn.cursor()

for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO books (title, price, rating, availability)
        VALUES (%s, %s, %s, %s)
    """, (row['title'], row['price'], row['rating'], row['availability']))

conn.commit()
cur.close()
conn.close()

print("Data scraped and inserted successfully!")
