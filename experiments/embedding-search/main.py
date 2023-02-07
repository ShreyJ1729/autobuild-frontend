import os
import json
import openai
import dotenv
from tqdm import tqdm
from openai.embeddings_utils import cosine_similarity, get_embedding

# load environment variables
config = dotenv.dotenv_values("../../.env")
openai.api_key = config["OPENAI_API_KEY"]

print(config)


# prompt for chunk summarization
def chunk_summarization_prompt(question, text):
    return f"""
        Instructions:
        - You are a text based search engine
        - Summarize the following text to be shorter and more concise
        - Keywords and summary should be relevant to answer the user's query
        - Retain as much information as possible so you can answer the question later

        Question:
        {question}

        Text:
        {text}

        Summary:
    """


# prompt for question answering from summarized text
def question_answering_prompt(question, text, summary):
    return f"""
        Instructions:
        - You are a text based search engine
        - Answer the following question based on the text and summary
        - The answer should be relevant to the user's query

        Question:
        {question}

        Summarized text:
        {summary}

        Answer:
    """


# process text into embeddings and save
def process_text_into_embeddings(filename, chunksize=2048):
    # extract all text from file.txt and remove newlines
    text = open(filename, "r").read().replace("\n", " ")

    # split text into chunks of sentences
    chunks = [text[i : i + chunksize] for i in range(0, len(text), chunksize)]

    print(f"Number of chunks: {len(chunks)}")
    print(
        f"Average chunk length: {sum([len(chunk) for chunk in chunks]) / len(chunks)}"
    )

    # get embedding for each chunk
    embeddings = []
    for chunk in tqdm(chunks):
        embeddings.append(get_embedding(chunk, engine="text-embedding-ada-002"))

    # save embeddings with their corresponding chunk into json
    with open("embeddings.json", "w") as f:
        json.dump(
            [
                {"chunk": chunk, "embedding": embedding}
                for chunk, embedding in zip(chunks, embeddings)
            ],
            f,
            indent=4,
        )


# load embeddings and show top 3 most similar chunks to a query
def query_embeddings(query, output_tokens=100):
    # load embeddings from json
    with open("embeddings.json", "r") as f:
        embeddings = json.load(f)

    # get top 3 most similar chunks to the query
    query_embedding = get_embedding(query, engine="text-embedding-ada-002")
    top_3 = sorted(
        embeddings,
        key=lambda x: cosine_similarity(query_embedding, x["embedding"]),
        reverse=True,
    )[:5]

    # get the chunk summary for the top 3 chunks
    summaries = []
    for chunk in top_3:
        prompt = chunk_summarization_prompt(query, chunk["chunk"])
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            temperature=0,
            max_tokens=output_tokens,
        )
        summaries.append(response["choices"][0]["text"])

    # combine the top three summarized chunks into one
    combined_summary = " ".join(summaries)

    # get the answer to the query from the combined summary
    prompt = question_answering_prompt(query, combined_summary, combined_summary)
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0,
        max_tokens=output_tokens,
    )
    answer = response["choices"][0]["text"]
    print(f"Answer: {answer}")


if __name__ == "__main__":
    if not os.path.exists("embeddings.json"):
        print("Processing text into embeddings...")
        process_text_into_embeddings("../data/harry-potter.txt", chunksize=2048)
    else:
        print("Embeddings found. Skipping...")

    # continuously get input from the user and query the embeddings
    while True:
        query = input("Query: ")
        query_embeddings(query, output_tokens=200)

# (chunksize * n) + (summarysize*n) + answersize
