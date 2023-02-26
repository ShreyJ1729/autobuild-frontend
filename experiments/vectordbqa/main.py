import os
import dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI, VectorDBQA

dotenv.load_dotenv("../../.env")
# print(os.environ.get("OPENAI_API_KEY"))


def load_text(filename) -> str:
    print("Loading data...")
    return open(f"../data/{filename}").read()


def build_index(file_text, save_path) -> FAISS:
    print("Splitting text...")
    text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=0)
    texts = text_splitter.split_text(file_text)

    print(len(texts), "chunks of text")

    print("Building index...")
    docsearch = FAISS.from_texts(texts, OpenAIEmbeddings())

    print("Saving index...")
    docsearch.save_local(save_path)


def load_index(save_path) -> FAISS:
    print("Loading index...")
    docsearch = FAISS.from_texts(["placeholder"], OpenAIEmbeddings())
    docsearch.load_local(save_path)
    return docsearch


# make a function to build or load index based on whether it exists
def build_or_load_index(file_text, save_path) -> FAISS:
    if os.path.exists(save_path):
        return load_index(save_path)
    else:
        return build_index(file_text, save_path)


if __name__ == "__main__":
    filename = "attention-paper.txt"
    save_path = filename.split(".")[0]

    file_text = load_text(filename)
    docsearch = build_or_load_index(file_text, save_path)

    print("Building QA system...")
    qa = VectorDBQA.from_chain_type(
        llm=OpenAI(), chain_type="stuff", vectorstore=docsearch
    )

    print(f"Ready to answer questions about {filename}! (Ctrl+C to exit)")
    # print("Example Query: Summarize the document.")
    # print(qa.run("Summarize the document."))

    while True:
        query = input("Query: ")
        print("Answer:", qa.run(query))
