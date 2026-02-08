# app/core/filter.py
# app/core/filter.py
from dataclasses import dataclass
from typing import Optional

@dataclass
class CarFilters:
    max_price: Optional[int] = None
    min_price: Optional[int] = None
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    location: Optional[str] = None
    min_year: Optional[int] = None


def apply_filters(cars: list[dict], filters: CarFilters) -> list[dict]:
    results = []

    for car in cars:
        if filters.max_price is not None and car["price"] > filters.max_price:
            continue

        if filters.min_price is not None and car["price"] < filters.min_price:
            continue

        if filters.fuel_type and car["fuelType"].lower() != filters.fuel_type:
            continue

        if filters.transmission and car["transmission"].lower() != filters.transmission:
            continue

        if filters.location and filters.location not in car["location"].lower():
            continue

        if filters.min_year and car["year"] < filters.min_year:
            continue

        results.append(car)

    return results
