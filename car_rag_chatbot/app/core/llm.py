import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

from app.utils.logger import get_logger

logger = get_logger(__name__) 

MODEL_NAME = "microsoft/phi-3-mini-4k-instruct"

