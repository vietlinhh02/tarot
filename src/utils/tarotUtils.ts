import { TarotCard, tarotCards } from "../data/tarotCards";

/**
 * Xáo trộn một mảng sử dụng thuật toán Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Rút ngẫu nhiên một số lượng lá bài từ bộ bài Tarot
 */
export function drawCards(count: number): TarotCard[] {
  if (count <= 0 || count > tarotCards.length) {
    throw new Error(`Số lượng lá bài không hợp lệ: ${count}`);
  }
  
  const shuffledDeck = shuffleArray(tarotCards);
  return shuffledDeck.slice(0, count);
}

/**
 * Tạo một trải bài với các lá bài được gán vào các vị trí
 */
export function createReading(spreadId: string, cards: TarotCard[]) {
  let positions: { id: string; name: string }[] = [];
  
  switch (spreadId) {
    case "one_card":
      positions = [{ id: "single", name: "Lá bài" }];
      break;
    case "three_card":
      positions = [
        { id: "past", name: "Quá khứ" },
        { id: "present", name: "Hiện tại" },
        { id: "future", name: "Tương lai" }
      ];
      break;
    case "celtic_cross":
      positions = [
        { id: "present", name: "Hiện tại" },
        { id: "challenge", name: "Thách thức" },
        { id: "past", name: "Quá khứ" },
        { id: "future", name: "Tương lai" },
        { id: "above", name: "Mục tiêu" },
        { id: "below", name: "Tiềm thức" },
        { id: "advice", name: "Lời khuyên" },
        { id: "external", name: "Ảnh hưởng bên ngoài" },
        { id: "hopes", name: "Hy vọng và sợ hãi" },
        { id: "outcome", name: "Kết quả" }
      ];
      break;
    default:
      throw new Error(`Kiểu trải bài không hợp lệ: ${spreadId}`);
  }
  
  if (cards.length !== positions.length) {
    throw new Error(`Số lượng lá bài (${cards.length}) không khớp với số lượng vị trí (${positions.length})`);
  }
  
  return positions.map((position, index) => ({
    position,
    card: cards[index],
    isReversed: Math.random() > 0.5 // 50% cơ hội lá bài bị ngược
  }));
} 