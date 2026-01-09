from fastapi import FastAPI
from pydantic import BaseModel
from database import reviews_collection

app = FastAPI()

# Definisikan bentuk JSON yang diterima
class ReviewModel(BaseModel):
    product_id: int
    review: str
    rating: int

@app.post("/review")
def create_review(review_data: ReviewModel): # <--- Pakai Model ini biar nerima JSON
    
    # Ubah ke dictionary
    data = review_data.dict()
    
    # Simpan ke MongoDB
    reviews_collection.insert_one(data)
    
    # Hapus _id dari response karena ObjectId gak bisa di-print langsung sbg JSON
    if "_id" in data:
        del data["_id"]

    return {
        "success": True,
        "message": "Review created successfully",
        "data": data
    }

@app.get("/reviews/{product_id}")
def get_reviews_by_product(product_id: int):
    # Cari review berdasarkan product_id, hide _id object mongo
    reviews = list(reviews_collection.find({"product_id": product_id}, {"_id": 0}))
    return {
        "success": True,
        "data": reviews
    }
    

@app.get("/reviews")
def get_reviews():
    reviews = list(reviews_collection.find({}, {"_id": 0}))
    return {
        "success": True,
        "data": reviews
    }
