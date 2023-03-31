from ink import gen_story, gen_title

def generate_story():
    story = gen_story()
    title = gen_title(story)
    with open('../library/'+(title.replace("\"","").strip()), 'w') as f:
        f.write(story)    
    with open('../library/temp/'+(title.replace("\"","").strip()), 'w') as f:
        f.write(story) 
    # print(title+story)

if (__name__=='__main__'):
    generate_story()