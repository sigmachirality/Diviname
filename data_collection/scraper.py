from bs4 import BeautifulSoup as bs
import pandas as pd
import numpy as np
from requests import get
import os


# Function that extracts sentences from a name analysis page on the Kabalarians website
def get_sentences(url):
    page = get(url)
    soup = bs(page.text, 'html.parser')
    return [sentence.text.partition(u'\xa0')[0].strip() for sentence in soup.select('#headerOL > ul li')[1:]]

# Extract sentences from 3000 randomly selected names.
name_website_root = "https://www.kabalarians.com/name-meanings/names"
name_df = pd.read_csv(os.path.join(os.getcwd(), 'name_gender.csv'))
sentences = set()
f = lambda gender: "/male/" if gender == "M" else "/female/"
for _, name in name_df.sample(n=3000).iterrows():
    path = name_website_root + f(name["gender"]) + name["name"] + ".htm"
    sentences.update(set(get_sentences(path)))

# Return output as text with syntax of Javascript array of strings
series = pd.Series(list(sentences))
series = [sentence.replace("\"", "\\\"") for sentence in series if isinstance(sentence, str)]
file.write("\"" + '", \n"'.join(series) + "\"")


