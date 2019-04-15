# Diviname

---

## Running This Skill

Download the zip file `lambda-build` from the repo, and upload to a Lambda instance.
Create a new skill, and use model.json to generate an interaction model. Link your skill to your Lambda instance.
Make sure your Lambda instance has DynamoDB permissions to create, read, and write to tables.

### Features

- Prompts the user for his/her name and gender
- Provides a name analysis, and, if prompted, a health analysis
- Supports repeating prompts and responding to interruptions
- Remembers the user's name between sessions

### Commands

- Analyze my name
  - After prompting the user for his/her name and gender, return a name analysis
- Analyze my health
  - Provided a name analysis has already been performed, return a health analysis
  
---

**Created by Daniel Tao**
