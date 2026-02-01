from typing import List, Dict

def build_prompt(user_query: str, retrieved_cars: List[Dict]) -> str:
    """
    Build a grounded prompt for the language model.
    The model must answer ONLY using the provided context.
    """

    if not retrieved_cars: 
        return (
            "You are a helpful car sales assistant.\n\n"
            "There is no available data to answer the user's question.\n\n"
            f"User question:\n{user_query}\n\n"
            "Answer:"
        )

    context_lines = []

    for idx, car in enumerate(retrieved_cars, start=1):
        context_lines.append(
            f"{idx}. {car['brand']} {car['model']} ({car['year']})\n"
            f"   Price: {car['price'] / 1_000_000:.1f}M LKR\n"
            f"   Location: {car['location']}\n"
            f"   Reason: {car['match_reason']}"
        )

    context = "\n".join(context_lines)

    prompt = f"""
You are a helpful car sales assistant.
You must answer ONLY using the information provided below.
If the answer is not in the context, say you don't have enough information.

Context:
{context}

User question:
{user_query}

Answer clearly and concisely:
""".strip()

    return prompt
