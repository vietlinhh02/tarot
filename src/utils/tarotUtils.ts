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
 * Lấy các vị trí cho kiểu trải bài
 */
function getPositionsForSpread(spreadId: string): { id: string; name: string }[] {
  switch (spreadId) {
    case "one_card":
      return [{ id: "single", name: "Lá bài" }];
    case "three_card":
      return [
        { id: "past", name: "Quá khứ" },
        { id: "present", name: "Hiện tại" },
        { id: "future", name: "Tương lai" }
      ];
    case "celtic_cross":
      return [
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
    default:
      throw new Error(`Kiểu trải bài không hợp lệ: ${spreadId}`);
  }
}

/**
 * Tạo một trải bài với các lá bài được gán vào các vị trí
 */
export function createReading(spreadId: string, cards: TarotCard[]) {
  const positions = getPositionsForSpread(spreadId);
  
  if (cards.length !== positions.length) {
    throw new Error(`Số lượng lá bài (${cards.length}) không khớp với số lượng vị trí (${positions.length})`);
  }
  
  return positions.map((position, index) => ({
    position,
    card: cards[index],
    isReversed: Math.random() > 0.5 // 50% cơ hội lá bài bị ngược
  }));
}

/**
 * Tạo một trải bài với các lá bài được chọn thủ công
 */
export function createManualReading(spreadId: string, cards: TarotCard[]) {
  const positions = getPositionsForSpread(spreadId);
  
  if (cards.length !== positions.length) {
    throw new Error(`Số lượng lá bài (${cards.length}) không khớp với số lượng vị trí (${positions.length})`);
  }
  
  return positions.map((position, index) => ({
    position,
    card: cards[index],
    isReversed: Math.random() > 0.5 // 50% cơ hội lá bài bị ngược
  }));
} 