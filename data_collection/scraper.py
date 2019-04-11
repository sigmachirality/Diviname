from bs4 import BeautifulSoup as bs
import pandas as pd
import numpy as np
from requests import get
import os

# Function that extracts sentences from a name analysis page on the Kabalarians website
def get_sentences(url):
    page = get(url)
    soup = bs(page.text, 'html.parser')
    return ([sentence.text.replace("Â", " ") for sentence in soup.select('#headerOL li')[1:]])

# Extract sentences from 3000 randomly selected names.
name_website_root = "https://www.kabalarians.com/name-meanings/names"
name_df = pd.read_csv(os.path.join(os.getcwd(), 'name_gender.csv'))
sentences = set()
f = lambda gender: "/male/" if gender == "M" else "/female/"
for _, name in name_df.sample(n=3000).iterrows():
    path = name_website_root + f(name["gender"]) + name["name"] + ".htm"
    sentences.update(set(get_sentences(path)))

# Save scraped sentences as a csv.
pd.Series(list(sentences)).to_csv("sentences.csv")



