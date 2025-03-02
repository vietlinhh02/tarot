import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gọi API Gemini để tạo diễn giải cho trải bài Tarot
 */
export async function generateTarotReading(
  spreadType: string,
  cards: Array<{
    position: { id: string; name: string };
    card: { name: string; description: string };
    isReversed: boolean;
  }>,
  question?: string
) {
  try {
    // Tạo prompt cho API Gemini
    const cardsInfo = cards
      .map(
        (item) =>
          `${item.position.name} - ${item.card.name}${
            item.isReversed ? " (Ngược)" : " (Xuôi)"
          }`
      )
      .join(", ");

    let prompt = `Bạn là một người đọc Tarot chuyên nghiệp với hơn 30 năm kinh nghiệm. Người dùng đã rút các lá bài sau trong trải bài ${spreadType}: ${cardsInfo}.`;

    if (question && question.trim() !== "") {
      prompt += ` Câu hỏi của người dùng là: '${question}'.`;
    }

    prompt += ` 
    
    Hãy diễn giải trải bài Tarot ngắn gọn, đầy đủ (khoảng 400-500 từ) gồm:
    
    1. Ý nghĩa từng lá bài trong vị trí của nó (xuôi/ngược), liên quan đến câu hỏi.
    
    2. Mối liên hệ giữa các lá bài, chủ đề chính của trải bài.
    
    3. Lời khuyên cụ thể và thiết thực.
    
    4. Kết luận ngắn gọn về ý nghĩa trải bài và cách áp dụng.
    
    Sử dụng ngôn ngữ dễ hiểu, đoạn văn ngắn, có dùng (*) để nhấn mạnh điểm quan trọng.`;

    // Kiểm tra xem có API key không
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("API key chưa được cấu hình. Sử dụng diễn giải mẫu.");
      return mockTarotReading(spreadType, cards, question);
    }

    // Khởi tạo API Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-thinking-exp-01-21",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 65536, // Tăng số lượng token đầu ra tối đa
      },
    });

    // Gọi API Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Lỗi khi gọi API Gemini:", error);
    // Nếu có lỗi, sử dụng diễn giải mẫu
    return mockTarotReading(spreadType, cards, question);
  }
}

/**
 * Hàm tạo diễn giải mẫu chi tiết cho mục đích demo hoặc khi API không khả dụng
 */
function mockTarotReading(
  spreadType: string,
  cards: Array<{
    position: { id: string; name: string };
    card: { name: string; description: string };
    isReversed: boolean;
  }>,
  question?: string
) {
  let reading = "";

  // Thêm phần giới thiệu
  if (question && question.trim() !== "") {
    reading += `Dựa trên câu hỏi: "*${question}*", đây là diễn giải trải bài **${spreadType}**:\n\n`;
  } else {
    reading += `Diễn giải trải bài **${spreadType}** của bạn:\n\n`;
  }

  reading += `---\n\n`;

  // Diễn giải từng lá bài
  cards.forEach((item, index) => {
    const cardState = item.isReversed ? "ngược" : "xuôi";
    reading += `**${item.position.name} - ${item.card.name} (${cardState}):**\n\n`;
    
    if (item.isReversed) {
      reading += `Lá bài ngược này thể hiện *thách thức* liên quan đến ${item.card.description.toLowerCase()}. Trong vị trí này, nó gợi ý bạn cần vượt qua rào cản để đạt được mục tiêu.\n\n`;
    } else {
      reading += `Lá bài xuôi này thể hiện *cơ hội* về ${item.card.description.toLowerCase()}. Trong vị trí này, nó khuyên bạn nên tận dụng năng lượng tích cực này.\n\n`;
    }
  });

  // Phần mối tương tác giữa các lá bài
  reading += `**Chủ đề chính:**\n\n`;
  
  if (cards.length >= 2) {
    const firstCard = cards[0].card.name;
    const lastCard = cards[cards.length - 1].card.name;
    reading += `Trải bài của bạn cho thấy hành trình từ *${firstCard}* đến *${lastCard}*, thể hiện quá trình chuyển đổi quan trọng trong tình huống hiện tại.\n\n`;
  }
  
  // Lời khuyên cụ thể
  reading += `**Lời khuyên:**\n\n`;
  reading += `1. **Tin tưởng trực giác** - Bạn hiểu rõ tình huống này hơn bạn nghĩ.\n`;
  reading += `2. **Tìm sự cân bằng** - Cân nhắc nhiều khía cạnh của vấn đề.\n`;
  reading += `3. **Chấp nhận thay đổi** - Đây là thời điểm chuyển giao quan trọng.\n`;
  reading += `4. **Hành động có chủ đích** - Suy nghĩ kỹ trước khi quyết định.\n\n`;
  
  // Kết luận
  reading += `**Kết luận:**\n\n`;
  reading += `Trải bài **${spreadType}** cho thấy bạn đang ở giao điểm quan trọng. Những thách thức hiện tại đều là cơ hội để trưởng thành. Tin tưởng vào khả năng của bản thân và sử dụng thông điệp từ các lá bài để định hướng hành động.\n\n`;
  
  reading += `*Chúc bạn thành công trên con đường phía trước.*`;

  return reading;
} 