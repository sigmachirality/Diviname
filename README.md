# Diviname
![](/logo.png)
---

## Running This Skill

Download the zip file `lambda-build` from the repo, and upload to a Lambda instance.
Create a new skill, and use `model.json` to generate an interaction model. Link your skill to your Lambda instance.
Make sure your Lambda instance has DynamoDB permissions to create, read, and write to tables.

If you want to make changes to the code, first run `npm install` at the base directory of this repo.
Then, compress the `\handlers` and `\node-modules` folders and `\index.js` into a zip file and follow the instructions above to deploy.

### Features

- Prompts the user for his/her name and gender
- Provides a name analysis, and, if prompted, a health analysis
- Supports repeating prompts and responding to interruptions
- Remembers the user's name between sessions

### Commands

- `Open Divine Name`
- `Analyze my name`
  - After prompting the user for his/her name and gender, return a name analysis
- `Analyze my health`
  - Provided a name analysis has already been performed, return a health analysis

### Running The Scraper

- Download the folder `data_collection`.
- Install prereqs like numpy, pandas, bsoup4, etc
- Run `./py scraper.py` in a terminal.

---

**Created by Daniel Tao**

**Logo design credits to TotalityHacks - I just changed the hue to be more yellow :P**
