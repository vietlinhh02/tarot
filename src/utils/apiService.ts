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
    
    Hãy cung cấp một diễn giải chi tiết và sâu sắc cho trải bài này, với ít nhất 500-600 từ tổng thể. Bao gồm các phần:
    
    1. Phân tích chi tiết từng lá bài theo vị trí của nó trong trải bài, ý nghĩa của lá bài đó khi xuôi/ngược, và mối liên hệ với câu hỏi của người dùng.
    
    2. Mối tương tác giữa các lá bài với nhau, các mẫu hình và chủ đề xuất hiện trong trải bài.
    
    3. Đưa ra lời khuyên cụ thể và hướng dẫn thực tế dựa trên thông điệp từ trải bài.
    
    4. Một kết luận tổng thể về ý nghĩa của trải bài và làm thế nào người dùng có thể áp dụng những hiểu biết này vào hoàn cảnh của họ.
    
    Sử dụng ngôn ngữ huyền bí, giàu hình ảnh và chi tiết. Định dạng câu trả lời với các đề mục rõ ràng, đoạn văn ngắn để dễ đọc, và sử dụng định dạng text như in đậm (*) cho các điểm quan trọng.`;

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
    reading += `Dựa trên câu hỏi của bạn: "*${question}*", đây là diễn giải chi tiết cho trải bài **${spreadType}**:\n\n`;
  } else {
    reading += `Đây là diễn giải chi tiết cho trải bài **${spreadType}** của bạn:\n\n`;
  }

  reading += `---\n\n`;

  // Diễn giải từng lá bài
  cards.forEach((item, index) => {
    const cardState = item.isReversed ? "ngược" : "xuôi";
    reading += `**${index + 1}. ${item.position.name} - ${item.card.name} (${cardState}):**\n\n`;
    
    if (item.isReversed) {
      reading += `Lá bài này xuất hiện ở trạng thái **ngược**, cho thấy những thách thức hoặc khía cạnh đang bị cản trở của *${item.card.description.toLowerCase()}*. `;
      reading += `Điều này có thể ám chỉ bạn đang gặp khó khăn trong việc thể hiện hoặc chấp nhận những phẩm chất này. Có thể bạn đang cảm thấy bị chặn lại hoặc bị cản trở bởi những năng lượng tiêu cực.\n\n`;
      reading += `Trong vị trí "${item.position.name}", điều này gợi ý rằng những thách thức liên quan đến ${item.card.description.toLowerCase()} đang ảnh hưởng đến khía cạnh này trong cuộc sống của bạn. Hãy xem xét làm thế nào bạn có thể vượt qua những rào cản này.\n\n`;
    } else {
      reading += `Lá bài này thể hiện năng lượng **tích cực** của *${item.card.description.toLowerCase()}*. `;
      reading += `Điều này gợi ý rằng bạn đang hoặc nên tận dụng những phẩm chất này trong tình huống hiện tại. Năng lượng của lá bài đang chảy tự do và mạnh mẽ, mang đến những cơ hội và sức mạnh cho bạn.\n\n`;
      reading += `Trong vị trí "${item.position.name}", lá bài này cho thấy ${item.card.description.toLowerCase()} đang là một điểm mạnh hoặc cơ hội đáng chú ý. Hãy tận dụng năng lượng này và để nó hướng dẫn bạn.\n\n`;
    }
    
    // Thêm chi tiết ngẫu nhiên để làm phong phú diễn giải
    const randomDetails = [
      `Hình ảnh trên lá bài gợi nhớ về sự **kết nối** giữa các yếu tố thiên nhiên và tinh thần con người. Chú ý đến chi tiết này có thể cung cấp thêm hiểu biết về tình huống của bạn.`,
      `Màu sắc **${item.isReversed ? "tối" : "sáng"}** trên lá bài phản ánh trạng thái cảm xúc và năng lượng hiện tại của bạn. Hãy để ý đến cảm xúc của mình khi nhìn vào lá bài này.`,
      `Biểu tượng trên lá bài mang ý nghĩa về sự **chuyển đổi** và **trưởng thành**. Đây có thể là thời điểm để bạn xem xét lại các giá trị và ưu tiên của mình.`,
      `Sự xuất hiện của lá bài này có thể liên quan đến một người quan trọng trong cuộc sống của bạn, người mang năng lượng tương tự như ${item.card.description.toLowerCase()}.`
    ];
    
    reading += randomDetails[Math.floor(Math.random() * randomDetails.length)] + "\n\n";
    reading += `---\n\n`;
  });

  // Phần mối tương tác giữa các lá bài
  reading += `**Mối tương tác giữa các lá bài:**\n\n`;
  reading += `Nhìn vào toàn bộ trải bài, tôi có thể thấy một mẫu hình thú vị đang hình thành. Các lá bài không tồn tại độc lập mà tạo nên một câu chuyện liên kết với nhau. `;
  
  // Tạo phân tích giả định về mối liên hệ giữa các lá bài
  if (cards.length >= 2) {
    const firstCard = cards[0].card.name;
    const lastCard = cards[cards.length - 1].card.name;
    reading += `Có một luồng năng lượng rõ ràng chảy từ *${firstCard}* đến *${lastCard}*, cho thấy một hành trình hoặc quá trình phát triển trong tình huống của bạn.\n\n`;
    
    reading += `Mối liên kết này gợi ý rằng giải pháp hoặc kết quả cuối cùng có liên quan mật thiết đến cách bạn tiếp cận những thách thức ban đầu. Hãy chú ý đến những chi tiết này để hiểu rõ hơn về con đường phía trước.\n\n`;
  }
  
  reading += `---\n\n`;
  
  // Lời khuyên cụ thể
  reading += `**Lời khuyên từ trải bài:**\n\n`;
  reading += `Dựa trên những thông điệp từ các lá bài, đây là một số hướng dẫn cụ thể cho bạn:\n\n`;
  reading += `1. **Tin tưởng trực giác của bạn** - Các lá bài cho thấy bạn có sự hiểu biết sâu sắc về tình huống này hơn bạn nghĩ.\n\n`;
  reading += `2. **Tìm sự cân bằng** - Có một chủ đề về sự hài hòa xuất hiện trong trải bài, gợi ý rằng bạn cần cân nhắc các khía cạnh khác nhau của tình huống.\n\n`;
  reading += `3. **Chấp nhận thay đổi** - Trải bài này gợi ý về một chu kỳ đang kết thúc và một chu kỳ mới đang bắt đầu. Hãy cởi mở với những khả năng mới.\n\n`;
  reading += `4. **Hành động có chủ đích** - Thay vì phản ứng theo bản năng, hãy dành thời gian để cân nhắc các lựa chọn của bạn trước khi tiến hành.\n\n`;
  
  reading += `---\n\n`;
  
  // Kết luận
  reading += `**Kết luận:**\n\n`;
  reading += `Nhìn chung, trải bài **${spreadType}** này tiết lộ một hành trình chuyển đổi sâu sắc đang diễn ra trong cuộc sống của bạn. Các lá bài cho thấy bạn đang ở một giao điểm quan trọng, nơi quyết định và hành động của bạn sẽ có ảnh hưởng lâu dài.\n\n`;
  
  reading += `Có một cảm giác mạnh mẽ về tiềm năng và cơ hội trong trải bài này. Ngay cả những thách thức được thể hiện qua các lá bài ngược cũng mang theo những bài học quý giá và cơ hội để trưởng thành. Hãy xem những thách thức này không phải là rào cản mà là những cánh cổng dẫn đến sự hiểu biết và phát triển sâu sắc hơn.\n\n`;
  
  reading += `Hãy nhớ rằng, bạn luôn có quyền lựa chọn và định hướng cuộc sống của mình. Các lá bài Tarot không định đoạt số phận của bạn mà chỉ soi sáng những năng lượng hiện tại và những con đường tiềm năng. Tin tưởng vào trực giác của bạn và sử dụng những hiểu biết từ trải bài này để hướng dẫn bạn trên hành trình tiếp theo.\n\n`;
  
  reading += `*Chúc bạn nhiều ánh sáng và sự minh mẫn trên hành trình của mình.*`;

  return reading;
} 