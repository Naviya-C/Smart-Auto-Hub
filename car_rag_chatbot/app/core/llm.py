import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from typing import List, Dict

from app.utils.logger import get_logger
from app.core.prompts import build_prompt

logger = get_logger(__name__) 

MODEL_NAME = "microsoft/phi-3-mini-4k-instruct" # 32K tokens

_tokenizer = None
_model = None

def load_llm():
    
    global _tokenizer
    global _model
    
    if _tokenizer is not None and  _model is not None:
        return
    
    try:
        logger.info(f"Loading slm model: {MODEL_NAME}")
        
        _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        _model = AutoModelForCausalLM.from_pretrained(
            MODEL_NAME,
            device_map = "auto"
        )
        _model.eval()
        
        logger.info("Model loaded successfully")
        
    except Exception as e:
        logger.error(f"Mode {MODEL_NAME} load failed")
        raise RuntimeError(f"Model loading failed {e}")
    


def generate_response(
    user_query: str,
    retrieved_cars: list[dict],
    max_tokens: int = 250
) -> str:
    """
    Generate a final response using the language model.
    """

    if not retrieved_cars:
        return "I couldn't find any cars matching your request."

    # Ensure model & tokenizer are loaded
    load_llm()

    # Build grounded prompt
    prompt = build_prompt(user_query, retrieved_cars)

    try:
        # Tokenize prompt
        inputs = _tokenizer(prompt, return_tensors="pt")
        inputs = inputs.to(_model.device)

        # Generate text (inference mode)
        with torch.no_grad():
            outputs = _model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=0.3,
                do_sample=False
            )

        # Decode output tokens to text
        response = _tokenizer.decode(
            outputs[0],
            skip_special_tokens=True
        )

        return response.strip()

    except RuntimeError as re:
        # GPU / memory issues
        if "out of memory" in str(re).lower():
            torch.cuda.empty_cache()
            return "The request was too large. Please try a shorter question."

        logger.exception("LLM runtime error")
        return "An error occurred while generating the response."

    except Exception as e:
        logger.exception("Unexpected LLM error")
        return "Something went wrong while generating the response."
