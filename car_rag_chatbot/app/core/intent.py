# app/core/intent.py
import re
from app.core.filter import CarFilters

def extract_filters_from_query(query: str) -> CarFilters:
    filters = CarFilters()
    q = query.lower()

    # -------- price --------
    m = re.search(r'(under|below)\s+(\d+)', q)
    if m:
        filters.max_price = int(m.group(2)) * 1_000_000

    # -------- fuel --------
    if "petrol" in q:
        filters.fuel_type = "petrol"
    elif "diesel" in q:
        filters.fuel_type = "diesel"
    elif "hybrid" in q:
        filters.fuel_type = "hybrid"

    # -------- transmission --------
    if "automatic" in q:
        filters.transmission = "automatic"
    elif "manual" in q:
        filters.transmission = "manual"

    # -------- location --------
    loc = re.search(r'in\s+([a-z\s]+)', q)
    if loc:
        filters.location = loc.group(1).strip()

    # -------- year --------
    year = re.search(r'after\s+(\d{4})', q)
    if year:
        filters.min_year = int(year.group(1))

    return filters
