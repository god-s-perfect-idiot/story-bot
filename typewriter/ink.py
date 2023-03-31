import openai
import os
from dotenv import load_dotenv
from wonderwords import RandomWord 
from random import choice

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def gen_story():
    authors = ["Leo Tolstoy", "James Joyce", "George Orwell", "Jane Austen", "Charles Dickens", "F. Scott Fitzgerald", "Fyodor Dostoyevsky", "William Shakespeare", "Franz Kafka"]
    r = RandomWord()
    word = r.word()
    author = choice(authors)
    response = openai.Completion.create(model="text-davinci-003", prompt="Write an short story about "+word+"  like something "+author+" would write", temperature=0.7, max_tokens=2000)
    return (response.get("choices")[0].get("text")+"\n\t- Psuedonymous "+author)

def gen_title(story):
    response = openai.Completion.create(model="text-davinci-003", prompt="Make a 3 word title for the story "+story, temperature=0.7, max_tokens=20)
    return (response.get("choices")[0].get("text")) 

