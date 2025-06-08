
# API Gateway Postman Collection

Koleksi ini mencakup berbagai endpoint untuk layanan `auth`, `reservation service`, dan `inventori` (termasuk bahan baku, supplier, resep, purchase order, dan detailnya).

## 🔐 Auth Endpoints

### POST `/auth/login`
Login user.
```json
{
  "email": "admin@gmail.com",
  "password": "123123"
}
```

### POST `/auth/register`
Register user.
```json
{
  "name": "admin5",
  "email": "admin5@gmail.com",
  "phone": "081331334",
  "password": "123123"
}
```

### GET `/auth/getUser`
Ambil data user yang sedang login (dengan token).

---

## 📅 Reservation Service

### Table Endpoints

- **GET** `/api/tables` – Ambil semua meja.
- **GET** `/api/tables/available` – Ambil meja yang tersedia.
- **GET** `/api/tables/:id` – Ambil detail meja berdasarkan ID.
- **POST** `/api/tables` – Tambah meja.
```json
{
  "table_number": 3,
  "capacity": 2
}
```
- **PATCH** `/api/tables/:id/status` – Ubah status meja.
```json
{
  "status": "reserved"
}
```
- **DELETE** `/api/tables/:id` – Hapus meja.

### Reservation Endpoints

- **POST** `/api/reservations` – Buat reservasi.
- **GET** `/api/reservations` – Ambil semua reservasi.
- **GET** `/api/reservations/user` – Ambil reservasi berdasarkan user.
- **GET** `/api/reservations/:id` – Ambil reservasi berdasarkan ID.
- **PATCH** `/api/reservations/:id/status` – Ubah status reservasi.
- **DELETE** `/api/reservations/:id` – Hapus reservasi.

---

## 📦 Inventory Service

### Bahan Baku

- **GET** `/api/inventori/bahan-baku`
- **GET** `/api/inventori/bahan-baku/:id`
- **GET** `/api/inventori/bahan-baku/low-stock`
- **POST** `/api/inventori/bahan-baku`
- **PUT** `/api/inventori/bahan-baku/:id`
- **PATCH** `/api/inventori/bahan-baku/:id/status`
- **PATCH** `/api/inventori/bahan-baku/:id/stock`
- **DELETE** `/api/inventori/bahan-baku/:id`

### Supplier

- **GET** `/api/inventori/suppliers`
- **GET** `/api/inventori/suppliers/search?query=xxx`
- **GET** `/api/inventori/suppliers/:id`
- **POST** `/api/inventori/suppliers`
- **PUT** `/api/inventori/suppliers/:id`
- **DELETE** `/api/inventori/suppliers/:id`

### Resep

- **GET** `/api/inventori/resep`
- **GET** `/api/inventori/resep/kategori`
- **GET** `/api/inventori/resep/search?name=xxx`
- **POST** `/api/inventori/resep`
- **PUT** `/api/inventori/resep/:id`
- **PATCH** `/api/inventori/resep/:id/status`
- **DELETE** `/api/inventori/resep/:id`

### Detail Resep

- **GET** `/api/inventori/resep-details`
- **GET** `/api/inventori/resep-details/:id`
- **GET** `/api/inventori/resep-details/resep/:resepId`
- **POST** `/api/inventori/resep-details`
- **POST** `/api/inventori/resep-details/batch`
- **PUT** `/api/inventori/resep-details/resep/:resepId/batch`
- **PATCH** `/api/inventori/resep-details/:id`
- **DELETE** `/api/inventori/resep-details/:id`

### Purchase Order

- **GET** `/api/inventori/purchase-orders`
- **GET** `/api/inventori/purchase-orders/:id`
- **GET** `/api/inventori/purchase-orders/supplier/:supplierId`
- **GET** `/api/inventori/purchase-orders/search?query=xxx`
- **POST** `/api/inventori/purchase-orders`
- **PUT** `/api/inventori/purchase-orders/:id`
- **PATCH** `/api/inventori/purchase-orders/:id/status`
- **PATCH** `/api/purchase-orders/:id/cancel`
- **DELETE** `/api/purchase-orders/:id`

### PO Detail

- **GET** `/api/inventori/po-details`
- **GET** `/api/inventori/po-details/:id`
- **GET** `/api/inventori/po-details/po/:id`
- **GET** `/api/inventori/po-details/po/:id/summary`
- **POST** `/api/inventori/po-details`
- **POST** `/api/inventori/po-details/bulk`
- **PUT** `/api/inventori/po-details/:id`
- **PATCH** `/api/inventori/po-details/:id/status`

---

---

## 🚀 Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan project secara lokal:

### 1. Clone Repository

```bash
git clone https://github.com/Cansyell/POS-api-gateway.git
cd POS-api-gateway
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File Environment (Opsional)

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Lalu sesuaikan isi file `.env` sesuai kebutuhan.

### 4. Jalankan Aplikasi

```bash
npm start
```

atau (jika pakai development mode):

```bash
npm run dev
```

---

## 🧪 Menjalankan Test

Untuk menjalankan semua unit/integration test:

```bash
npm test
```

Jika kamu ingin melihat hasil dalam format lebih detail:

```bash
npm test -- --verbose
```

---