# 🍬 Sweet Shop Management System

A modern, full-stack sweet shop management application built with React, TypeScript, and Tailwind CSS. This system allows customers to browse and purchase sweets while providing administrators with inventory management capabilities.

---

## ✨ Features

### 🛒 Customer Features
- **Browse Sweets** – View all available sweets in a beautiful card-based UI
- **Search & Filter** – Search by name or category, filter by sweet type
- **Sort Options** – Sort by name, price, or stock quantity
- **Shopping Cart** – Add multiple items, adjust quantities, view totals
- **Checkout Flow** – Complete address form with payment options
- **Stock Validation** – Real-time stock checking and low stock alerts

### 🛠️ Admin Features
- **Inventory Dashboard** – View total items, stock levels, and inventory value
- **Add Sweets** – Add new sweets with name, category, price, quantity, description
- **Edit Sweets** – Modify existing sweet details
- **Delete Sweets** – Remove sweets from inventory
- **Quick Stock Adjust** – Increment/decrement stock with one click
- **Bulk Restock** – Add multiple units to stock at once
- **Low Stock Alerts** – Visual indicators for items running low

### 💳 Checkout System
- **Delivery Address** – Full address form with validation
  - Full Name
  - Mobile Number (10-digit Indian format)
  - Complete Address
  - Landmark (optional)
  - City, State, Pincode
- **Payment Options**
  - Cash on Delivery
  - UPI (GPay, PhonePe, Paytm)
  - Credit/Debit Card (Visa, Mastercard, RuPay)
- **Order Confirmation** – Success animation with delivery estimate

---

## 🚀 Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Animations | Framer Motion |
| State Management | React Context API |
| Form Handling | React Hook Form + Zod |
| Routing | React Router DOM |
| Build Tool | Vite |

---

## 📁 Project Structure

```
src/
├── assets/              # Images and static assets
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Landing hero banner
│   ├── SweetCard.tsx    # Product card component
│   ├── SweetGrid.tsx    # Product grid layout
│   ├── SearchAndFilter.tsx
│   ├── CartDrawer.tsx   # Shopping cart slide-out
│   ├── CartItem.tsx     # Individual cart item
│   ├── CheckoutDialog.tsx
│   ├── AdminTable.tsx   # Inventory table
│   └── SweetFormDialog.tsx
├── context/             # React Context providers
│   ├── SweetContext.tsx # Sweet inventory state
│   └── CartContext.tsx  # Shopping cart state
├── data/                # Initial data
│   └── sweets.ts        # Sample sweets data
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route pages
│   ├── Index.tsx        # Home page
│   ├── Shop.tsx         # Shop page
│   ├── Admin.tsx        # Admin dashboard
│   └── NotFound.tsx     # 404 page
└── types/               # TypeScript types
    └── sweet.ts         # Sweet type definitions
```

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sweet-shop
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Customer shop page with product browsing |
| `/admin` | Admin inventory management dashboard |

---

## 🎨 Design System

The app uses a warm candy shop aesthetic with:

- **Primary Color**: Coral Pink (`hsl(350, 70%, 60%)`)
- **Accent Color**: Golden (`hsl(40, 85%, 55%)`)
- **Typography**: 
  - Display: Playfair Display (serif)
  - Body: DM Sans (sans-serif)
- **Animations**: Smooth transitions, hover effects, loading states
- **Responsive**: Mobile-first design, works on all screen sizes

---

## 🛍️ Sweet Categories

| Category | Emoji |
|----------|-------|
| Chocolates | 🍫 |
| Macarons | 🍪 |
| Cupcakes | 🧁 |
| Candies | 🍭 |
| Fudge | 🍬 |

---

## 💰 Currency

All prices are displayed in Indian Rupees (₹) with realistic pricing.

---

## 🔒 Form Validation

- **Mobile Number**: 10-digit Indian format (starting with 6-9)
- **Pincode**: 6-digit Indian postal code
- **Required Fields**: Name, phone, address, city, state, pincode
- **Price/Quantity**: Positive numbers only

---

## 🚀 Future Enhancements

- [ ] Database integration with Supabase/Lovable Cloud
- [ ] User authentication
- [ ] Order history and tracking
- [ ] Razorpay payment gateway integration
- [ ] Email/SMS notifications
- [ ] Product images upload
- [ ] GST calculation
- [ ] Multiple address support
- [ ] Wishlist feature

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👩‍💻 Built With

Built with ❤️ using [Lovable](https://lovable.dev)
