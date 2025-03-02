export interface TarotCard {
  id: number;
  name: string;
  description: string;
  meaning: {
    upright: string;
    reversed: string;
  };
}

export const tarotCards: TarotCard[] = [
  // Major Arcana (22 lá - giữ nguyên như bạn đã cung cấp)
  {
    id: 0,
    name: "The Fool",
    description: "Sự khởi đầu mới, ngây thơ, tự phát",
    meaning: {
      upright: "Khởi đầu mới, mạo hiểm, tự do, tinh thần tự phát, ngây thơ",
      reversed: "Thiếu suy nghĩ, liều lĩnh, mạo hiểm không cần thiết, thiếu kế hoạch"
    }
  },
  {
    id: 1,
    name: "The Magician",
    description: "Sự biểu hiện, khéo léo, quyền lực",
    meaning: {
      upright: "Sự biểu hiện, khéo léo, quyền lực, tập trung, hành động, sáng tạo",
      reversed: "Thao túng, lừa dối, thiếu kỹ năng, lãng phí tài năng"
    }
  },
  {
    id: 2,
    name: "The High Priestess",
    description: "Trực giác, tiềm thức, bí ẩn",
    meaning: {
      upright: "Trực giác, tiềm thức, bí ẩn, sự thụ động, sự hiểu biết sâu sắc",
      reversed: "Bí mật bị tiết lộ, thiếu trực giác, bỏ qua trực giác"
    }
  },
  {
    id: 3,
    name: "The Empress",
    description: "Sự phong phú, sáng tạo, mẫu tính",
    meaning: {
      upright: "Sự phong phú, sáng tạo, mẫu tính, tình yêu, sự hài hòa, thiên nhiên",
      reversed: "Sự phụ thuộc, quá bảo vệ, thiếu sáng tạo, thiếu sự nuôi dưỡng"
    }
  },
  {
    id: 4,
    name: "The Emperor",
    description: "Quyền lực, lãnh đạo, cấu trúc",
    meaning: {
      upright: "Quyền lực, lãnh đạo, cấu trúc, ổn định, bảo vệ, lý trí",
      reversed: "Độc đoán, quá kiểm soát, cứng nhắc, thiếu kỷ luật"
    }
  },
  {
    id: 5,
    name: "The Hierophant",
    description: "Truyền thống, tuân thủ, tâm linh",
    meaning: {
      upright: "Truyền thống, tuân thủ, tâm linh, đạo đức, giáo dục, niềm tin",
      reversed: "Thách thức quy ước, không tuân thủ, nổi loạn"
    }
  },
  {
    id: 6,
    name: "The Lovers",
    description: "Tình yêu, hòa hợp, lựa chọn",
    meaning: {
      upright: "Tình yêu, hòa hợp, lựa chọn, giá trị, mối quan hệ, sự kết nối",
      reversed: "Mất cân bằng, chia tay, lựa chọn sai lầm, bất hòa"
    }
  },
  {
    id: 7,
    name: "The Chariot",
    description: "Kiểm soát, ý chí, chiến thắng",
    meaning: {
      upright: "Kiểm soát, ý chí, chiến thắng, quyết tâm, tự tin",
      reversed: "Thiếu kiểm soát, thiếu định hướng, hung hăng, thất bại"
    }
  },
  {
    id: 8,
    name: "Strength",
    description: "Sức mạnh, can đảm, kiên nhẫn",
    meaning: {
      upright: "Sức mạnh, can đảm, kiên nhẫn, kiểm soát, lòng trắc ẩn",
      reversed: "Yếu đuối, thiếu tự tin, thiếu tự kiểm soát, lạm dụng quyền lực"
    }
  },
  {
    id: 9,
    name: "The Hermit",
    description: "Nội tâm, suy ngẫm, tìm kiếm",
    meaning: {
      upright: "Nội tâm, suy ngẫm, tìm kiếm, cô đơn, hướng dẫn nội tâm",
      reversed: "Cô lập, cô đơn, rút lui quá mức"
    }
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    description: "Vận mệnh, chu kỳ, bước ngoặt",
    meaning: {
      upright: "Vận mệnh, chu kỳ, bước ngoặt, may mắn, thay đổi",
      reversed: "Xui xẻo, sự gián đoạn, sự can thiệp bên ngoài, mất kiểm soát"
    }
  },
  {
    id: 11,
    name: "Justice",
    description: "Công lý, sự thật, luật pháp",
    meaning: {
      upright: "Công lý, sự thật, luật pháp, nguyên nhân và kết quả, cân bằng",
      reversed: "Bất công, thiếu trách nhiệm, không trung thực"
    }
  },
  {
    id: 12,
    name: "The Hanged Man",
    description: "Hy sinh, buông bỏ, quan điểm mới",
    meaning: {
      upright: "Hy sinh, buông bỏ, quan điểm mới, chờ đợi, từ bỏ",
      reversed: "Trì hoãn, kháng cự, do dự, bám víu"
    }
  },
  {
    id: 13,
    name: "Death",
    description: "Kết thúc, thay đổi, chuyển đổi",
    meaning: {
      upright: "Kết thúc, thay đổi, chuyển đổi, chuyển tiếp, buông bỏ",
      reversed: "Kháng cự thay đổi, không thể tiến lên, trì hoãn"
    }
  },
  {
    id: 14,
    name: "Temperance",
    description: "Cân bằng, điều độ, kiên nhẫn",
    meaning: {
      upright: "Cân bằng, điều độ, kiên nhẫn, mục đích, ý nghĩa",
      reversed: "Mất cân bằng, thiếu điều độ, thiếu tầm nhìn dài hạn"
    }
  },
  {
    id: 15,
    name: "The Devil",
    description: "Ràng buộc, nghiện ngập, vật chất",
    meaning: {
      upright: "Ràng buộc, nghiện ngập, vật chất, dục vọng, bóng tối",
      reversed: "Giải phóng, vượt qua giới hạn, khôi phục quyền lực"
    }
  },
  {
    id: 16,
    name: "The Tower",
    description: "Thảm họa, biến động, thức tỉnh",
    meaning: {
      upright: "Thảm họa, biến động, thức tỉnh, tiết lộ, khủng hoảng",
      reversed: "Tránh thảm họa, sợ thay đổi, trì hoãn sự thật"
    }
  },
  {
    id: 17,
    name: "The Star",
    description: "Hy vọng, niềm tin, mục đích",
    meaning: {
      upright: "Hy vọng, niềm tin, mục đích, cảm hứng, sự bình yên",
      reversed: "Mất niềm tin, mất hy vọng, thất vọng, bi quan"
    }
  },
  {
    id: 18,
    name: "The Moon",
    description: "Ảo tưởng, sợ hãi, tiềm thức",
    meaning: {
      upright: "Ảo tưởng, sợ hãi, tiềm thức, trực giác, bí ẩn",
      reversed: "Giải phóng nỗi sợ, sự rõ ràng, vượt qua ảo tưởng"
    }
  },
  {
    id: 19,
    name: "The Sun",
    description: "Thành công, niềm vui, năng lượng",
    meaning: {
      upright: "Thành công, niềm vui, năng lượng, sự sáng tỏ, sự ấm áp",
      reversed: "Thất bại tạm thời, thiếu nhiệt tình, thiếu sự rõ ràng"
    }
  },
  {
    id: 20,
    name: "Judgement",
    description: "Phán xét, tái sinh, thức tỉnh",
    meaning: {
      upright: "Phán xét, tái sinh, thức tỉnh, tha thứ, sự phục hồi",
      reversed: "Tự nghi ngờ, thiếu tự nhận thức, hối tiếc"
    }
  },
  {
    id: 21,
    name: "The World",
    description: "Hoàn thành, thành tựu, trọn vẹn",
    meaning: {
      upright: "Hoàn thành, thành tựu, trọn vẹn, hội nhập, du lịch",
      reversed: "Thiếu hoàn thành, thiếu kết thúc, trì hoãn"
    }
  },

  // Minor Arcana - Wands (14 lá)
  {
    id: 22,
    name: "Ace of Wands",
    description: "Cảm hứng, khởi đầu mới, năng lượng sáng tạo",
    meaning: {
      upright: "Cảm hứng, khởi đầu mới, năng lượng sáng tạo, đam mê",
      reversed: "Trì hoãn, thiếu sáng kiến, mất động lực"
    }
  },
  {
    id: 23,
    name: "Two of Wands",
    description: "Lập kế hoạch, lựa chọn, khám phá",
    meaning: {
      upright: "Lập kế hoạch, lựa chọn, khám phá, tầm nhìn xa",
      reversed: "Sợ thay đổi, thiếu kế hoạch, do dự"
    }
  },
  {
    id: 24,
    name: "Three of Wands",
    description: "Mở rộng, tầm nhìn, cơ hội",
    meaning: {
      upright: "Mở rộng, tầm nhìn, cơ hội, tiến bộ",
      reversed: "Trì hoãn, thất bại, thiếu chuẩn bị"
    }
  },
  // ... thêm các lá từ Four of Wands đến Ten of Wands tương tự
  {
    id: 31,
    name: "Page of Wands",
    description: "Nhiệt huyết, khám phá, tin tức",
    meaning: {
      upright: "Nhiệt huyết, khám phá, tin tức, sáng tạo",
      reversed: "Thiếu định hướng, chậm trễ, thiếu tự tin"
    }
  },
  {
    id: 32,
    name: "Knight of Wands",
    description: "Hành động, phiêu lưu, năng lượng",
    meaning: {
      upright: "Hành động, phiêu lưu, năng lượng, đam mê",
      reversed: "Vội vàng, thiếu kiên nhẫn, thất bại"
    }
  },
  {
    id: 33,
    name: "Queen of Wands",
    description: "Tự tin, độc lập, ấm áp",
    meaning: {
      upright: "Tự tin, độc lập, ấm áp, quyết đoán",
      reversed: "Thống trị, thiếu tự tin, bốc đồng"
    }
  },
  {
    id: 34,
    name: "King of Wands",
    description: "Lãnh đạo, tầm nhìn, quyền lực",
    meaning: {
      upright: "Lãnh đạo, tầm nhìn, quyền lực, sáng tạo",
      reversed: "Kiểm soát, bốc đồng, thiếu linh hoạt"
    }
  },

  // Minor Arcana - Cups (14 lá)
  {
    id: 35,
    name: "Ace of Cups",
    description: "Tình yêu mới, cảm xúc, trực giác",
    meaning: {
      upright: "Tình yêu mới, cảm xúc, trực giác, sự phong phú",
      reversed: "Chặn cảm xúc, thiếu kết nối, trống rỗng"
    }
  },
  {
    id: 36,
    name: "Two of Cups",
    description: "Quan hệ đối tác, hòa hợp, kết nối",
    meaning: {
      upright: "Quan hệ đối tác, hòa hợp, kết nối, tình yêu",
      reversed: "Mất cân bằng, chia tay, bất hòa"
    }
  },
  // ... thêm các lá từ Three of Cups đến Ten of Cups
  {
    id: 45,
    name: "Page of Cups",
    description: "Sáng tạo, cảm xúc, tin tức",
    meaning: {
      upright: "Sáng tạo, cảm xúc, tin tức, trực giác",
      reversed: "Thiếu cảm hứng, cảm xúc không ổn định"
    }
  },
  {
    id: 46,
    name: "Knight of Cups",
    description: "Lãng mạn, lý tưởng, cảm xúc",
    meaning: {
      upright: "Lãng mạn, lý tưởng, cảm xúc, sáng tạo",
      reversed: "Không thực tế, thất vọng, cảm xúc thất thường"
    }
  },
  {
    id: 47,
    name: "Queen of Cups",
    description: "Lòng trắc ẩn, trực giác, nuôi dưỡng",
    meaning: {
      upright: "Lòng trắc ẩn, trực giác, nuôi dưỡng, cảm xúc sâu sắc",
      reversed: "Quá cảm xúc, phụ thuộc, thiếu ranh giới"
    }
  },
  {
    id: 48,
    name: "King of Cups",
    description: "Kiểm soát cảm xúc, lòng trắc ẩn, khôn ngoan",
    meaning: {
      upright: "Kiểm soát cảm xúc, lòng trắc ẩn, khôn ngoan, cân bằng",
      reversed: "Thao túng, cảm xúc không ổn định, xa cách"
    }
  },

  // Minor Arcana - Swords (14 lá)
  {
    id: 49,
    name: "Ace of Swords",
    description: "Sự rõ ràng, sự thật, đột phá",
    meaning: {
      upright: "Sự rõ ràng, sự thật, đột phá, công lý",
      reversed: "Hỗn loạn, hiểu lầm, bất công"
    }
  },
  {
    id: 50,
    name: "Two of Swords",
    description: "Lựa chọn khó khăn, bế tắc, mù quáng",
    meaning: {
      upright: "Lựa chọn khó khăn, bế tắc, mù quáng, cân bằng",
      reversed: "Do dự, bối rối, thông tin sai lệch"
    }
  },
  // ... thêm các lá từ Three of Swords đến Ten of Swords
  {
    id: 59,
    name: "Page of Swords",
    description: "Tò mò, cảnh giác, giao tiếp",
    meaning: {
      upright: "Tò mò, cảnh giác, giao tiếp, tư duy sắc bén",
      reversed: "Lừa dối, vội vàng, thiếu tập trung"
    }
  },
  {
    id: 60,
    name: "Knight of Swords",
    description: "Hành động nhanh, quyết đoán, xung đột",
    meaning: {
      upright: "Hành động nhanh, quyết đoán, xung đột, tham vọng",
      reversed: "Hấp tấp, hung hăng, thiếu kế hoạch"
    }
  },
  {
    id: 61,
    name: "Queen of Swords",
    description: "Trí tuệ, độc lập, rõ ràng",
    meaning: {
      upright: "Trí tuệ, độc lập, rõ ràng, trung thực",
      reversed: "Lạnh lùng, cay nghiệt, thiếu cảm xúc"
    }
  },
  {
    id: 62,
    name: "King of Swords",
    description: "Quyền lực trí tuệ, công lý, sự thật",
    meaning: {
      upright: "Quyền lực trí tuệ, công lý, sự thật, lý trí",
      reversed: "Thao túng, bất công, độc đoán"
    }
  },

  // Minor Arcana - Pentacles (14 lá)
  {
    id: 63,
    name: "Ace of Pentacles",
    description: "Cơ hội tài chính, thịnh vượng, khởi đầu",
    meaning: {
      upright: "Cơ hội tài chính, thịnh vượng, khởi đầu, ổn định",
      reversed: "Mất cơ hội, thiếu kế hoạch, tài chính không ổn định"
    }
  },
  {
    id: 64,
    name: "Two of Pentacles",
    description: "Cân bằng, linh hoạt, đa nhiệm",
    meaning: {
      upright: "Cân bằng, linh hoạt, đa nhiệm, thích nghi",
      reversed: "Mất cân bằng, quá tải, thiếu tổ chức"
    }
  },
  // ... thêm các lá từ Three of Pentacles đến Ten of Pentacles
  {
    id: 73,
    name: "Page of Pentacles",
    description: "Học hỏi, cơ hội, tham vọng",
    meaning: {
      upright: "Học hỏi, cơ hội, tham vọng, thực tế",
      reversed: "Thiếu tiến bộ, lười biếng, mất tập trung"
    }
  },
  {
    id: 74,
    name: "Knight of Pentacles",
    description: "Làm việc chăm chỉ, trách nhiệm, kiên nhẫn",
    meaning: {
      upright: "Làm việc chăm chỉ, trách nhiệm, kiên nhẫn, hiệu quả",
      reversed: "Lười biếng, trì trệ, thiếu cam kết"
    }
  },
  {
    id: 75,
    name: "Queen of Pentacles",
    description: "Thực tế, nuôi dưỡng, thịnh vượng",
    meaning: {
      upright: "Thực tế, nuôi dưỡng, thịnh vượng, ổn định",
      reversed: "Phụ thuộc, thiếu cân bằng, bỏ bê"
    }
  },
  {
    id: 76,
    name: "King of Pentacles",
    description: "Thành công tài chính, ổn định, lãnh đạo",
    meaning: {
      upright: "Thành công tài chính, ổn định, lãnh đạo, thực tế",
      reversed: "Tham lam, cố chấp, thất bại tài chính"
    }
  }
];

// Spread Types (giữ nguyên)
export const spreadTypes = [
  {
    id: "one_card",
    name: "1 lá bài",
    description: "Dành cho câu hỏi đơn giản hoặc lời khuyên hàng ngày",
    positions: [
      { id: "single", name: "Lá bài" }
    ]
  },
  {
    id: "three_card",
    name: "3 lá bài",
    description: "Quá khứ, Hiện tại, Tương lai",
    positions: [
      { id: "past", name: "Quá khứ" },
      { id: "present", name: "Hiện tại" },
      { id: "future", name: "Tương lai" }
    ]
  },
  {
    id: "celtic_cross",
    name: "Celtic Cross (10 lá)",
    description: "Trải bài phức tạp hơn cho cái nhìn sâu sắc",
    positions: [
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
    ]
  }
];