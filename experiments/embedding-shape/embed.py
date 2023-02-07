import json
import numpy as np
import matplotlib.pyplot as plt

# load in embedding data
embeddings = open("harry-potter-embeddings.json", "r").read()
embeddings = json.loads(embeddings)

# get average embedding overall
embeddings = np.array([el["embedding"] for el in embeddings])
avg_embedding = np.mean(embeddings, axis=0)

print("Embeddings shape:", embeddings.shape)
print("Average embedding shape:", avg_embedding.shape)


# creates nxn subplots of embeddings
def plot_embeddings_grid(embeddings, n, title=None):
    fig, axs = plt.subplots(n, n, figsize=(10, 10))
    for i in range(n):
        for j in range(n):
            axs[i, j].plot(embeddings[i * n + j])
    plt.gcf().text(0.5, 0.95, title, fontsize=20, ha="center")
    plt.show()


N = 3

plot_embeddings_grid(embeddings, n=N, title="Original Embeddings")

# graph average embedding
plt.plot(avg_embedding)
plt.title(f"Average Embedding of Harry Potter Text, {len(embeddings)} samples")
plt.tight_layout()
plt.show()

# subtract average embedding from each embedding
embeddings = embeddings - avg_embedding

# plot new embeddings
plot_embeddings_grid(embeddings, n=N, title="Original Embeddings - Average Embedding")
