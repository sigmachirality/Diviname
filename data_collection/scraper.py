from bs4 import BeautifulSoup as bs
import pandas as pd
import numpy as np
from requests import get
import os

def get_sentences(url):
    page = get(url)
    soup = bs(page.text, 'html.parser')
    return ([sentence.text for sentence in soup.select('#headerOL li')[1:]])


name_website_root = "https://www.kabalarians.com/name-meanings/names"
name_df = pd.read_csv(os.path.join(os.getcwd(), 'name_gender.csv'))

sentences = set()
f = lambda gender: "/male/" if gender == "M" else "/female/"
for _, name in name_df.sample(n=3000).iterrows():
    path = name_website_root + f(name["gender"]) + name["name"] + ".htm"
    print(path)
    set.update(set(get_sentences(path)))

output = pd.Series(list(sentences))
output.to_csv("sentences.csv")



