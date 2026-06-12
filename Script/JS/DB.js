const DB = {
    "account": {
        "1": {
            "first_name": "Admin",
            "last_name": "Admin",
            "email": "admin123@gmail.com",
            "phone": "01234567890",
            "passcode": "Admin123#",
            "isAdmin": 1,
            "date_created": "2026-06-12"
        },
        "2": {
            "first_name": "Client",
            "last_name": "Client",
            "email": "client123@gmail.com",
            "phone": "09876543210",
            "passcode": "Client123#",
            "isAdmin": 0,
            "date_created": "2026-06-12"
        }
    },
    "address": {
        "1": {
            "user_id": "2",
            "label": "Home",
            "location": "somewhere on earth",
            "detail": "nothing",
            "zip": 12345
        }
    },
    "admindata": [
        {
            "type": "category",
            "data": "chair,sofa,bathtub,tvset,cupboard,lamp,mirror,room,swing,table,toilet"
        },
        {
            "type": "subcat",
            "data": "old,modern,comfy,2people,solo,fire"
        }
    ],
    "bill": {
        "9": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "bank",
            "date_created": "2025-04-04 01:48:01",
            "recieved": 0,
            "user_del": 1
        },
        "10": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "Cash",
            "date_created": "2025-04-10 23:47:30",
            "recieved": 0,
            "user_del": 1
        },
        "11": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "bank",
            "date_created": "2025-04-10 23:50:59",
            "recieved": 1,
            "user_del": 0
        },
        "12": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "cash",
            "date_created": "2025-04-10 23:51:06",
            "recieved": 1,
            "user_del": 0
        },
        "14": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": "5",
            "payment_method": "bank",
            "date_created": "2025-04-10 23:52:21",
            "recieved": 0,
            "user_del": 0
        },
        "15": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "cash",
            "date_created": "2025-04-10 23:53:25",
            "recieved": 0,
            "user_del": 0
        },
        "16": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "bank",
            "date_created": "2025-04-10 23:54:09",
            "recieved": 0,
            "user_del": 0
        },
        "17": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": null,
            "payment_method": "bank",
            "date_created": "2025-04-10 23:54:33",
            "recieved": 0,
            "user_del": 0
        },
        "18": {
            "user_id": "2",
            "address_id": "1",
            "coupon_id": "8",
            "payment_method": "cash",
            "date_created": "2025-04-24 23:02:05",
            "recieved": 0,
            "user_del": 0
        }
    },
    "bill_item": [
        {
            "bill_id": "9",
            "item_id": "34",
            "color": "#9370DB",
            "quantity": 5,
            "price": 1499
        },
        {
            "bill_id": "9",
            "item_id": "34",
            "color": "#DAA520",
            "quantity": 2,
            "price": 1499
        },
        {
            "bill_id": "9",
            "item_id": "39",
            "color": "#000000",
            "quantity": 4,
            "price": 45
        },
        {
            "bill_id": "9",
            "item_id": "33",
            "color": "#A0522D",
            "quantity": 2,
            "price": 599
        },
        {
            "bill_id": "10",
            "item_id": "11",
            "color": "Beige",
            "quantity": 1,
            "price": 2800
        },
        {
            "bill_id": "10",
            "item_id": "9",
            "color": "Gold",
            "quantity": 5,
            "price": 3500
        },
        {
            "bill_id": "10",
            "item_id": "10",
            "color": "#C0C0C0",
            "quantity": 4,
            "price": 2200
        },
        {
            "bill_id": "11",
            "item_id": "11",
            "color": "Beige",
            "quantity": 1,
            "price": 2800
        },
        {
            "bill_id": "11",
            "item_id": "9",
            "color": "Gold",
            "quantity": 5,
            "price": 3500
        },
        {
            "bill_id": "11",
            "item_id": "10",
            "color": "#C0C0C0",
            "quantity": 4,
            "price": 2200
        },
        {
            "bill_id": "12",
            "item_id": "11",
            "color": "Beige",
            "quantity": 1,
            "price": 2800
        },
        {
            "bill_id": "12",
            "item_id": "9",
            "color": "Gold",
            "quantity": 5,
            "price": 3500
        },
        {
            "bill_id": "12",
            "item_id": "10",
            "color": "#C0C0C0",
            "quantity": 4,
            "price": 2200
        },
        {
            "bill_id": "14",
            "item_id": "11",
            "color": "Beige",
            "quantity": 1,
            "price": 2800
        },
        {
            "bill_id": "14",
            "item_id": "9",
            "color": "Gold",
            "quantity": 5,
            "price": 3500
        },
        {
            "bill_id": "14",
            "item_id": "10",
            "color": "#C0C0C0",
            "quantity": 4,
            "price": 2200
        },
        {
            "bill_id": "15",
            "item_id": "11",
            "color": "Beige",
            "quantity": 1,
            "price": 2800
        },
        {
            "bill_id": "15",
            "item_id": "9",
            "color": "Gold",
            "quantity": 5,
            "price": 3500
        },
        {
            "bill_id": "15",
            "item_id": "10",
            "color": "#C0C0C0",
            "quantity": 4,
            "price": 2200
        },
        {
            "bill_id": "16",
            "item_id": "7",
            "color": "#D3B683",
            "quantity": 7,
            "price": 1850
        },
        {
            "bill_id": "17",
            "item_id": "6",
            "color": "Gold",
            "quantity": 2,
            "price": 1350
        },
        {
            "bill_id": "18",
            "item_id": "3",
            "color": "#FFFDD0",
            "quantity": 3,
            "price": 623
        }
    ],
    "contact": [
        {
            "user_id": "2",
            "user_name": "Client Client",
            "email": "client123@gmail.com",
            "phone": "09876543210",
            "message": "i purchased a wrong item and cancled the order when will i get the refund"
        }
    ],
    "coupon": {
        "5": {
            "name": "Last",
            "value": "123123123",
            "discount": 50,
            "end_num": null,
            "end_date": "2025-04-05",
            "done": 1
        },
        "6": {
            "name": "BestH",
            "value": "BBBHHH",
            "discount": 30,
            "end_num": null,
            "end_date": "2027-05-01",
            "done": 0
        },
        "7": {
            "name": "Flexible",
            "value": "Acrobat",
            "discount": 40,
            "end_num": null,
            "end_date": "2025-05-02",
            "done": 0
        },
        "8": {
            "name": "Halp",
            "value": "HalfPrice",
            "discount": 50,
            "end_num": null,
            "end_date": "2025-05-03",
            "done": 0
        },
        "9": {
            "name": "Amaze",
            "value": "Wow",
            "discount": 60,
            "end_num": null,
            "end_date": "2025-05-04",
            "done": 0
        },
        "10": {
            "name": "Celebrate",
            "value": "OMG",
            "discount": 70,
            "end_num": null,
            "end_date": "2025-05-05",
            "done": 0
        },
        "11": {
            "name": "Fire",
            "value": "FIREEEE",
            "discount": 80,
            "end_num": null,
            "end_date": "2025-05-06",
            "done": 0
        },
        "14": {
            "name": "Hoten",
            "value": "NAREN",
            "discount": 100,
            "end_num": 3,
            "end_date": null,
            "done": 0
        }
    },
    "favorite": {
        "2": [
            "5",
            "27",
            "24",
            "4",
            "19",
            "31",
            "7",
            "15",
            "30",
            "12",
            "38",
            "39",
            "21",
            "2",
            "6"
        ]
    },
    "item": {
        "1": {
            "name": "The Haven Seat",
            "price": 1300,
            "review_n": 150,
            "review_v": 4,
            "detail": "Indulge in ultimate comfort and style with the Cloudseap Lounge Chair, designed to transoform your living space into a personal treat. Whether your're curling up with a good book, enjoing a cup of coffee, or simply unwinding after a long day, this lounge chair is your perfect companion.",
            "colors": "rgb(113, 109, 65)&rgb(26, 56, 15)",
            "dimension": "32 x 34 x 31",
            "w": 32,
            "h": 34,
            "d": 31,
            "weight": 300,
            "material": "Solid harwood frame,premium fabric upholstery,high-resillence foam",
            "category": "chair",
            "subcat": "solo,fire,old,comfy",
            "instock": 1,
            "discount": 1,
            "discount_v": 50,
            "new": 1,
            "num_sold": 0
        },
        "2": {
            "name": "Luxurious Antique Armchair",
            "price": 1200,
            "review_n": 25,
            "review_v": 5,
            "detail": "This exquisite armchair features a beautifully carved wooden frame with intricate detailing and plush, tufted upholstery. Perfect for adding a touch of elegance to any room.",
            "colors": "Beige&Gold",
            "dimension": "30,35,45",
            "w": 30,
            "h": 35,
            "d": 45,
            "weight": 50,
            "material": "Wood&Foam&Leather",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 1,
            "num_sold": 0
        },
        "3": {
            "name": "Mushroom Luxe Lounge Chair",
            "price": 890,
            "review_n": 32,
            "review_v": 3,
            "detail": "A stunning, nature-inspired lounge chair shaped like a giant mushroom. Combining comfort and artistry, it\u2019s a statement piece for any unique living space.",
            "colors": "#FFFDD0&#A0522D&#228B22",
            "dimension": "40,40,45",
            "w": 40,
            "h": 40,
            "d": 45,
            "weight": 65,
            "material": "Sculpted Resin&Foam&Velvet Upholstery",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 1,
            "discount_v": 30,
            "new": 0,
            "num_sold": 0
        },
        "4": {
            "name": "Royal Gold Tufted Armchair",
            "price": 1500,
            "review_n": 47,
            "review_v": 2,
            "detail": "An opulent armchair featuring a gilded frame with intricate carvings and luxurious tufted upholstery. Perfect for adding a royal touch to your interior.",
            "colors": "Gold",
            "dimension": "35,38,42",
            "w": 35,
            "h": 38,
            "d": 42,
            "weight": 58,
            "material": "Gold-Plated Wood&Premium Foam&Velvet Upholstery",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "5": {
            "name": "Nature's Vein Luxury Chair",
            "price": 1250,
            "review_n": 18,
            "review_v": 1,
            "detail": "A masterfully crafted chair inspired by the elegance of nature. Its leaf-shaped design and golden root-like legs add an organic yet luxurious charm to any space.",
            "colors": "#F5F5DC&Gold",
            "dimension": "32,36,40",
            "w": 32,
            "h": 36,
            "d": 40,
            "weight": 45,
            "material": "Golden-Plated Metal&High-Density Foam&Linen Upholstery",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "6": {
            "name": "Golden Honeycomb Lounge Chair",
            "price": 1350,
            "review_n": 42,
            "review_v": 2,
            "detail": "A stylish and comfortable lounge chair featuring a unique honeycomb-patterned backrest in elegant shades of brown and gold. Perfect for adding a touch of artistic luxury to any space.",
            "colors": "Brown&Gold&Black",
            "dimension": "36,30,50",
            "w": 36,
            "h": 30,
            "d": 50,
            "weight": 60,
            "material": "Metal Frame&Premium Foam&Velvet Upholstery&Decorative Cushion",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "7": {
            "name": "Soaring Elegance Wingback Chair",
            "price": 1850,
            "review_n": 20,
            "review_v": 3,
            "detail": "An exquisite wingback chair inspired by the grace of a bird in flight, featuring intricately carved wooden wings and luxurious upholstery. A perfect blend of art and comfort for discerning interiors.",
            "colors": "#D3B683",
            "dimension": "38,40,55",
            "w": 38,
            "h": 40,
            "d": 55,
            "weight": 72,
            "material": "Solid Wood&High-Quality Foam&Linen Upholstery",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "8": {
            "name": "Vintage Curved-Back Sofa",
            "price": 2100,
            "review_n": 38,
            "review_v": 3,
            "detail": "A statement sofa with a plush curved-back design and intricate patterned upholstery. Accentuated by luxurious decorative pillows, this piece adds elegance to any classic interior.",
            "colors": "#FFFDD0&#9C9B7A&#D4AF37",
            "dimension": "85,38,40",
            "w": 85,
            "h": 38,
            "d": 40,
            "weight": 110,
            "material": "Wooden Frame&Premium Foam&Textured Fabric",
            "category": "sofa",
            "subcat": "",
            "instock": 0,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "9": {
            "name": "Opulent Tufted Gold Sofa",
            "price": 3500,
            "review_n": 62,
            "review_v": 4,
            "detail": "A masterpiece of luxury, this tufted gold sofa features intricate carvings and plush white upholstery. Accompanied by finely detailed decorative pillows, it exudes timeless elegance.",
            "colors": "Gold",
            "dimension": "90,40,45",
            "w": 90,
            "h": 40,
            "d": 45,
            "weight": 150,
            "material": "Gold-Finished Wood&High-Density Foam&Silk Blend Upholstery",
            "category": "sofa",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "10": {
            "name": "Blush Velvet Scalloped Sofa",
            "price": 2200,
            "review_n": 45,
            "review_v": 5,
            "detail": "This luxurious scalloped-back sofa in blush pink adds a touch of elegance to any living space. Complete with tufted upholstery and decorative round pillows for ultimate comfort and style.",
            "colors": "#F2C2C2&#C0C0C0&#A9A9A9",
            "dimension": "88,36,40",
            "w": 88,
            "h": 36,
            "d": 40,
            "weight": 120,
            "material": "Velvet Upholstery&Solid Wood Frame&High-Density Foam",
            "category": "sofa",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "11": {
            "name": "Velvet Scalloped Harmony Sofa",
            "price": 2800,
            "review_n": 68,
            "review_v": 5,
            "detail": "A stunning scalloped-back sofa upholstered in soft beige velvet. Its elegant design and cozy cushions make it a centerpiece of refined sophistication for any space.",
            "colors": "Beige",
            "dimension": "84,35,40",
            "w": 84,
            "h": 35,
            "d": 40,
            "weight": 110,
            "material": "Wood Frame&High-Density Foam&Velvet Upholstery",
            "category": "sofa",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "12": {
            "name": "Banana Bathtub",
            "price": 899,
            "review_n": 42,
            "review_v": 4,
            "detail": "A whimsical and unique bathtub shaped like a banana, perfect for adding a playful touch to your bathroom. Made from high-quality materials for durability and comfort.",
            "colors": "#FFFF00",
            "dimension": "72,36,28",
            "w": 72,
            "h": 36,
            "d": 28,
            "weight": 350,
            "material": "Fiberglass&Resin",
            "category": "bathtub",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "13": {
            "name": "Circular Bookcase Chair",
            "price": 499,
            "review_n": 18,
            "review_v": 5,
            "detail": "A unique circular chair with integrated bookshelves, perfect for book lovers and adding a statement piece to any room. Comfortable seating surrounded by your favorite reads.",
            "colors": "#E8E8E8&#FFD700",
            "dimension": "36,36,30",
            "w": 36,
            "h": 36,
            "d": 30,
            "weight": 250,
            "material": "Wood&Fabric&Metal",
            "category": "chair",
            "subcat": "",
            "instock": 0,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "14": {
            "name": "Deconstructed Gray Wingback Chair",
            "price": 699,
            "review_n": 35,
            "review_v": 4,
            "detail": "A modern take on the classic wingback chair, this piece is deconstructed to showcase its internal structure and materials. Combines comfort and contemporary design with a unique aesthetic.",
            "colors": "#808080&#FFFFFF&#F5F5DC&#008000",
            "dimension": "30,35,42",
            "w": 30,
            "h": 35,
            "d": 42,
            "weight": 300,
            "material": "Fabric&Foam&Wood&Webbing",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "15": {
            "name": "Organic Cocoon Chair",
            "price": 799,
            "review_n": 25,
            "review_v": 5,
            "detail": "A unique and sculptural cocoon chair inspired by nature, crafted from organic-looking materials. Provides a cozy and stylish seating option, perfect for relaxation and adding an artistic touch to your space.",
            "colors": "#C2B280&#8FBC8F",
            "dimension": "40,38,45",
            "w": 40,
            "h": 38,
            "d": 45,
            "weight": 280,
            "material": "Resin&Fabric",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "16": {
            "name": "Ethereal Leaf Chair",
            "price": 999,
            "review_n": 15,
            "review_v": 5,
            "detail": "An exquisite chair inspired by nature, featuring delicate leaf-like details crafted with a translucent material. The organic base and soft cushion provide a unique and comfortable seating experience.",
            "colors": "#FFFFFF&#D2B48C&#C0C0C0",
            "dimension": "34,32,40",
            "w": 34,
            "h": 32,
            "d": 40,
            "weight": 220,
            "material": "Resin&Fabric&Wood Composite",
            "category": "chair",
            "subcat": "",
            "instock": 0,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "17": {
            "name": "Liquid Metal & Wood Chair",
            "price": 1299,
            "review_n": 10,
            "review_v": 5,
            "detail": "A stunning chair that blends the organic warmth of wood with the sleek, modern aesthetic of liquid metal. This piece is a true statement of contemporary design, offering both comfort and visual appeal.",
            "colors": "#D2B48C&#C0C0C0",
            "dimension": "36,34,38",
            "w": 36,
            "h": 34,
            "d": 38,
            "weight": 250,
            "material": "Wood&Metal&Fabric",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "18": {
            "name": "Super Modern Oak Chair",
            "price": 549,
            "review_n": 22,
            "review_v": 4,
            "detail": "A super modern chair crafted from solid oak, featuring a minimalist design with clean lines and geometric shapes. This chair adds a contemporary and artistic touch to any space.",
            "colors": "#D2B48C",
            "dimension": "28,28,30",
            "w": 28,
            "h": 28,
            "d": 30,
            "weight": 200,
            "material": "Oak Wood",
            "category": "chair",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "19": {
            "name": "Parametric Wavy TV Unit",
            "price": 1499,
            "review_n": 28,
            "review_v": 5,
            "detail": "A stunning parametric TV unit with a unique wavy design, crafted from high-quality wood. This piece adds a contemporary and artistic touch to your living space, combining functionality and sculptural beauty.",
            "colors": "#D2B48C",
            "dimension": "72,18,60",
            "w": 72,
            "h": 18,
            "d": 60,
            "weight": 150,
            "material": "Wood",
            "category": "tvset",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "20": {
            "name": "Stack of Books End Table",
            "price": 249,
            "review_n": 55,
            "review_v": 4,
            "detail": "A charming end table designed to look like a stack of vintage books, complete with a hidden drawer for storage. Perfect for book lovers and adding a touch of literary whimsy to your decor.",
            "colors": "#8B4513&#A52A2A&#2E8B57&#D2B48C",
            "dimension": "18,12,24",
            "w": 18,
            "h": 12,
            "d": 24,
            "weight": 30,
            "material": "Wood&Paper Laminate&Metal",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "21": {
            "name": "Wooden Cabinet with Drawers and Shelves",
            "price": 799,
            "review_n": 32,
            "review_v": 4,
            "detail": "A classic wooden cabinet featuring multiple drawers and shelves, providing ample storage space. Its timeless design and sturdy construction make it a versatile addition to any room.",
            "colors": "#8B4513&#A0522D",
            "dimension": "48,16,72",
            "w": 48,
            "h": 16,
            "d": 72,
            "weight": 100,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "22": {
            "name": "DNA Whole Twist Shelf",
            "price": 699,
            "review_n": 18,
            "review_v": 5,
            "detail": "A unique and sculptural shelf inspired by the DNA double helix, designed by Tom Schneider. This piece adds a contemporary and artistic touch to your home, offering both functionality and visual appeal.",
            "colors": "#A0522D",
            "dimension": "24,12,60",
            "w": 24,
            "h": 12,
            "d": 60,
            "weight": 40,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "23": {
            "name": "Squiggle Wooden Chest of Drawers",
            "price": 499,
            "review_n": 38,
            "review_v": 4,
            "detail": "A unique and whimsical chest of drawers with a squiggle design, crafted from high-quality wood. This piece adds a playful and artistic touch to your home, offering both functionality and visual appeal.",
            "colors": "#A0522D",
            "dimension": "24,16,40",
            "w": 24,
            "h": 16,
            "d": 40,
            "weight": 50,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "24": {
            "name": "Tree Branch Bookshelf",
            "price": 899,
            "review_n": 42,
            "review_v": 5,
            "detail": "A unique and artistic bookshelf shaped like a tree branch, crafted from high-quality wood. This piece adds a natural and whimsical touch to your home, offering both functionality and visual appeal.",
            "colors": "#A0522D",
            "dimension": "48,12,72",
            "w": 48,
            "h": 12,
            "d": 72,
            "weight": 60,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "25": {
            "name": "Organic Wave Bookshelf",
            "price": 799,
            "review_n": 35,
            "review_v": 5,
            "detail": "A sculptural bookshelf with organic wave-like shelves, crafted from richly toned wood. This piece adds a unique and artistic touch to your home, offering both functionality and visual appeal.",
            "colors": "#8B4513",
            "dimension": "40,12,60",
            "w": 40,
            "h": 12,
            "d": 60,
            "weight": 55,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "26": {
            "name": "Grand Tree Trunk Bookshelf",
            "price": 1999,
            "review_n": 22,
            "review_v": 5,
            "detail": "A grand and majestic bookshelf crafted from a large tree trunk, featuring integrated shelves to display your book collection. This piece is a true statement of natural artistry, combining functionality and sculptural beauty.",
            "colors": "#A0522D&#8B4513",
            "dimension": "72,24,96",
            "w": 72,
            "h": 24,
            "d": 96,
            "weight": 200,
            "material": "Wood",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "27": {
            "name": "Tom Rossau TR7 Floor Lamp Replica",
            "price": 599,
            "review_n": 15,
            "review_v": 4,
            "detail": "A stunning floor lamp inspired by the iconic Tom Rossau TR7 design, featuring a sculptural silhouette with a wide, flared shade. This piece adds a touch of elegance and sophistication to any interior.",
            "colors": "#F5F5F5&#D2B48C",
            "dimension": "20,20,70",
            "w": 20,
            "h": 20,
            "d": 70,
            "weight": 25,
            "material": "Wood Veneer&Paper&Metal",
            "category": "lamp",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "28": {
            "name": "Liquid Metal Mirror",
            "price": 899,
            "review_n": 22,
            "review_v": 5,
            "detail": "A stunning mirror featuring a frame that mimics the look of molten metal, blending organic textures with a modern aesthetic. This piece adds a touch of artistic flair and sophistication to any space.",
            "colors": "#C0C0C0&#A9A9A9",
            "dimension": "36,10,8",
            "w": 36,
            "h": 10,
            "d": 8,
            "weight": 30,
            "material": "Metal&Glass",
            "category": "mirror",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "29": {
            "name": "Tomrain Nightstand with LED Strip Lights and Charging Station",
            "price": 299,
            "review_n": 45,
            "review_v": 4,
            "detail": "A modern nightstand with a floating design, featuring built-in LED strip lights and a charging station. This piece adds a touch of contemporary elegance and functionality to your bedroom.",
            "colors": "#F5F5DC",
            "dimension": "20,16,22",
            "w": 20,
            "h": 16,
            "d": 22,
            "weight": 25,
            "material": "Wood&MDF&LED&Metal",
            "category": "cupboard",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "30": {
            "name": "Luxury Living Room Set",
            "price": 4999,
            "review_n": 12,
            "review_v": 5,
            "detail": "A luxurious living room set featuring plush sofas, elegant coffee tables, and stylish accent pieces. This collection creates a sophisticated and inviting atmosphere for your home.",
            "colors": "#F5F5F5&#D2B48C&#A9A9A9",
            "dimension": "35,38,42",
            "w": 35,
            "h": 38,
            "d": 42,
            "weight": 50,
            "material": "Fabric&Wood&Stone&Metal",
            "category": "room",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "31": {
            "name": "Butterfly Wing Hanging Swing Chair",
            "price": 1299,
            "review_n": 28,
            "review_v": 5,
            "detail": "A whimsical hanging swing chair featuring butterfly wing-shaped backrests, crafted with intricate details and plush cushions. This piece adds a touch of fantasy and elegance to your outdoor or indoor space.",
            "colors": "#FFB6C1&#FFFFFF&#DAA520",
            "dimension": "48,36,60",
            "w": 48,
            "h": 36,
            "d": 60,
            "weight": 250,
            "material": "Metal&Fabric&Resin",
            "category": "swing",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "32": {
            "name": "Cloud Cushion Hanging Swing",
            "price": 699,
            "review_n": 32,
            "review_v": 5,
            "detail": "A dreamy hanging swing featuring plush cloud-like cushions in soft pink and white hues. This piece adds a whimsical and cozy touch to any indoor space, creating a perfect spot for relaxation.",
            "colors": "#FFFFFF&#FFB6C1",
            "dimension": "36,36,48",
            "w": 36,
            "h": 36,
            "d": 48,
            "weight": 200,
            "material": "Fabric&Cotton&Rope",
            "category": "swing",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "33": {
            "name": "Slatted Wooden Coffee Table",
            "price": 599,
            "review_n": 25,
            "review_v": 4,
            "detail": "A unique coffee table constructed from interconnected wooden slats, creating a visually striking and textural piece. This table adds a touch of organic modernism to your living space.",
            "colors": "#A0522D",
            "dimension": "48,24,16",
            "w": 48,
            "h": 24,
            "d": 16,
            "weight": 40,
            "material": "Wood",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "34": {
            "name": "Butterfly Wing Coffee Table",
            "price": 1499,
            "review_n": 18,
            "review_v": 5,
            "detail": "A stunning coffee table inspired by butterfly wings, crafted from translucent materials with intricate details. This piece adds a touch of artistic elegance and whimsy to your living space.",
            "colors": "#9370DB&#C0C0C0&#DAA520",
            "dimension": "40,30,18",
            "w": 40,
            "h": 30,
            "d": 18,
            "weight": 50,
            "material": "Resin&Glass&Metal",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "35": {
            "name": "Round Wood Dining Table with Pedestal Base",
            "price": 999,
            "review_n": 30,
            "review_v": 4,
            "detail": "A classic round dining table crafted from rich wood, featuring a sturdy pedestal base. This piece adds warmth and elegance to your dining space, perfect for family meals and gatherings.",
            "colors": "#A0522D&#F5F5F5",
            "dimension": "60,60,30",
            "w": 60,
            "h": 60,
            "d": 30,
            "weight": 80,
            "material": "Wood",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "36": {
            "name": "Modern Round Coffee Table",
            "price": 349,
            "review_n": 48,
            "review_v": 4,
            "detail": "A modern round coffee table with a sleek white top and geometric wooden base. This piece adds a contemporary touch to your living room, perfect for casual gatherings and everyday use.",
            "colors": "#FFFFFF&#D2B48C",
            "dimension": "36,36,18",
            "w": 36,
            "h": 36,
            "d": 18,
            "weight": 30,
            "material": "Wood&MDF",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "37": {
            "name": "Islamic Calligraphy Coffee Table",
            "price": 1199,
            "review_n": 15,
            "review_v": 3,
            "detail": "A unique coffee table featuring intricate Islamic calligraphy designs on a sculptural metal base, topped with a sleek white surface. This piece adds a touch of cultural elegance and artistry to your living space.",
            "colors": "#FFFFFF&#D3D3D3",
            "dimension": "42,20,18",
            "w": 42,
            "h": 20,
            "d": 18,
            "weight": 45,
            "material": "Metal&MDF",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "38": {
            "name": "Organic Wood Coffee Table",
            "price": 799,
            "review_n": 28,
            "review_v": 5,
            "detail": "A small, organic-shaped coffee table crafted from natural wood, featuring a unique and sculptural design. This piece adds a touch of rustic elegance and warmth to your living space.",
            "colors": "#D2B48C",
            "dimension": "36,24,16",
            "w": 36,
            "h": 24,
            "d": 16,
            "weight": 35,
            "material": "Wood",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "39": {
            "name": "Tree Trunk Dining Table Set",
            "price": 45,
            "review_n": 10,
            "review_v": 5,
            "detail": "A grand dining table set crafted from a single tree trunk, featuring a unique and sculptural design with matching chairs. This piece is a true statement of natural artistry, perfect for creating a memorable dining experience.",
            "colors": "#A0522D&#000000",
            "dimension": "96,48,30",
            "w": 96,
            "h": 48,
            "d": 30,
            "weight": 250,
            "material": "Wood&Fabric",
            "category": "table",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        },
        "40": {
            "name": "Sea Turtle Toilet Paper Holder",
            "price": 25,
            "review_n": 62,
            "review_v": 1,
            "detail": "A whimsical and unique toilet paper holder shaped like a sea turtle, adding a fun and nautical touch to your bathroom decor. Made from durable resin with hand-painted details.",
            "colors": "#008080&#FFFFFF",
            "dimension": "7,5,3",
            "w": 7,
            "h": 5,
            "d": 3,
            "weight": 1,
            "material": "Resin",
            "category": "toilet",
            "subcat": "",
            "instock": 1,
            "discount": 0,
            "discount_v": 0,
            "new": 0,
            "num_sold": 0
        }
    },
    "item_img": [
        {
            "item_id": "1",
            "url": "..\/Images\/chair-normal.jpg"
        },
        {
            "item_id": "1",
            "url": "..\/Images\/chair-normal.jpg"
        },
        {
            "item_id": "1",
            "url": "..\/Images\/chair-normal.jpg"
        },
        {
            "item_id": "1",
            "url": "..\/Images\/chair-normal.jpg"
        },
        {
            "item_id": "1",
            "url": "..\/Images\/chair-normal.jpg"
        },
        {
            "item_id": "2",
            "url": "..\/Images\/chair-curl.jpg"
        },
        {
            "item_id": "2",
            "url": "..\/Images\/chair-curl.jpg"
        },
        {
            "item_id": "2",
            "url": "..\/Images\/chair-curl.jpg"
        },
        {
            "item_id": "3",
            "url": "..\/Images\/chair-popcorn.png"
        },
        {
            "item_id": "4",
            "url": "..\/Images\/chair-2.jpg"
        },
        {
            "item_id": "5",
            "url": "..\/Images\/chair-leaf.jpg"
        },
        {
            "item_id": "5",
            "url": "..\/Images\/chair-leaf.jpg"
        },
        {
            "item_id": "5",
            "url": "..\/Images\/chair-leaf.jpg"
        },
        {
            "item_id": "5",
            "url": "..\/Images\/chair-leaf.jpg"
        },
        {
            "item_id": "5",
            "url": "..\/Images\/chair-leaf.jpg"
        },
        {
            "item_id": "6",
            "url": "..\/Images\/chair-lizard.jpg"
        },
        {
            "item_id": "6",
            "url": "..\/Images\/chair-lizard.jpg"
        },
        {
            "item_id": "6",
            "url": "..\/Images\/chair-lizard.jpg"
        },
        {
            "item_id": "6",
            "url": "..\/Images\/chair-lizard.jpg"
        },
        {
            "item_id": "6",
            "url": "..\/Images\/chair-lizard.jpg"
        },
        {
            "item_id": "7",
            "url": "..\/Images\/chair-wing.jpg"
        },
        {
            "item_id": "7",
            "url": "..\/Images\/chair-wing.jpg"
        },
        {
            "item_id": "7",
            "url": "..\/Images\/chair-wing.jpg"
        },
        {
            "item_id": "7",
            "url": "..\/Images\/chair-wing.jpg"
        },
        {
            "item_id": "7",
            "url": "..\/Images\/chair-wing.jpg"
        },
        {
            "item_id": "8",
            "url": "..\/Images\/sofa-blue.jpg"
        },
        {
            "item_id": "8",
            "url": "..\/Images\/sofa-blue.jpg"
        },
        {
            "item_id": "8",
            "url": "..\/Images\/sofa-blue.jpg"
        },
        {
            "item_id": "8",
            "url": "..\/Images\/sofa-blue.jpg"
        },
        {
            "item_id": "9",
            "url": "..\/Images\/sofa-long.jpg"
        },
        {
            "item_id": "9",
            "url": "..\/Images\/sofa-gold.jpg"
        },
        {
            "item_id": "9",
            "url": "..\/Images\/sofa-gold.jpg"
        },
        {
            "item_id": "9",
            "url": "..\/Images\/sofa-gold.jpg"
        },
        {
            "item_id": "9",
            "url": "..\/Images\/sofa-gold.jpg"
        },
        {
            "item_id": "10",
            "url": "..\/Images\/sofa-red.jpg"
        },
        {
            "item_id": "10",
            "url": "..\/Images\/sofa-red.jpg"
        },
        {
            "item_id": "10",
            "url": "..\/Images\/sofa-red.jpg"
        },
        {
            "item_id": "10",
            "url": "..\/Images\/sofa-red.jpg"
        },
        {
            "item_id": "11",
            "url": "..\/Images\/sofa-yellow.jpg"
        },
        {
            "item_id": "11",
            "url": "..\/Images\/sofa-yellow.jpg"
        },
        {
            "item_id": "11",
            "url": "..\/Images\/sofa-yellow.jpg"
        },
        {
            "item_id": "12",
            "url": "..\/Images\/bathtub-banana.jpg"
        },
        {
            "item_id": "13",
            "url": "..\/Images\/chair-books.jpg"
        },
        {
            "item_id": "14",
            "url": "..\/Images\/chair-grey-sofa.jpg"
        },
        {
            "item_id": "14",
            "url": "..\/Images\/chair-grey-sofa2.jpg"
        },
        {
            "item_id": "14",
            "url": "..\/Images\/chair-grey-sofa3.jpg"
        },
        {
            "item_id": "14",
            "url": "..\/Images\/chair-grey-sofa4.jpg"
        },
        {
            "item_id": "14",
            "url": "..\/Images\/chair-grey-sofa5.jpg"
        },
        {
            "item_id": "15",
            "url": "..\/Images\/chair-caccon.jpg"
        },
        {
            "item_id": "16",
            "url": "..\/Images\/chair-leaf-white.jpg"
        },
        {
            "item_id": "17",
            "url": "..\/Images\/chair-liquid.jpg"
        },
        {
            "item_id": "18",
            "url": "..\/Images\/chair-super-modern.jpg"
        },
        {
            "item_id": "19",
            "url": "..\/Images\/cubboard-big-eaten.jpg"
        },
        {
            "item_id": "20",
            "url": "..\/Images\/cubboard-book.jpg"
        },
        {
            "item_id": "21",
            "url": "..\/Images\/cubboard-eaten.jpg"
        },
        {
            "item_id": "22",
            "url": "..\/Images\/cubboard-round.jpg"
        },
        {
            "item_id": "23",
            "url": "..\/Images\/cubboard-squigle.jpg"
        },
        {
            "item_id": "24",
            "url": "..\/Images\/cubboard-tree.jpg"
        },
        {
            "item_id": "25",
            "url": "..\/Images\/cubboard-zig-zag.jpg"
        },
        {
            "item_id": "26",
            "url": "..\/Images\/cubboard-tree-big.jpg"
        },
        {
            "item_id": "27",
            "url": "..\/Images\/lamp-long-spread.jpg"
        },
        {
            "item_id": "28",
            "url": "..\/Images\/mirror-liquid.jpg"
        },
        {
            "item_id": "29",
            "url": "..\/Images\/nightstand.jpg"
        },
        {
            "item_id": "30",
            "url": "..\/Images\/room-living.jpg"
        },
        {
            "item_id": "31",
            "url": "..\/Images\/swing-butterfly.jpg"
        },
        {
            "item_id": "32",
            "url": "..\/Images\/swing-pink.jpg"
        },
        {
            "item_id": "33",
            "url": "..\/Images\/table-assembeled.jpg"
        },
        {
            "item_id": "34",
            "url": "..\/Images\/table-butterfly.jpg"
        },
        {
            "item_id": "35",
            "url": "..\/Images\/table-china.jpg"
        },
        {
            "item_id": "36",
            "url": "..\/Images\/table-modern.jpg"
        },
        {
            "item_id": "37",
            "url": "..\/Images\/table-muslim.jpg"
        },
        {
            "item_id": "38",
            "url": "..\/Images\/table-small-wood.jpg"
        },
        {
            "item_id": "39",
            "url": "..\/Images\/table-tree.jpg"
        },
        {
            "item_id": "40",
            "url": "..\/Images\/toilet-papper-holder-turtle.jpg"
        }
    ],
    "user_cancel": [
        {
            "bill_id": "15",
            "user_id": "2",
            "date_time": "2025-04-11 00:30:33",
            "reason": "i purchased the wrong item"
        }
    ],
    "user_coupon": [
        {
            "user_id": "2",
            "coupon_id": "5",
            "date_used": "2025-04-10 23:52:21"
        },
        {
            "user_id": "2",
            "coupon_id": "8",
            "date_used": "2025-04-24 23:02:05"
        }
    ],
    "user_return": [
        {
            "bill_id": "12",
            "user_id": "2",
            "date_time": "2025-04-11 00:31:24",
            "reason": "Poor quality"
        }
    ]
}

// Storage Manager
function Add_Storage(Name, Value, IsJSON = true, IsLocal = true) {
    if (IsJSON) Value = JSON.stringify(Value);
    if (IsLocal) localStorage.setItem(Name, Value)
    else sessionStorage.setItem(Name, Value)
}

function Get_Storage(Name, IsJSON = true, IsLocal = true) {
    let data = IsLocal ? localStorage.getItem(Name) : sessionStorage.getItem(Name);
    return IsJSON ? JSON.parse(data) : data;
}

const ID = Get_Storage("ID", false) ?? -1;
const Admin = Get_Storage("IsAdmin");

function Get_Table(Name, Override = false) {
    let DB_Data = DB[Name.toLowerCase()];
    let St_Data = Get_Storage(Name);
    let St_Del = Get_Storage(Name + "_del");
    let IsArray = Array.isArray(DB_Data);

    let IsDel = ["Address", "Bill", "Favorite", "Item"].includes(Name);

    let All_Data = undefined;

    // If Table Is In DB Add It
    if (DB_Data) All_Data = DB_Data;

    // If Table In Storage Add It
    if (St_Data) {
        if (All_Data) {
            if (IsArray) All_Data = All_Data.concat(St_Data);
            else {
                Object.keys(St_Data).forEach(id => {
                    let final = All_Data[id];

                    if (Name == "Favorite" && All_Data[id]) final = final.concat(St_Data[id]);
                    else final = St_Data[id];

                    All_Data[id] = final;
                });
            }
        }
        else All_Data = St_Data;
    }

    // If There Is Del Table Remove From Total
    let Final = {};


    if (IsDel && St_Del && !Override) {
        Object.keys(All_Data).forEach(id => {
            if (Name === "Favorite") {
                let data = All_Data[id];
                if (St_Del[id]) data = data.filter(it => !St_Del[id].includes(it));
                Final[id] = data;
            }
            else if (Name === "Item") {
                if (!St_Del.includes(id)) Final[id] = All_Data[id];
            }
            else if (!St_Del[ID] || !St_Del[ID].includes(id)) Final[id] = All_Data[id];
        })
    } else {
        Final = All_Data;
    }


    return Final;
}

function Remove_From(Name, ID_d) {
    let DB_Data = DB[Name.toLowerCase()];
    let St_Data = Get_Storage(Name);
    let St_Del = Get_Storage(Name + "_del");
    if (Name == "Favorite") {
        if (St_Data && St_Data[ID] && St_Data[ID].includes(ID_d)) {
            St_Data[ID].splice(St_Data[ID].indexOf(ID_d), 1);
        }
        else if (DB_Data && DB_Data[ID] && DB_Data[ID].includes(ID_d)) {
            if (!St_Del) St_Del = {};

            if (St_Del[ID]) St_Del[ID].push(ID_d);
            else St_Del[ID] = [ID_d];
        }
    }
    else if (Name == "Item") {
        if (!ST_Del) St_Del = [ID_d];
        else St_Del.push(ID_d);
    }
    else if ((St_Data && St_Data[ID_d]) || (DB_Data && DB_Data[ID_d])) {
        if (!St_Del) St_Del = {};

        if (St_Del[ID]) St_Del[ID].push(ID_d);
        else St_Del[ID] = [ID_d];
    }

    if (St_Data) Add_Storage(Name, St_Data);
    if (St_Del) Add_Storage(Name + "_del", St_Del);
}

function Add_To(Name, ID_a, Data) {
    let Sto_Data = Get_Storage(Name);
    let Sto_Del = Get_Storage(Name + "_del");

    if (Name == "Favorite") {
        if (Sto_Del && Sto_Del[ID] && Sto_Del[ID].includes(Data)) {
            Sto_Del[ID].splice(Sto_Del[ID].indexOf(Data), 1);
            Add_Storage(Name + "_del", Sto_Del);
        }
        else {
            if (!Sto_Data) Sto_Data = {};

            if (Sto_Data[ID]) Sto_Data[ID].push(Data);
            else Sto_Data[ID] = [Data];

            Add_Storage(Name, Sto_Data);
        }
    }
    else {
        if (!Sto_Data) Sto_Data = ID_a != -1 ? {} : [];

        if (ID_a !== -1) Sto_Data[ID_a] = Data;
        else Sto_Data.push(Data);

        Add_Storage(Name, Sto_Data);
    }
}

function Get_Next_ID(Name) {
    let id = +Object.keys(Get_Table(Name, true)).pop();
    return (id + 1).toString();
}
