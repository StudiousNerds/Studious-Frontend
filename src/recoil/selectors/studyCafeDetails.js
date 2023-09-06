const { selector } = require("recoil");

const DUMMY_IMG_URL =
  "http://www.doits.co.kr/data/file/place/990343814_DLkXE5Uy_0dc8f9a7bd1dc4d18bf89d1e3a3877cc06ac77c4.jpg";
const DUMMY_DATA_2 = {
  cafeId: 3,
  cafeName: "(카페 이름)",
  cafePhotos: [DUMMY_IMG_URL, DUMMY_IMG_URL],
  accumResCnt: 782,
  distance: 5,
  nearestStation: "(가까운 역 이름)",
  hashtags: ["해시테그1", "해시테그2"],
  introduction:
    "랭스는 Language(s)에 s를 붙인 복수형의 줄임말로 언어 공부나 대화가 필요한 다양한 활동을 할 수 있는 공간으로 만들고자 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다. 스터디에 적합한 공간으로 시작되었습니다.",
  conveniences: ["룸 편의시설 이름1", "룸 편의시설 이름2"],
  notification: "(공지 사항)", // 공지사항이 없는 경우 null
  refundPolicy: {
    0: 0, // 이용 당일   :   0% 환불
    1: 50, // 이용 1일 전 :  50% 환불
    2: 50, // 이용 2일 전 :  50% 환불
    3: 50, // 이용 3일 전 :  50% 환불
    4: 50, // 이용 4일 전 :  50% 환불
    5: 50, // 이용 5일 전 :  50% 환불
    6: 100, // 이용 6일 전 : 100% 환불
    7: 100, // 이용 7일 전 : 100% 환불
    8: 100, // 이용 8일 전 : 100% 환불
  },
  notice: ["유의 사항1", "유의 사항2"],
  rooms: [
    {
      id: 1,
      name: "A룸",
      photos: [DUMMY_IMG_URL, DUMMY_IMG_URL],
      standCount: 2,
      minCount: 2,
      maxCount: 3,
      price: 2500,
      type: "PER_HOUR",
      minUsingTime: 1,
      canReserveDatetime: {
        // 해당 날짜 : (이용 가능 시간대)
        // ex. 이용 가능 시간이 10시 ~ 11시 => 10
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "yyyy-mm-dd": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      },
      conveniences: ["룸 편의시설 이름1", "룸 편의시설 이름2"],
      paidConveniences: [
        {
          convenienceName: "(편의시설 이름)",
          price: 2000,
        },
      ],
    },
    {
      id: 2,
      name: "A룸",
      photos: [DUMMY_IMG_URL, DUMMY_IMG_URL],
      standCount: 2,
      minCount: 2,
      maxCount: 3,
      price: 2500,
      type: "PER_PERSON",
      minUsingTime: 1,
      canReserveDatetime: {
        // 해당 날짜 : (이용 가능 시간대)
        // ex. 이용 가능 시간이 10시 ~ 11시 => 10
        "2023-01-09": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "2023-01-10": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "2023-01-11": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "2023-01-12": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "2023-01-13": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        "2023-01-14": [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      },
      conveniences: ["룸 편의시설 이름1", "룸 편의시설 이름2"],
      paidConveniences: [
        {
          convenienceName: "(편의시설 이름)",
          price: 2000,
        },
      ],
    },
  ],
  recommendationRate: 97,
  cleanliness: 5,
  deafening: 4,
  fixturesStatus: 4,
  total: 4,
  reviewInfo: [
    {
      grade: 4,
      email: "(작성자 email)",
      detail:
        "스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다.",
      date: "(작성 날짜)",
      photos: [DUMMY_IMG_URL, DUMMY_IMG_URL],
    },
    {
      grade: 4,
      email: "(작성자 email)",
      detail:
        "스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다.",
      date: "(작성 날짜)",
      photos: [DUMMY_IMG_URL],
    },
    {
      grade: 4,
      email: "(작성자 email)",
      detail:
        "스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다. 스터디룸이 깔끔하고 어쩌구 비품도 관리가 잘 되어있고 어쩌구 쾌적한 환경에서 팀원들이랑 어쩌구 나중에도 이용할 거 같습니다.",
      date: "(작성 날짜)",
      photos: [],
    },
  ],
};
export const detailsCommonSelector = selector({
  key: "DetailsCommon",
  get: () => {
    const {
      cafeName,
      cafePhotos,
      accumResCnt,
      distance,
      nearestStation,
      hashtags,
      introduction,
      conveniences,
    } = DUMMY_DATA_2;
    return {
      cafeName,
      cafePhotos,
      accumResCnt,
      distance,
      nearestStation,
      hashtags,
      introduction,
      conveniences,
    };
  },
});

export const detailsStudyRoomsSelector = selector({
  key: "DetailsStudyRooms",
  get: () => {
    const { rooms } = DUMMY_DATA_2;
    return rooms;
  },
});

export const detailsReviewsSelector = selector({
  key: "DetailsReviews",
  get: () => {
    const {
      reviewInfo,
      recommendationRate,
      cleanliness,
      deafening,
      fixturesStatus,
      total,
    } = DUMMY_DATA_2;
    return {
      reviewInfo,
      recommendationRate,
      cleanliness,
      deafening,
      fixturesStatus,
      total,
    };
  },
});
