// 여행자 피드 목업 데이터 — 백엔드 API 연동 전까지 사용하는 로컬 플레이스홀더 데이터.
// 사진은 실제 이미지 대신 회색 placeholder(bg-slate-200)로 렌더하고, 텍스트도 와이어프레임의 안내 문구를 그대로 사용한다.

export const FEED_REGIONS = [
  '서울', '부산', '제주', '강릉', '경주', '전주', '여수', '속초', '수원', '용인',
]

// icon/iconBg는 타임라인 마커 스타일 — 지금은 전부 기본값(지도 아이콘·파란 원)이지만,
// 추후 관광지 유형(공항/식당/숙소/관광지 등)에 따라 장소별로 다르게 지정할 수 있도록 데이터에 필드로 둔다.
const STOP_TEMPLATE = [
  { time: '11:00', title: '인천국제공항', address: '인천광역시 중구', memo: '사용자가 남긴 메모에요.', icon: 'mdi:map', iconBg: 'bg-brand' },
  { time: '~13:00', title: '인천 → 서울', address: '인천광역시 중구', memo: '공항철도 이용', icon: 'mdi:map', iconBg: 'bg-brand' },
  { time: '11:00', title: '점심 식당', address: '서울특별시 종로구', memo: '한식 맛집!!!', icon: 'mdi:map', iconBg: 'bg-brand' },
  { time: '15:00', title: '그랜드 워커힐 서울', address: '서울특별시 광진구', memo: '호텔 체크인', icon: 'mdi:map', iconBg: 'bg-brand' },
  { time: '17:00', title: '경복궁', address: '서울특별시 종로구', memo: '한국 문화 탐방', icon: 'mdi:map', iconBg: 'bg-brand' },
]

// 하루 기본 4장은 카드 폭을 채우고, 4장을 넘는 날은 가로 스크롤로 나머지를 확인 (최소 4장 보장)
// Day 1(카드가 처음 열렸을 때 바로 보이는 날짜)부터 6장으로 시작해 스크롤 동작을 바로 확인할 수 있게 함
function placesPerDay(dayIdx) {
  return 6 - (dayIdx % 3) // 6, 5, 4, 6, 5, 4 ...
}

function buildDays(dayCount) {
  return Array.from({ length: dayCount }, (_, i) => ({
    day: i + 1,
    stops: STOP_TEMPLATE,
    places: Array.from({ length: placesPerDay(i) }, (_, j) => ({
      name: `Day${i + 1} 여행지${j + 1}`,
      time: 'hh:mm~hh:mm',
    })),
  }))
}

// 와이어프레임에 실제로 표기된 placeholder 문구 그대로 사용 (실 사용자 데이터는 추후 API 연동 시 교체)
const NICKNAME = 'user_nickname'
const FILTER_REGIONS = FEED_REGIONS.slice(0, 5) // 지역 필터 데모용 — 실제 등록된 지역만 순환

function planItem(id, { duration, dayCount, regionIdx = 0 }) {
  const days = buildDays(dayCount)
  return {
    id,
    type: 'plan',
    user: { nickname: NICKNAME },
    region: FILTER_REGIONS[regionIdx % FILTER_REGIONS.length],
    title: '여행 계획의 제목을 적어주세요',
    duration,
    placeCount: days.reduce((sum, d) => sum + d.places.length, 0),
    days,
  }
}

function recordItem(id, { comment, regionIdx = 0, planId, orientation = 'landscape' }) {
  return {
    id,
    type: 'record',
    user: { nickname: NICKNAME },
    region: FILTER_REGIONS[regionIdx % FILTER_REGIONS.length],
    title: '여행 기록의 제목을 적어주세요',
    comment,
    planId,
    orientation, // 'landscape' | 'portrait' — 업로드 사진 방향에 따라 카드 이미지 비율 결정
  }
}

const RECORD_COMMENT =
  '여행 기록에 대한 코멘트가 담겨질 텍스트 박스에요. 여행 후기를 자유롭게 적을 수 있어요. 여행 기록에 대한 코멘트가 담겨질 텍스트 박스에요. 여행 후기를 자유롭게 적을 수 있어요.'

const PLANS = [
  planItem('plan-1', { duration: '2박 3일', dayCount: 3, regionIdx: 0 }),
  planItem('plan-2', { duration: '3박 4일', dayCount: 4, regionIdx: 1 }),
  planItem('plan-3', { duration: '1박 2일', dayCount: 2, regionIdx: 2 }),
  planItem('plan-4', { duration: '2박 3일', dayCount: 3, regionIdx: 3 }),
  planItem('plan-5', { duration: '1박 2일', dayCount: 2, regionIdx: 4 }),
  planItem('plan-6', { duration: '2박 3일', dayCount: 3, regionIdx: 1 }),
]

const RECORDS = [
  recordItem('record-1', { comment: RECORD_COMMENT, regionIdx: 1, planId: 'plan-1' }),
  recordItem('record-2', { comment: RECORD_COMMENT, regionIdx: 2, planId: 'plan-2', orientation: 'portrait' }),
  recordItem('record-3', { comment: RECORD_COMMENT, regionIdx: 3, planId: 'plan-3' }),
  recordItem('record-4', { comment: RECORD_COMMENT, regionIdx: 4, planId: 'plan-4', orientation: 'portrait' }),
  recordItem('record-5', { comment: RECORD_COMMENT, regionIdx: 0, planId: 'plan-5' }),
  recordItem('record-6', { comment: RECORD_COMMENT, regionIdx: 2, planId: 'plan-6', orientation: 'portrait' }),
]

// 전체 필터에서 계획→기록→계획→기록 순으로 고정 번갈아 배치
function interleaveByType(plans, records) {
  const result = []
  const max = Math.max(plans.length, records.length)
  for (let i = 0; i < max; i += 1) {
    if (plans[i]) result.push(plans[i])
    if (records[i]) result.push(records[i])
  }
  return result
}

export const MOCK_FEED_ITEMS = interleaveByType(PLANS, RECORDS)

// 갤러리형(2열 grid, 행 단위로 Z자 순서) 전용 배치 — 계획→기록→기록→계획을 4칸(2행)씩 반복
function interleaveZPattern(plans, records) {
  const result = []
  for (let i = 0; i + 1 < Math.min(plans.length, records.length); i += 2) {
    result.push(plans[i], records[i], records[i + 1], plans[i + 1])
  }
  return result
}

export const MOCK_GALLERY_ITEMS = interleaveZPattern(PLANS, RECORDS)

export const MOCK_TOP5_PLANS = PLANS.slice(0, 5).map((p, i) => ({
  ...p,
  rank: i + 1,
  likeCount: [187, 87, 62, 21, 9][i],
}))
