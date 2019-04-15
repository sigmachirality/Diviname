from bs4 import BeautifulSoup as bs
import pandas as pd
import numpy as np
from requests import get
import os


# Function that extracts sentences from a name analysis page on the Kabalarians website
def get_sentences(name, gender):
    f = lambda gender: "/male/" if gender == "M" else "/female/"
    url = name_website_root + f(gender) + name + ".htm"
    page = get(url)
    soup = bs(page.text, 'html.parser')
    sentences = soup.select('#headerOL > ul li')
    if len(sentences) < 2:
        return (None, None)
    return ([sentence.text.partition(u'\xa0')[0].strip() for sentence in sentences[1:-1]], sentences[-1].text)

# Extract sentences from 3000 randomly selected names.
name_website_root = "https://www.kabalarians.com/name-meanings/names"
name_df = pd.read_csv(os.path.join(os.getcwd(), 'name_gender.csv'))
msentences = set()
fsentences = set()
mhealth = set()
fhealth = set()
for _, name in name_df.sample(n=3000).iterrows():
    ret = get_sentences(name["name"], name["gender"])
    if ret[0] is None:
        continue
    if name["gender"] == "M":
        msentences.update(set(ret[0]))
        mhealth.add(ret[1])
    else:
        fsentences.update(set(ret[0]))
        fhealth.add(ret[1])


# Return output as text with syntax of Javascript array of strings
file = open("output.txt", "w")

msentences = [sentence.replace("\"", "\\\"") for sentence in msentences if isinstance(sentence, str)]
fsentences = [sentence.replace("\"", "\\\"") for sentence in fsentences if isinstance(sentence, str)]
mhealth = [sentence.replace("\"", "\\\"") for sentence in mhealth if isinstance(sentence, str)]
fhealth = [sentence.replace("\"", "\\\"") for sentence in fhealth if isinstance(sentence, str)]
file.write("msentences: \"" + '", \n"'.join(msentences) + "\"")
file.write("fsentences: \"" + '", \n"'.join(fsentences) + "\"")
file.write("mhealth: \"" + '", \n"'.join(mhealth) + "\"")
file.write("fhealth: \"" + '", \n"'.join(fhealth) + "\"")



