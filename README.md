# Tarot Online

Ứng dụng trải bài Tarot trực tuyến được xây dựng bằng Next.js và Tailwind CSS.

## Tính năng

- Chọn từ nhiều kiểu trải bài khác nhau (một lá, ba lá, Celtic Cross)
- Nhập câu hỏi của bạn để nhận được diễn giải phù hợp
- Hiệu ứng lật bài đẹp mắt
- Diễn giải chi tiết cho mỗi lá bài và trải bài
- Giao diện người dùng thân thiện và đáp ứng

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Ngôn ngữ lập trình
- [Google Gemini API](https://ai.google.dev/) - API AI cho diễn giải Tarot

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/yourusername/tarot-app.git
cd tarot-app
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file `.env.local` và thêm API key của bạn:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Chạy ứng dụng ở chế độ phát triển:
```bash
npm run dev
```

5. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt của bạn.

## Cấu trúc dự án

```
tarot-app/
├── public/
│   └── images/
│       ├── cards/       # Hình ảnh các lá bài
│       └── card-back.svg # Hình ảnh mặt sau lá bài
├── src/
│   ├── app/             # Các trang Next.js
│   ├── components/      # Các thành phần React
│   ├── data/            # Dữ liệu Tarot
│   └── utils/           # Các hàm tiện ích
├── .env.local           # Biến môi trường (không được commit)
└── README.md            # Tài liệu dự án
```

## Tùy chỉnh

### Thêm lá bài mới

Để thêm lá bài mới, hãy cập nhật file `src/data/tarotCards.ts` và thêm hình ảnh tương ứng vào thư mục `public/images/cards/`.

### Thêm kiểu trải bài mới

Để thêm kiểu trải bài mới, hãy cập nhật mảng `spreadTypes` trong file `src/data/tarotCards.ts` và cập nhật hàm `createReading` trong file `src/utils/tarotUtils.ts`.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết thêm chi tiết. 