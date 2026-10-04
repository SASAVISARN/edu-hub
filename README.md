# 📚 EduHub - แหล่งเรียนรู้ออนไลน์

EduHub เป็นแพลตฟอร์มการเรียนรู้ออนไลน์ที่ออกแบบมาเป็นนวัตกรรมเพื่อการศึกษา ช่วยให้อาจารย์สามารถแบ่งปันความรู้ และนักศึกษาสามารถเรียนรู้และแลกเปลี่ยนความคิดเห็นได้

## ✨ คุณสมบัติหลัก

- 🔐 **ระบบล็อกอิน** - รองรับทั้งอาจารย์และนักศึกษา
- 📝 **จัดการบทความ** - อาจารย์สามารถสร้าง แก้ไข ลบบทความ
- 💬 **ระบบความคิดเห็น** - นักศึกษาสามารถแสดงความคิดเห็น
- 💭 **ตอบกลับ** - อาจารย์สามารถตอบกลับความคิดเห็นของนักศึกษา
- 🔍 **ค้นหาและกรอง** - ค้นหาบทความตามชื่อหรือหมวดหมู่
- 📱 **Responsive** - รองรับการใช้งานทุกอุปกรณ์

## 🔑 ข้อมูลเข้าสู่ระบบ (ทดสอบ)

| บทบาท | Username | Password |
|-------|----------|----------|
| 👨‍🏫 อาจารย์ 1 | teacher | 1234 |
| 👩‍🏫 อาจารย์ 2 | teacher2 | 1234 |
| 👩‍🎓 นักศึกษา 1 | student | 1234 |
| 👨‍🎓 นักศึกษา 2 | student2 | 1234 |

## 🛠️ เทคโนโลยีที่ใช้

- **Next.js 14** - React Framework (App Router)
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **localStorage** - Client-side Data Storage

## 🚀 การติดตั้งและรัน

```bash
# ติดตั้ง dependencies
npm install

# รันโปรเจคในโหมด development
npm run dev

# Build สำหรับ production
npm run build

# รันในโหมด production
npm start
```

## 📁 โครงสร้างโปรเจค

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # หน้าแรก (แสดงบทความ)
│   ├── login/
│   │   └── page.tsx         # หน้าล็อกอิน
│   ├── admin/
│   │   ├── page.tsx         # แดชบอร์ดอาจารย์
│   │   └── create/
│   │       └── page.tsx     # สร้าง/แก้ไขบทความ
│   └── articles/
│       └── [id]/
│           └── page.tsx     # รายละเอียดบทความ + ความคิดเห็น
├── components/
│   ├── Navbar.tsx           # แถบนำทาง
│   ├── ArticleCard.tsx      # การ์ดแสดงบทความ
│   └── CommentSection.tsx   # ส่วนความคิดเห็นและตอบกลับ
└── lib/
    ├── types.ts             # Type definitions
    ├── auth.ts              # ระบบ Authentication
    ├── store.ts             # Data Store (localStorage)
    └── seed-data.ts         # ข้อมูลตัวอย่าง
```

## 📋 ฟีเจอร์ของระบบ

### สำหรับอาจารย์ (Teacher)
1. เข้าสู่ระบบด้วย username/password
2. เข้าถึงแดชบอร์ดจัดการบทความ
3. สร้างบทความใหม่ (เลือกหมวดหมู่, ไอคอน, เขียนเนื้อหาแบบ Markdown)
4. แก้ไขบทความที่สร้างไว้
5. ลบบทความ
6. ตอบกลับความคิดเห็นของนักศึกษา

### สำหรับนักศึกษา (Student)
1. เข้าสู่ระบบด้วย username/password
2. เรียกดูบทความทั้งหมด
3. ค้นหาบทความตามชื่อ
4. กรองบทความตามหมวดหมู่
5. อ่านบทความ
6. แสดงความคิดเห็นในบทความ

## 🌐 การ Deploy บน Vercel

1. Push โค้ดไปยัง GitHub repository
2. เชื่อมต่อ repository กับ Vercel
3. Vercel จะ build และ deploy อัตโนมัติ
4. ไม่จำเป็นต้องตั้งค่าเพิ่มเติม (Zero Config)

## 👨‍💻 พัฒนาโดย

นวัตกรรมเพื่อการศึกษา - Educational Innovation Project

## 📄 License

MIT
