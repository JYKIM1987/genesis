/*
 * equipment.js — 룬 / 장비(방어구) / 악세사리 공유 데이터
 *
 * 캐릭터 데이터와 독립적으로 갱신되는 파일이다(실제 게임에서도 장비류 패치는
 * 캐릭터 밸런스 패치와 별도로 이루어진다). 캐릭터 html은 이 파일을 자신과
 * 같은 폴더에서 찾아 로드하고, 있으면 그 내용으로 내장 폴백 데이터를
 * 덮어써서 쓴다 — 없거나 로드 실패 시엔 내장 폴백을 그대로 쓴다.
 *
 * 원본/사람이 읽는 버전: _workspace/장비_룬_악세사리_raw_data.md
 * (이 파일은 그 문서와 동일한 데이터를 코드펜스 없이 순수 JS로만 옮긴 것 —
 * 내용을 갱신할 땐 두 파일을 함께 갱신한다.)
 *
 * ── html 쪽 로딩 방법 ─────────────────────────────────────────────
 *   const s = document.createElement('script');
 *   s.src = 'equipment.js';
 *   s.onload = () => {
 *     const ov = window.EQUIPMENT_OVERRIDE;
 *     if (ov) {
 *       Object.assign(ARMOR_SETS, ov.ARMOR_SETS);
 *       Object.assign(ACCESSORIES, ov.ACCESSORIES);
 *       Object.assign(RUNES, ov.RUNES);
 *       Object.assign(RUNE_PRESETS, ov.RUNE_PRESETS);
 *       // SLOTS/RUNE_GRADE_ORDER는 배열이라 통째로 교체한다(길이가 다를 수 있음):
 *       SLOTS.length = 0; SLOTS.push(...ov.SLOTS);
 *       RUNE_GRADE_ORDER.length = 0; RUNE_GRADE_ORDER.push(...ov.RUNE_GRADE_ORDER);
 *       render();
 *     }
 *   };
 *   s.onerror = () => { /* equipment.js 없음 — 내장 폴백 그대로 사용 * / };
 *   document.head.appendChild(s);
 *
 *   위 코드가 정상 동작하려면 html이 애초에 ARMOR_SETS/ACCESSORIES/RUNES/
 *   RUNE_PRESETS/SLOTS/RUNE_GRADE_ORDER를 "재선언 가능한 방식"(let, 또는
 *   Object.assign 대상이 되는 미리 선언된 const 객체/배열)으로 갖고 있어야
 *   한다 — 이 파일은 절대 같은 이름으로 const를 다시 선언하지 않는다
 *   (이중 선언 시 "already declared" 문법 오류로 스크립트 전체가 깨진다).
 *   그래서 이 파일의 데이터는 전부 window.EQUIPMENT_OVERRIDE 하나의
 *   프로퍼티로만 노출된다.
 *
 * ── 코드 vs 이름 원칙 ─────────────────────────────────────────────
 *   ARMOR_SETS/ACCESSORIES/RUNES는 이름이 아니라 코드(ARM01.../ACC01.../
 *   RUNE01...)가 키다. name 필드는 그 코드가 가진 표시용 한국어 이름일
 *   뿐이다 — 게임 패치로 이름이 바뀌어도 name 필드만 갱신하면 되고,
 *   과거에 이 코드를 참조해둔 캐릭터 html의 저장된 선택값은 전혀
 *   영향받지 않는다. 새 장비가 추가되면 그 카테고리의 다음 순번 코드를
 *   새로 부여한다(예: ARM25, ACC50, RUNE24). 한 번 배정된 코드는
 *   그 항목이 삭제되지 않는 한 재사용/재배정하지 않는다.
 *
 * ── 제외한 것 ────────────────────────────────────────────────────
 *   EXTRA_STAT_LABEL(과거 룬 전용 스탯 라벨 네임스페이스)은 정의만 있고
 *   코드 어디서도 참조되지 않는 죽은 상수라 옮기지 않았다. STAT_LABEL은
 *   장비 데이터가 아니라 각 캐릭터 html 자체에 이미 내장된 전역 상수라
 *   이 파일의 대상이 아니다.
 */

window.EQUIPMENT_OVERRIDE = {

  // ── 방어구 세트 (전설 등급만, 항상 6각=풀각 기준) ──────────────────
  ARMOR_SETS: {
    ARM01: {name:'인도자', grade:'전설',
      set2:{hp:{v:15,zone:'village'},atk:{v:15,zone:'village'}}, set2desc:'최대 체력 +15%, 공격력 +15%.',
      set4:{phys:{v:20,zone:'always'},crit:{v:20,zone:'always'}}, set4desc:'물리 관통/치명타 확률 +20%(상시). 공격 시 치명타 발생하면 보호막 획득(치명타 확률 1%당 최대 체력 0.2%, 해제불가).',
      pieces:{투구:{name:'인도자의 가면',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'인도자의 망토',maxStar:1}, 장갑:{name:'인도자의 보호대',maxStar:6, pieceStat:'phys', pieceStars:{6:10}}, 신발:{name:'인도자의 부츠',maxStar:1}}
    },
    ARM02: {name:'검은 까마귀', grade:'전설',
      set2:{critDmg:{v:15,zone:'village'}}, set2desc:'치명타 피해량 +15%.',
      set4:{crit:{v:20,zone:'always'}}, set4desc:'치명타 확률 +20%.',
      pieces:{투구:{name:'검은 까마귀 두건',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'검은 까마귀 의복',maxStar:6, pieceStat:'hp', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 장갑:{name:'검은 까마귀 족쇄',maxStar:6, pieceStat:'crit', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 신발:{name:'검은 까마귀 장화',maxStar:6, pieceStat:'critResChance', pieceStars:{1:0,2:2,3:4,4:8,5:6,6:10}}}
    },
    ARM03: {name:'명계의 전갈', grade:'전설',
      set2:{hp:{v:15,zone:'village'}}, set2desc:'최대 체력 +15%.',
      set4:{phys:{v:20,zone:'always'}}, set4desc:'물리 관통 +20%.',
      pieces:{투구:{name:'명계의 전갈 터번',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'명계의 전갈 의상',maxStar:1}, 장갑:{name:'명계의 전갈 토시',maxStar:6, pieceStat:'phys', pieceStars:{6:10}}, 신발:{name:'명계의 전갈 신발',maxStar:1}}
    },
    ARM04: {name:'전설의 괴도', grade:'전설',
      set2:{critDmg:{v:10,zone:'village'},crit:{v:15,zone:'village'}}, set2desc:'치명타 피해량 +10%, 치명타 확률 +15%.',
      set4:{hp:{v:10,zone:'always'},critDmg:{v:15,zone:'always'}}, set4desc:'최대 체력 +10%, 치명타 피해량 +15%(상시). 전투 중 치명타 적중 시 전투 후 "날카로운 시선"(다음 전투 공격 시 치명타 피해량 +10%, 발동 후 해제/해제불가) 획득.',
      pieces:{투구:{name:'전설의 괴도 모자',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'전설의 괴도 작업복',maxStar:6, pieceStat:'hp', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 장갑:{name:'전설의 괴도 장갑',maxStar:6, pieceStat:'crit', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 신발:{name:'전설의 괴도 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{1:0,2:2,3:4,4:8,5:6,6:10}}}
    },
    ARM05: {name:'기백의 검사', grade:'전설',
      set2:{hp:{v:10,zone:'village'},phys:{v:10,zone:'village'}}, set2desc:'최대 체력 +10%, 물리 관통 +10%.',
      set4:{critResChance:{v:10,zone:'always'},atk:{v:15,zone:'always',cond:'공격 시(쿨1)'},phys:{v:15,zone:'always',cond:'공격 시(쿨1)'}}, set4desc:'받는 치명타 확률 -10%(상시). 공격 시 공격력/물리 관통 +15%(쿨타임 1턴).',
      pieces:{투구:{name:'기백의 검사 망토',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'기백의 검사 경갑옷',maxStar:1}, 장갑:{name:'기백의 검사 건틀릿',maxStar:6, pieceStat:'phys', pieceStars:{6:10}}, 신발:{name:'기백의 검사 부츠',maxStar:1}}
    },
    ARM06: {name:'시스템 이단자', grade:'전설',
      set2:{phys:{v:15,zone:'village'},crit:{v:15,zone:'village'}}, set2desc:'물리 관통 +15%, 치명타 확률 +15%.',
      set4:{atk:{v:30,zone:'always',cond:'적 공격 시'}}, set4desc:'적 공격 시 공격력 +30%. 턴당 1회 적에게 처치급 피해를 주면 2턴간 최대 체력 50% 보호막.',
      pieces:{투구:{name:'시스템 이단자의 안대',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'시스템 이단자의 코트',maxStar:1}, 장갑:{name:'시스템 이단자의 의수',maxStar:6, pieceStat:'crit', pieceStars:{6:10}}, 신발:{name:'시스템 이단자의 신발',maxStar:1}}
    },
    ARM07: {name:'회색의 계승자', grade:'전설',
      set2:{hp:{v:15,zone:'village'},critResDmg:{v:15,zone:'village'}}, set2desc:'최대 체력 +15%, 받는 치명타 피해량 감소 +15%.',
      set4:{atk:{v:20,zone:'always'},phys:{v:20,zone:'always'}}, set4desc:'공격력/물리 관통 +20%(상시). 조건부 "중재자의 수호" 보호막 별도 지급. 장갑(팔) 부위는 물리 관통 +10%(풀각, 사용자 확인).',
      pieces:{투구:{name:'계승자의 목도리',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'계승자의 흑의',maxStar:1}, 장갑:{name:'계승자의 장갑',maxStar:6, pieceStat:'phys', pieceStars:{6:10}}, 신발:{name:'계승자의 부츠',maxStar:1}}
    },
    ARM08: {name:'일기당천', grade:'전설',
      set2:{phys:{v:20,zone:'village'}}, set2desc:'물리 관통 +20%.',
      set4:{atk:{v:20,zone:'cond',cond:'전투 시 중첩형 버프(1스택당 10%, 3턴 지속, 최대 2중첩) — 표시값은 풀스택(2중첩) 기준'}}, set4desc:'전투 시 공격력이 3턴간 10%씩 증가(최대 2중첩) — 표시값은 풀스택(20%) 기준.',
      pieces:{투구:{name:'일기당천의 머리띠',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'일기당천의 의복',maxStar:6, pieceStat:'hp', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 장갑:{name:'일기당천의 팔 보호구',maxStar:6, pieceStat:'phys', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 신발:{name:'일기당천의 목신발',maxStar:6, pieceStat:'critResChance', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}}
    },
    ARM09: {name:'풍운의 밀사', grade:'전설',
      set2:{hp:{v:15,zone:'village'}}, set2desc:'최대 체력 +15%.',
      set4:{atk:{v:10,zone:'always'}}, set4desc:'전투 시 공격력 +10%(상시). 전투 종료 후 체력 50% 이하면 최대 체력 10% 회복.',
      pieces:{투구:{name:'풍운의 밀사 목도리',maxStar:6, pieceStat:'critResDmg', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 갑옷:{name:'풍운의 밀사 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 장갑:{name:'풍운의 밀사 장갑',maxStar:6, pieceStat:'phys', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}, 신발:{name:'풍운의 밀사 신발',maxStar:6, pieceStat:'critResChance', pieceStars:{1:0,2:2,3:4,4:6,5:8,6:10}}}
    },
    ARM10: {name:'어둠의 재상', grade:'전설',
      weightClassOnly:'라이트',
      set2:{mag:{v:15,zone:'village'}}, set2desc:'주문력 +15%.',
      set4:{mag:{v:10,zone:'cond',cond:'스킬 시전 시'},magPen:{v:10,zone:'cond',cond:'스킬 시전 시'}}, set4desc:'스킬 시전 시 주문력/마법 관통 +10%. 추가로 자기 시전 스킬로 적 공격 후 "철수"(턴 종료 전 추가 이동) 획득(쿨타임 3턴, 스탯 아님). 장갑(팔) 부위는 마법 관통 +10%(풀각 기준). 투구/갑옷/신발 개별 성급 데이터는 없음. 라이트 클래스 전용.',
      pieces:{투구:{name:'어둠의 재상관',maxStar:1}, 갑옷:{name:'어둠의 재상 로브',maxStar:1}, 장갑:{name:'어둠의 재상 장갑',maxStar:6, pieceStat:'magPen', pieceStars:{6:10}}, 신발:{name:'어둠의 재상 부츠',maxStar:1}}
    },
    ARM11: {name:'교황', grade:'전설',
      weightClassOnly:'라이트',
      set2:{}, set2desc:'받는 피해량 감소 +5%.',
      set4:{}, set4desc:'스킬 사용 시 60% 확률로 해당 스킬 쿨타임 1 감소(쿨타임 3턴, 스탯 아님).',
      pieces:{투구:{name:'교황의 예관',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'교황의 성장',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'교황의 자비',maxStar:6, pieceStat:'mag', pieceStars:{6:15}}, 신발:{name:'교황의 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM12: {name:'대현자', grade:'전설',
      weightClassOnly:'라이트',
      set2:{magPen:{v:15,zone:'village'}}, set2desc:'마법 관통 +15%.',
      set4:{}, set4desc:'범위 스킬 사용 시 스킬 피해량 +20%.',
      pieces:{투구:{name:'대현자의 서클릿',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'대현자의 로브',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'대현자의 장갑',maxStar:6, pieceStat:'magPen', pieceStars:{6:10}}, 신발:{name:'대현자의 신발',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM13: {name:'매혹의 영주', grade:'전설',
      weightClassOnly:'라이트',
      set2:{critResChance:{v:10,zone:'village'},critResDmg:{v:10,zone:'village'}}, set2desc:'받는 치명타 확률 -10%, 받는 치명타 피해량 -10%.',
      set4:{hp:{v:15,zone:'always'},mag:{v:15,zone:'always'}}, set4desc:'최대 체력 +15%, 주문력 +15%.',
      pieces:{투구:{name:'매혹의 영주 목걸이',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'매혹의 영주 비단옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'매혹의 영주 장갑',maxStar:6, pieceStat:'mag', pieceStars:{6:15}}, 신발:{name:'매혹의 영주 구두',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM14: {name:'빛의 헌신', grade:'전설',
      weightClassOnly:'라이트',
      set2:{dmgReduction:{v:10,zone:'cond',cond:'최대 체력(HP 100%) 상태일 때'}}, set2desc:'치유 증가량의 25%만큼 주문력 증가(합산안됨). 최대 체력 상태면 받는 피해량 -10%(조건부).',
      set2StatFormulaNote:{statKey:'mag', label:'방어구 - 빛의 헌신 2셋', text:'치유 증가량의 25%만큼 주문력 증가'},
      set4:{healGive:{v:15,zone:'always'}}, set4desc:'치유량 증가 +15%(상시). 스킬 시전 후 25% 확률로 "집중"(행동 종료 시 1TP 회복, 스탯 아님) 획득(쿨타임 1턴).',
      pieces:{투구:{name:'빛의 헌신 두건',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'빛의 헌신 의복',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'빛의 헌신 팔토시',maxStar:6, pieceStat:'healGive', pieceStars:{6:10}}, 신발:{name:'빛의 헌신 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM15: {name:'자애의 치유사', grade:'전설',
      weightClassOnly:'라이트',
      set2:{critResDmg:{v:10,zone:'village'},healGive:{v:15,zone:'village'}}, set2desc:'치유량 증가 +15%, 받는 치명타 피해량 -10%.',
      set4:{hp:{v:10,zone:'always'},atk:{v:10,zone:'cond',cond:'스킬로 아군에게 이로운 효과 부여 시(회복의 공명, 중첩무관)'},mag:{v:10,zone:'cond',cond:'스킬로 아군에게 이로운 효과 부여 시(회복의 공명, 중첩무관)'}}, set4desc:'최대 체력 +10%(상시), 침묵 면역. 스킬로 아군에게 이로운 효과 부여 시 "회복의 공명" 부여(공격력/주문력 +10%, 중첩과 무관하게 고정값, 공격/반격 후 중첩 감소).',
      pieces:{투구:{name:'자애의 치유사 모자',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'자애의 치유사 로브',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'자애의 치유사 토시',maxStar:6, pieceStat:'mag', pieceStars:{6:15}}, 신발:{name:'자애의 치유사 신발',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM16: {name:'추기경', grade:'전설',
      weightClassOnly:'라이트',
      set2:{hp:{v:15,zone:'village'}}, set2desc:'최대 체력 +15%.',
      set4:{mag:{v:10,zone:'always'}}, set4desc:'주문력 +10%(상시). 스킬 사용 시 33% 확률로 "집중"(행동 종료 시 1TP 획득, 스탯 아님) 획득(턴당 1회).',
      pieces:{투구:{name:'추기경의 사제모',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'추기경의 수단',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'추기경의 장갑',maxStar:6, pieceStat:'mag', pieceStars:{6:15}}, 신발:{name:'추기경의 구두',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM17: {name:'혜안의 군사', grade:'전설',
      weightClassOnly:'라이트',
      set2:{hp:{v:10,zone:'village'},crit:{v:10,zone:'village'}}, set2desc:'최대 체력 +10%, 치명타 확률 +10%.',
      set4:{critDmg:{v:20,zone:'cond',cond:'스킬 시전 시'}}, set4desc:'스킬 시전 시 치명타 피해량 +20%.',
      pieces:{투구:{name:'혜안의 군사 안경',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'혜안의 군사 천옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'혜안의 군사 장갑',maxStar:6, pieceStat:'magPen', pieceStars:{6:10}}, 신발:{name:'혜안의 군사 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM18: {name:'강격의 군주', grade:'전설',
      weightClassOnly:'헤비',
      set2:{def:{v:10,zone:'village'},hp:{v:10,zone:'village'}}, set2desc:'방어력 +10%, 최대 체력 +10%.',
      set4:{}, set4desc:'협공 피해량 +10%. 방어력의 30%만큼 공격력 증가(합산안됨).',
      set4StatFormulaNote:{statKey:'atk', label:'방어구 - 강격의 군주 4셋', text:'방어력의 30%만큼 공격력 증가'},
      pieces:{투구:{name:'강격의 군주 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'강격의 군주 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'강격의 군주 건틀릿',maxStar:6, pieceStat:'phys', pieceStars:{6:15}}, 신발:{name:'강격의 군주 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM19: {name:'금제의 무인', grade:'전설',
      weightClassOnly:'헤비',
      set2:{hp:{v:10,zone:'village'},critResDmg:{v:10,zone:'village'}}, set2desc:'최대 체력 +10%, 받는 치명타 피해량 -10%.',
      set4:{hp:{v:20,zone:'always'},def:{v:15,zone:'always'},res:{v:15,zone:'always'},physRes:{v:10,zone:'always'},magRes:{v:10,zone:'always'}}, set4desc:'최대 체력 +20%, 방어력/저항력 +15%, 물리/마법 관통 저항 +10%.',
      pieces:{투구:{name:'금제의 무인 망토',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'금제의 무인 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'금제의 무인 건틀릿',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 신발:{name:'금제의 무인 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM20: {name:'단죄의 심판자', grade:'전설',
      weightClassOnly:'헤비',
      set2:{hp:{v:10,zone:'village'}}, set2desc:'최대 체력 +10%, 반격 피해량 +15%.',
      set4:{hp:{v:10,zone:'always'}}, set4desc:'최대 체력 +10%(상시), 반격 피해량 +10%, 받는 피해 감소 +5%. 체력 50% 이하 시 받는 피해 추가 -10%(조건부).',
      pieces:{투구:{name:'단죄의 심판자 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'단죄의 심판자 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'단죄의 심판자 건틀릿',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 신발:{name:'단죄의 심판자 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM21: {name:'불멸의 정복자', grade:'전설',
      weightClassOnly:'헤비',
      set2:{phys:{v:10,zone:'village'},atk:{v:10,zone:'village'}}, set2desc:'물리 관통 +10%, 공격력 +10%.',
      set4:{hp:{v:10,zone:'always'},atk:{v:10,zone:'cond',cond:'공격 전/공격받기 전(저거넛, 최대 2중첩, 2턴 지속) — 표시값은 1스택 기준'},physRes:{v:5,zone:'cond',cond:'공격 전/공격받기 전(저거넛, 최대 2중첩, 2턴 지속) — 표시값은 1스택 기준'},magRes:{v:5,zone:'cond',cond:'공격 전/공격받기 전(저거넛, 최대 2중첩, 2턴 지속) — 표시값은 1스택 기준'}}, set4desc:'최대 체력 +10%(상시). 공격 전/공격받기 전 "저거넛" 획득: 공격력 +10%, 물리·마법 관통 저항 +5%(최대 2중첩, 2턴 지속, 해제불가 — 표시값은 1스택 기준).',
      pieces:{투구:{name:'불멸의 정복자 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'불멸의 정복자 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'불멸의 정복자 건틀릿',maxStar:6, pieceStat:'phys', pieceStars:{6:15}}, 신발:{name:'불멸의 정복자 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM22: {name:'선혈의 사신', grade:'전설',
      weightClassOnly:'헤비',
      set2:{def:{v:15,zone:'village'}}, set2desc:'방어력 +15%.',
      set4:{}, set4desc:'반격 피해량 +20%. 반격 후 다음 공격 피해량 +20%(조건부).',
      pieces:{투구:{name:'선혈의 사신 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'선혈의 사신 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'선혈의 사신 건틀릿',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 신발:{name:'선혈의 사신 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM23: {name:'역전의 지휘관', grade:'전설',
      weightClassOnly:'헤비',
      set2:{def:{v:13,zone:'village'},res:{v:13,zone:'village'}}, set2desc:'방어력/저항력 +13%.',
      set4:{healTake:{v:10,zone:'always'},shieldTake:{v:10,zone:'always'},atk:{v:10,zone:'cond',cond:'아군 스킬 대상이 되면(2턴 지속)'}}, set4desc:'받는 치유량 증가/받는 보호막 증가 +10%(상시). 아군 스킬 대상이 되면 2턴간 공격력 +10%.',
      pieces:{투구:{name:'역전의 지휘관 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'역전의 지휘관 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'역전의 지휘관 건틀릿',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 신발:{name:'역전의 지휘관 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
    ARM24: {name:'인내의 수호자', grade:'전설',
      weightClassOnly:'헤비',
      set2:{hp:{v:20,zone:'village'}}, set2desc:'최대 체력 +20%.',
      set4:{}, set4desc:'받는 피해량 감소 +5%. 피해를 받으면 2턴간 받는 피해 -5%(최대 2중첩).',
      pieces:{투구:{name:'인내의 수호자 투구',maxStar:6, pieceStat:'critResDmg', pieceStars:{6:10}}, 갑옷:{name:'인내의 수호자 갑옷',maxStar:6, pieceStat:'hp', pieceStars:{6:10}}, 장갑:{name:'인내의 수호자 건틀릿',maxStar:6, pieceStat:'phys', pieceStars:{6:15}}, 신발:{name:'인내의 수호자 부츠',maxStar:6, pieceStat:'critResChance', pieceStars:{6:10}}}
    },
  },

  // ── 악세사리 ────────────────────────────────────────────────────
  ACCESSORIES: {
    ACC01: {name:'검은 깃발', grade:'전설', maxStar:6, unique:true, starStats:{1:{atk:{v:10,zone:'village'},phys:{v:10,zone:'village'},critResChance:{v:5,zone:'village'}},2:{atk:{v:11,zone:'village'},phys:{v:11,zone:'village'},critResChance:{v:6,zone:'village'}},3:{atk:{v:12,zone:'village'},phys:{v:12,zone:'village'},critResChance:{v:7,zone:'village'}},4:{atk:{v:13,zone:'village'},phys:{v:13,zone:'village'},critResChance:{v:8,zone:'village'}},5:{atk:{v:14,zone:'village'},phys:{v:14,zone:'village'},critResChance:{v:9,zone:'village'}},6:{atk:{v:15,zone:'village'},phys:{v:15,zone:'village'},critResChance:{v:10,zone:'village'}}},
      skill:{desc:'전투 공격을 당하면 턴당 1회, 전투 후 "전투 적응"(받는 피해 -10%, 1턴 지속, 전투 후 해제) 획득(성급 무관 고정값). ★5부터: 다른 아군 플레이어가 사망하고 적보다 아군 수가 적으면 최대 체력 15%(★5)/25%(★6) 회복 + 디버프 1개(★5)/2개(★6) 해제(★6은 TP+1도, 쿨타임1, 추방 상태에서도 작동).',
        statByStar:{
          1:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}},
          2:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}},
          3:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}},
          4:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}},
          5:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}},
          6:{dmgReduction:{v:10,zone:'cond',cond:'전투 공격을 당한 후 "전투 적응" 획득(1턴 지속, 전투 후 해제, 턴당 1회)'}}
        }},
      desc:'흑태자가 다크 아머 군을 이끌고 진군할 때 사용된 깃발. 항상 맨 앞의 최전선에서 그 위용을 드러내었다.'},
    ACC02: {name:'고대 영웅의 반지', grade:'전설', maxStar:6, unique:false, starStats:{1:{atk:{v:10,zone:'village'},critResDmg:{v:10,zone:'village'}},2:{atk:{v:11,zone:'village'},critResDmg:{v:11,zone:'village'}},3:{atk:{v:12,zone:'village'},critResDmg:{v:12,zone:'village'}},4:{atk:{v:13,zone:'village'},critResDmg:{v:13,zone:'village'}},5:{atk:{v:14,zone:'village'},critResDmg:{v:14,zone:'village'}},6:{atk:{v:15,zone:'village'},critResDmg:{v:15,zone:'village'}}}, desc:'고대 영웅이 착용했다고 전해 내려오는 반지. 치명적인 피해로부터 회복시키는 힘을 가지고 있다고 전해진다. 일반 스킬: 턴당 1회 착용자가 치명타 피해를 받은 후 받은 피해의 25%(★1)~50%(★6)만큼 회복(스탯 아님).'},
    ACC03: {name:'고통의 가시', grade:'전설', maxStar:1, unique:false, starStats:{1:{critResChance:{v:10,zone:'village'}}}, desc:'끔찍한 고통에 휩싸인다고 하는 가시. 어떤 치유 주문을 받아도 고통이 쉽사리 가라앉지 않는다고 한다.'},
    ACC04: {name:'구원자의 서판', grade:'전설', maxStar:6, unique:false, tier:'상위', starStats:{1:{physRes:{v:10,zone:'village'},magRes:{v:10,zone:'village'}},2:{physRes:{v:11,zone:'village'},magRes:{v:11,zone:'village'}},3:{physRes:{v:12,zone:'village'},magRes:{v:12,zone:'village'}},4:{physRes:{v:13,zone:'village'},magRes:{v:13,zone:'village'}},5:{physRes:{v:14,zone:'village'},magRes:{v:14,zone:'village'}},6:{physRes:{v:15,zone:'village'},magRes:{v:15,zone:'village'}}}, skill:{desc:'"적을 공격하거나 공격받은 후" 전투 단련: 방어력/저항력 +10%(★1)~+20%(★6), 2턴 지속, 해제불가. (동시에 적에게 갑주 균열 부여 — 적 디버프)', statByStar:{1:{def:{v:10,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:10,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}},2:{def:{v:12,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:12,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}},3:{def:{v:14,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:14,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}},4:{def:{v:16,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:16,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}},5:{def:{v:18,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:18,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}},6:{def:{v:20,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'},res:{v:20,zone:'cond',cond:'적을 공격하거나 공격받은 후(전투 단련, 2턴, 해제불가)'}}}}, desc:'인류를 구한 자들이 남긴 서판.'},
    ACC05: {name:'균형의 칼날 목걸이', grade:'전설', maxStar:6, unique:false, starStats:{1:{crit:{v:15,zone:'village'},critDmg:{v:-30,zone:'village'}},2:{crit:{v:18,zone:'village'},critDmg:{v:-32,zone:'village'}},3:{crit:{v:21,zone:'village'},critDmg:{v:-34,zone:'village'}},4:{crit:{v:24,zone:'village'},critDmg:{v:-36,zone:'village'}},5:{crit:{v:27,zone:'village'},critDmg:{v:-38,zone:'village'}},6:{crit:{v:30,zone:'village'},critDmg:{v:-40,zone:'village'}}}, skill:{desc:'전투 후 "공격력 증가"(3턴 지속, 최대 2중첩) 획득: 스택당 공격력 +5%(★1)~+10%(★6). 표시값은 1스택 기준(최대 2중첩, 배수 여부 미확인이라 미반영).', statByStar:{1:{atk:{v:5,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}},2:{atk:{v:6,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}},3:{atk:{v:7,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}},4:{atk:{v:8,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}},5:{atk:{v:9,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}},6:{atk:{v:10,zone:'cond',cond:'전투 후(공격력 증가, 3턴, 최대 2중첩 — 표시값은 1스택 기준)'}}}}, desc:'치명상은 입히되 죽이지는 않는다는 신조를 가진 실력가가 애용했다는 소문이 있는 목걸이.'},
    ACC06: {name:'댄싱퀸', grade:'전설', maxStar:1, unique:false, tier:'상위', starStats:{1:{crit:{v:10,zone:'village'}}}, desc:'팬드래건 왕국에서 특별 주문된 채찍을 본떠 만든 장신구. 스킬은 적 치명타 피해량 증가(적 디버프, 무관).'},
    ACC07: {name:'루시퍼의 깃털', grade:'전설', maxStar:6, unique:true, starStats:{1:{critDmg:{v:10,zone:'village'},crit:{v:10,zone:'village'},hp:{v:5,zone:'village'}},2:{critDmg:{v:11,zone:'village'},crit:{v:11,zone:'village'},hp:{v:6,zone:'village'}},3:{critDmg:{v:12,zone:'village'},crit:{v:12,zone:'village'},hp:{v:7,zone:'village'}},4:{critDmg:{v:13,zone:'village'},crit:{v:13,zone:'village'},hp:{v:8,zone:'village'}},5:{critDmg:{v:14,zone:'village'},crit:{v:14,zone:'village'},hp:{v:9,zone:'village'}},6:{critDmg:{v:15,zone:'village'},crit:{v:15,zone:'village'},hp:{v:10,zone:'village'}}}, skill:{desc:'"비공격 스킬 시전 시 치명타 확률과 동일한 확률로" 천사장의 축복: 공격력/주문력/방어력/저항력/물리관통저항/마법관통저항 +10%(★1)~+15%(★6), 2턴, 해제불가. (고성급에서 "집중"/"천사장의 구원" 추가 — 스탯 아님)', statByStar:{1:{atk:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:10,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}},2:{atk:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:11,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}},3:{atk:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:12,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}},4:{atk:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:13,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}},5:{atk:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:14,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}},6:{atk:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},mag:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},def:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},res:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},physRes:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'},magRes:{v:15,zone:'cond',cond:'비공격 스킬 시전 시 치명타 확률과 동일한 확률로(천사장의 축복)'}}}}, desc:'먼 과거에 존재했던 한 천사의 깃털. 천사장의 힘이 담긴 특별한 깃털이다.'},
    ACC08: {name:'메아리의 보석', grade:'전설', maxStar:6, unique:false, starStats:{1:{},2:{},3:{},4:{},5:{},6:{}}, skill:{desc:'아군 턴 시작 시 "헌신의 메아리" 없으면 획득(해제 후 3턴(★1)~2턴(★6) 재획득 불가): 치유량 +10%(★1)~+15%(★6). 침묵 면역류 부수 효과 있음.', statByStar:{1:{healGive:{v:10,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}},2:{healGive:{v:11,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}},3:{healGive:{v:12,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}},4:{healGive:{v:13,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}},5:{healGive:{v:14,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}},6:{healGive:{v:15,zone:'cond',cond:'아군 턴 시작 시 헌신의 메아리 미보유 시 획득(해제 후 재획득 대기)'}}}}, desc:'헌신의 메아리가 담겨있다고 전해지는 보석.'},
    ACC09: {name:'무사의 호패', grade:'전설', maxStar:6, unique:false, tier:'상위', starStats:{1:{atk:{v:5,zone:'village'},def:{v:5,zone:'village'},res:{v:5,zone:'village'}},2:{atk:{v:6,zone:'village'},def:{v:6,zone:'village'},res:{v:6,zone:'village'}},3:{atk:{v:7,zone:'village'},def:{v:7,zone:'village'},res:{v:7,zone:'village'}},4:{atk:{v:8,zone:'village'},def:{v:8,zone:'village'},res:{v:8,zone:'village'}},5:{atk:{v:9,zone:'village'},def:{v:9,zone:'village'},res:{v:9,zone:'village'}},6:{atk:{v:10,zone:'village'},def:{v:10,zone:'village'},res:{v:10,zone:'village'}}}, desc:'강호의 무인이라면 반드시 지녀야 할 패. 전투 전 적에게 "갑주 균열"(방어력/저항력 -10%(★1)~-20%(★6), 성급별) 부여 — 적 디버프라 위 스탯과 무관.'},
    ACC10: {name:'무효화 목걸이', grade:'전설', maxStar:6, unique:false, starStats:{1:{def:{v:3,zone:'village'},res:{v:3,zone:'village'}},2:{def:{v:4,zone:'village'},res:{v:4,zone:'village'}},3:{def:{v:5,zone:'village'},res:{v:5,zone:'village'}},4:{def:{v:6,zone:'village'},res:{v:6,zone:'village'}},5:{def:{v:7,zone:'village'},res:{v:7,zone:'village'}},6:{def:{v:8,zone:'village'},res:{v:8,zone:'village'}}}, desc:'턴 종료 시 자신에게 걸린 임의의 디버프를 1개(★1~5)~2개(★6) 해제하는 목걸이(쿨타임 2턴, 스탯 아님).'},
    ACC11: {name:'사수의 마탄', grade:'전설', maxStar:6, unique:false, starStats:{1:{},2:{},3:{},4:{},5:{},6:{}},
      desc:'상시 능력치는 없음 — 효과는 전부 아래 "사수의 집념"(조건부)에 있습니다.',
      skill:{desc:'"전투 공격 전 50% 확률로" 사수의 집념: 물리 관통 +20%(★1)~+25%(★6). 조건부라 항상 조건부 합계에 자동 반영.',
        statByStar:{1:{phys:{v:20,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}},2:{phys:{v:21,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}},3:{phys:{v:22,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}},4:{phys:{v:23,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}},5:{phys:{v:24,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}},6:{phys:{v:25,zone:'cond',cond:'전투 공격 전(50% 확률, 사수의 집념)'}}}}},
    ACC12: {name:'속죄자의 머리끈', grade:'전설', maxStar:6, unique:false, tier:'상위', starStats:{1:{},2:{},3:{},4:{},5:{},6:{}}, skill:{desc:'"결투 효과를 가지고 있는 적을 공격하여" 전투 시 치명타 피해량 +10%(★1)~+15%(★6). (★6에서 해당 적이 생존 시 "응수" 추가 획득)', statByStar:{1:{critDmg:{v:10,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}},2:{critDmg:{v:11,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}},3:{critDmg:{v:12,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}},4:{critDmg:{v:13,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}},5:{critDmg:{v:14,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}},6:{critDmg:{v:15,zone:'cond',cond:'결투 효과를 가진 적을 공격 시(전투 중)'}}}}, desc:'결투 효과를 가진 적을 공격 시 발동하는 장신구.'},
    ACC13: {name:'수호 부적', grade:'전설', maxStar:6, unique:false, starStats:{1:{critResChance:{v:10,zone:'village'}},2:{critResChance:{v:11,zone:'village'}},3:{critResChance:{v:12,zone:'village'}},4:{critResChance:{v:13,zone:'village'}},5:{critResChance:{v:14,zone:'village'}},6:{critResChance:{v:15,zone:'village'}}}, skill:{desc:'"적에게 공격받을 시"(쿨타임 1턴) 수호의 힘: 공격력/방어력/저항력 +10%(★1)~+20%(★6), 2턴, 해제불가.', statByStar:{1:{atk:{v:10,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:10,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:10,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}},2:{atk:{v:12,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:12,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:12,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}},3:{atk:{v:14,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:14,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:14,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}},4:{atk:{v:16,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:16,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:16,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}},5:{atk:{v:18,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:18,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:18,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}},6:{atk:{v:20,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},def:{v:20,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'},res:{v:20,zone:'cond',cond:'적에게 공격받을 시(쿨1, 수호의 힘)'}}}}, desc:'어떤 충격에도 굴하지 않는 강인함이 느껴지는 장신구.'},
    ACC14: {name:'시간 나침반', grade:'전설', maxStar:6, unique:true, starStats:{1:{atk:{v:10,zone:'village'},crit:{v:5,zone:'village'},critResChance:{v:5,zone:'village'}},2:{atk:{v:11,zone:'village'},crit:{v:6,zone:'village'},critResChance:{v:6,zone:'village'}},3:{atk:{v:12,zone:'village'},crit:{v:7,zone:'village'},critResChance:{v:7,zone:'village'}},4:{atk:{v:13,zone:'village'},crit:{v:8,zone:'village'},critResChance:{v:8,zone:'village'}},5:{atk:{v:14,zone:'village'},crit:{v:9,zone:'village'},critResChance:{v:9,zone:'village'}},6:{atk:{v:15,zone:'village'},crit:{v:10,zone:'village'},critResChance:{v:10,zone:'village'}}}, desc:'유니크. 시간의 위치를 가리키는 나침반. 원거리 공격 시 적에게 지연회로(치유방해) 부여.'},
    ACC15: {name:'여신의 축복', grade:'전설', maxStar:6, unique:false, starStats:{1:{crit:{v:10,zone:'village'}},2:{crit:{v:11,zone:'village'}},3:{crit:{v:12,zone:'village'}},4:{crit:{v:13,zone:'village'}},5:{crit:{v:14,zone:'village'}},6:{crit:{v:15,zone:'village'}}}, desc:'성스러운 빛이 감도는 신비한 거울. 단일 스킬로 아군에게 이로운 효과 부여 시 치명타 확률과 동일한 확률로 대상을 주문력의 30%(★1)~50%(★6) 만큼 치유 — 회복%는 위 표와 무관.'},
    ACC16: {name:'옥 노리개', grade:'전설', maxStar:1, unique:false, tier:'상위', starStats:{1:{mag:{v:5,zone:'village'},critResDmg:{v:5,zone:'village'}}}, skill:{desc:'스킬/공격 사용 후 20% 확률로 "비취의 마력" 획득(최대 3중첩): 주문력/마법관통저항 +2.5%씩. 아래는 최대 3중첩(풀스택) 기준 값.', statByStar:{1:{mag:{v:7.5,zone:'cond',cond:'스킬/공격 사용 후 20% 확률 트리거, 최대 3중첩(비취의 마력) — 표시값은 풀스택 기준'},magRes:{v:7.5,zone:'cond',cond:'스킬/공격 사용 후 20% 확률 트리거, 최대 3중첩(비취의 마력) — 표시값은 풀스택 기준'}}}}, desc:'세대를 거쳐 전해진 옥 노리개.'},
    ACC17: {name:'용 비늘 각반', grade:'전설', maxStar:6, unique:false,
      starStats:{
        1:{def:{v:25,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +20%)'}, res:{v:25,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +20%)'}},
        2:{def:{v:30,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +21%)'}, res:{v:30,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +21%)'}},
        3:{def:{v:35,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +22%)'}, res:{v:35,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +22%)'}},
        4:{def:{v:40,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +23%)'}, res:{v:40,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +23%)'}},
        5:{def:{v:45,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +24%)'}, res:{v:45,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +24%)'}},
        6:{def:{v:50,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +25%)'}, res:{v:50,zone:'cond',cond:'체력 35% 이하일 때(체력 90%이하~35%초과 구간에서는 +25%)'}}
      },
      desc:'체력 90%이하~35%초과 구간이면 방어력/저항력 +20%(★1)~+25%(★6), 체력 35% 이하 구간이면 +25%(★1)~+50%(★6) — 두 구간은 상호 배타적(택1)이며, 표에는 더 높은 값(체력 35% 이하 구간) 기준으로 반영했습니다. 체력 90% 초과 시엔 효과 없음.'},
    ACC18: {name:'저주의 눈동자', grade:'전설', maxStar:1, unique:false, starStats:{1:{}}, desc:'전투 전 적에게 약화의 저주(공/주문력 감소) 부여. 위 스탯과 무관.'},
    ACC19: {name:'지명 수배서', grade:'전설', maxStar:6, unique:false, starStats:{1:{crit:{v:5,zone:'village'}},2:{crit:{v:6,zone:'village'}},3:{crit:{v:7,zone:'village'}},4:{crit:{v:8,zone:'village'}},5:{crit:{v:9,zone:'village'}},6:{crit:{v:10,zone:'village'}}},
      skill:{desc:'근접 전투 공격 후 치명타 시 적에게 암살예고(받는피해+5~10%, 성급별) 부여 — 자신의 주는 피해 증가로 환산 반영.',
        statByStar:{
          1:{dmgIncrease:{v:5,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}},
          2:{dmgIncrease:{v:6,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}},
          3:{dmgIncrease:{v:7,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}},
          4:{dmgIncrease:{v:8,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}},
          5:{dmgIncrease:{v:9,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}},
          6:{dmgIncrease:{v:10,zone:'cond',cond:'근접 전투 공격 후 치명타 시 대상에게 "암살예고" 부여'}}
        }},
      desc:'근접 전투 공격 후 치명타 시 적에게 암살예고(받는피해+5~10%) 부여.'},
    ACC20: {name:'창세전쟁의 비록', grade:'전설', maxStar:6, unique:true, starStats:{1:{phys:{v:10,zone:'village'},hp:{v:5,zone:'village'},shieldTake:{v:10,zone:'village'}},2:{phys:{v:11,zone:'village'},hp:{v:6,zone:'village'},shieldTake:{v:13,zone:'village'}},3:{phys:{v:12,zone:'village'},hp:{v:7,zone:'village'},shieldTake:{v:16,zone:'village'}},4:{phys:{v:13,zone:'village'},hp:{v:8,zone:'village'},shieldTake:{v:19,zone:'village'}},5:{phys:{v:14,zone:'village'},hp:{v:9,zone:'village'},shieldTake:{v:22,zone:'village'}},6:{phys:{v:15,zone:'village'},hp:{v:10,zone:'village'},shieldTake:{v:25,zone:'village'}}}, skill:{desc:'보호막 획득 시 영웅심: 공격력/방어력/저항력 +10%(★1)~+15%(★6), 2턴(★1)~3턴(★6), 해제불가. (★6에서 치명타 피격 시 "간이 보호막" 추가)', statByStar:{1:{atk:{v:10,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:10,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:10,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}},2:{atk:{v:11,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:11,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:11,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}},3:{atk:{v:12,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:12,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:12,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}},4:{atk:{v:13,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:13,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:13,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}},5:{atk:{v:14,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:14,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:14,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}},6:{atk:{v:15,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},def:{v:15,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'},res:{v:15,zone:'cond',cond:'보호막 획득 시(영웅심, 해제불가)'}}}}, desc:'유니크. 시라노 번스타인이 역사를 연구하기 위해 참고한 책.'},
    ACC21: {name:'초시계', grade:'전설', maxStar:6, unique:false, starStats:{1:{atk:{v:3,zone:'village'},mag:{v:3,zone:'village'},critResChance:{v:5,zone:'village'}},2:{atk:{v:4,zone:'village'},mag:{v:4,zone:'village'},critResChance:{v:7,zone:'village'}},3:{atk:{v:5,zone:'village'},mag:{v:5,zone:'village'},critResChance:{v:9,zone:'village'}},4:{atk:{v:6,zone:'village'},mag:{v:6,zone:'village'},critResChance:{v:11,zone:'village'}},5:{atk:{v:7,zone:'village'},mag:{v:7,zone:'village'},critResChance:{v:13,zone:'village'}},6:{atk:{v:8,zone:'village'},mag:{v:8,zone:'village'},critResChance:{v:15,zone:'village'}}}, desc:'스킬 사용 후 확률로 해당 스킬의 재사용 대기시간 1턴 감소(쿨타임 2턴) — 확률: ★1~3 20% / ★4~6 30%. 확률형이라 위 스탯과 무관.'},
    ACC22: {name:'치유 향로', grade:'전설', maxStar:6, unique:false, starStats:{1:{},2:{},3:{},4:{},5:{},6:{}}, desc:'전투 후 체력 50% 이하면 최대 체력의 10%(★1)~20%(★6) 회복(쿨타임 1턴) — 회복%는 위 표와 무관.'},
    ACC23: {name:'톱날 화살촉', grade:'전설', maxStar:6, unique:false, starStats:{1:{},2:{},3:{},4:{},5:{},6:{}}, skill:{desc:'전투 중 상시 치명타 피해량 +10%(★1)~+20%(★6). "전투 중" 지속 효과라 상시(인게임)로 계산.', statByStar:{1:{critDmg:{v:10,zone:'always'}},2:{critDmg:{v:12,zone:'always'}},3:{critDmg:{v:14,zone:'always'}},4:{critDmg:{v:16,zone:'always'}},5:{critDmg:{v:18,zone:'always'}},6:{critDmg:{v:20,zone:'always'}}}}, desc:'화살에 매달아 쏘면 살을 파고든다고 하는 화살촉.'},
    ACC24: {name:'파이어 크레스트', grade:'전설', maxStar:6, unique:false, starStats:{1:{crit:{v:5,zone:'village'}},2:{crit:{v:6,zone:'village'}},3:{crit:{v:7,zone:'village'}},4:{crit:{v:8,zone:'village'}},5:{crit:{v:9,zone:'village'}},6:{crit:{v:10,zone:'village'}}}, desc:'유황 동굴의 열기가 응축된 보석. 스킬 치명타 시 적에게 작열통 부여(적 디버프).'},
    ACC25: {name:'패자의 왕관', grade:'전설', maxStar:1, unique:false, tier:'상위', starStats:{1:{atk:{v:5,zone:'village'},def:{v:5,zone:'village'},res:{v:5,zone:'village'}}}, desc:'팬드래곤 왕가의 삼신기 중 하나.'},
    ACC26: {name:'하이퍼 봄버', grade:'전설', maxStar:1, unique:false, tier:'상위', starStats:{1:{atk:{v:5,zone:'village'},hp:{v:5,zone:'village'}}}, desc:'강력한 폭탄 모양을 본뜬 장신구(모형).'},
    ACC27: {name:'현자의 서', grade:'전설', maxStar:6, unique:false, starStats:{1:{mag:{v:5,zone:'village'}},2:{mag:{v:6,zone:'village'}},3:{mag:{v:7,zone:'village'}},4:{mag:{v:8,zone:'village'}},5:{mag:{v:9,zone:'village'}},6:{mag:{v:10,zone:'village'}}},
      skill:{desc:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식"(받는 피해 +3%(★1~2)/+4%(★3~4)/+5%(★5~6), 2턴 지속, 최대 2중첩 — 표는 1중첩 기준) 부여 — 자신의 주는 피해 증가로 환산 반영.',
        statByStar:{
          1:{dmgIncrease:{v:3,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}},
          2:{dmgIncrease:{v:3,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}},
          3:{dmgIncrease:{v:4,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}},
          4:{dmgIncrease:{v:4,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}},
          5:{dmgIncrease:{v:5,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}},
          6:{dmgIncrease:{v:5,zone:'cond',cond:'마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식" 부여(2턴 지속, 최대 2중첩 — 1중첩 기준)'}}
        }},
      desc:'억겁의 시간이 흐른 고대 지식의 정수. 마법 피해를 주는 스킬 시전 후 대상에게 "진리의 잠식"(받는 피해 +3%(★1~2)/+4%(★3~4)/+5%(★5~6), 2턴 지속, 최대 2중첩) 부여.'},
    ACC28: {name:'호크 아이', grade:'전설', maxStar:6, unique:false, starStats:{1:{crit:{v:10,zone:'village'}},2:{crit:{v:11,zone:'village'}},3:{crit:{v:12,zone:'village'}},4:{crit:{v:13,zone:'village'}},5:{crit:{v:14,zone:'village'}},6:{crit:{v:15,zone:'village'}}}, desc:'하늘에 도전한 매의 투지가 담긴 장신구. 공격 시 적이 징표/노출 징표/노출/쇠약/행동제어 효과를 받고 있다면 대상이 받는 치명타 피해량 +10%(★1)~+15%(★6) — 적 디버프라 위 스탯과 무관.'},
    ACC29: {name:'회색기사단의 증표', grade:'전설', maxStar:1, unique:false, tier:'상위', starStats:{1:{atk:{v:5,zone:'village'},phys:{v:5,zone:'village'}}}, desc:'과거 대륙을 구한 회색기사단의 단원임을 나타내는 증표.'},
    ACC30: {name:'강철 각반', grade:'영웅', maxStar:6, unique:false, starStats:{1:{def:{v:20,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +10%)'},res:{v:20,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +10%)'}},2:{def:{v:22,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +11%)'},res:{v:22,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +11%)'}},3:{def:{v:24,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +12%)'},res:{v:24,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +12%)'}},4:{def:{v:26,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +13%)'},res:{v:26,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +13%)'}},5:{def:{v:28,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +14%)'},res:{v:28,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +14%)'}},6:{def:{v:30,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +15%)'},res:{v:30,zone:'cond',cond:'체력 35% 이하일 때(35%초과~90%이하 구간은 +15%)'}}}, desc:'철판을 덧대 만든 각반. 체력 90% 이하~35% 초과 구간이면 방어력/저항력 +10%(★1)~+15%(★6), 체력 35% 이하 구간이면 +20%(★1)~+30%(★6) — 두 구간은 상호 배타적(택1)이며, 표에는 더 높은 값(체력 35% 이하 구간) 기준으로 반영했습니다.'},
    ACC31: {name:'검은 주사위', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{def:{v:8,zone:'village'}}}, desc:'이름 모를 도박사의 시체에서 나왔다고 전해지는 불길한 느낌의 주사위. 방어력 +8%(상시). 적에게 공격받기 전 받는 치명타 확률에 "불운" 적용(치명타 확률을 2번 체크해서 2번 다 성공해야 치명타로 적용 — 확률 재판정 메커닉이라 이 계산기의 스탯 합계에는 포함되지 않습니다).'},
    ACC32: {name:'균열 생성기', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, desc:'시대를 초월한 물건처럼 느껴지는 기묘한 형태의 오파츠. 근접 전투 후 적에게 피해를 입히면 "방어구 균열"(적 디버프: 방어력/저항력 -10%, 2턴 지속, 최대 2중첩) 부여 — 적 디버프(방어력/저항력 감소)라 위 스탯과 무관.'},
    ACC33: {name:'깃털 장식', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, skill:{desc:'행동 종료 시 30% 확률로 "순풍"(이동력 +2, 1턴 지속) 획득.', statByStar:{6:{move:{v:2,zone:'cond',cond:'행동 종료 시 30% 확률로 "순풍" 획득(1턴 지속)'}}}}, desc:'깃털로 만들어진 장식으로 몸을 가볍게 만드는 주술 부적. 행동 종료 시 30% 확률로 "순풍"(이동력 +2, 1턴) 획득.'},
    ACC34: {name:'네크로노미콘', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{mag:{v:10,zone:'village'}}}, desc:'죽음의 경계에 다녀온 사람이 썼다고 전해지는 음산한 느낌의 책. 소환수 레벨 +5, 주문력 +10%(상시). 소환수 레벨 강화는 소환수 자체 스탯이라 위 표와 무관.'},
    ACC35: {name:'늑대 송곳니 목걸이', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, skill:{desc:'착용자가 전투 공격 전 100% 확률로 2턴 동안 "꿰뚫기"(물리 관통 +20%) 획득(쿨타임 2턴).', statByStar:{6:{phys:{v:20,zone:'cond',cond:'전투 공격 전 100% 확률로 "꿰뚫기" 획득(2턴 지속, 쿨타임 2턴)'}}}}, desc:'우두머리 늑대의 송곳니로 만들었다고 전해지는 야만족 목걸이. 착용자가 전투 공격 전 100% 확률로 2턴간 물리 관통 +20%(쿨타임 2턴).'},
    ACC36: {name:'분열의 목걸이', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{critResChance:{v:10,zone:'village'}}}, desc:'두 사람의 사이를 멀어지게 만드는 목걸이. 받는 치명타 확률 -10%(상시). 협공을 받지 않을 확률 +50%(협공 회피 메커닉).'},
    ACC37: {name:'상처 악화의 부적', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{atk:{v:8,zone:'village'},critResChance:{v:10,zone:'village'}}}, desc:'깊은 원한에 의해 쓰인 부정한 기운의 부적. 공격력 +8%, 받는 치명타 확률 -10%(둘 다 상시). 근접 전투 후 적에게 피해를 입히면 "치유 감소"(적 디버프: 받는 치유 -50%, 2턴, 치유방해) 부여 — 적 디버프라 위 스탯과 무관.'},
    ACC38: {name:'선도자 메달', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{healTake:{v:10,zone:'village'},shieldTake:{v:12,zone:'village'}}}, desc:'자신만의 길을 닦아온 선도자들에게 주어지는 메달. 받는 치유량 증가 +10%, 받는 보호막 증가 +12%(둘 다 상시).'},
    ACC39: {name:'수호의 반지', grade:'영웅', maxStar:6, unique:false, starStats:{1:{def:{v:20,zone:'cond',cond:'체력 100%일 때'}},2:{def:{v:22,zone:'cond',cond:'체력 100%일 때'}},3:{def:{v:24,zone:'cond',cond:'체력 100%일 때'}},4:{def:{v:26,zone:'cond',cond:'체력 100%일 때'}},5:{def:{v:28,zone:'cond',cond:'체력 100%일 때'}},6:{def:{v:30,zone:'cond',cond:'체력 100%일 때'}}}, desc:'수호의 힘이 깃든 반지. 체력 100%일 때 방어력 +20%(★1)~+30%(★6).'},
    ACC40: {name:'암살자의 메달', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, skill:{desc:'근접 전투 공격 후 치명타가 발동했을 경우, 2턴 동안 대상에게 "암살 예고"(받는 피해량 +10%) 부여.', statByStar:{6:{dmgIncrease:{v:10,zone:'cond',cond:'근접 전투 공격 후 치명타 발동 시 대상에게 "암살 예고 6"(받는 피해량 +10%) 부여, 2턴 지속'}}}}, desc:'수준 높은 암살자들이 지니고 다닌다는 메달. 근접 전투 공격 후 치명타 발동 시 대상이 받는 피해량 +10%(2턴).'},
    ACC41: {name:'얼음 결정', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, desc:'물의 기운을 받았다고 전해지는 광석. 단일 스킬로 적에게 피해를 입힐 경우 50% 확률로 "추위"(적 디버프: 이동력-1, 행동제어) 부여, 2중첩 시 "허약"(적 디버프: 공격력/주문력 -10%)으로 전환 — 전부 적 디버프라 위 스탯과 무관.'},
    ACC42: {name:'장막의 망토', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{res:{v:7,zone:'village'}}}, skill:{desc:'피해를 받은 후 체력이 35%라면 1턴간 "보호의 장막"(받는 피해 -10%, 엄폐) 발동(쿨타임 3턴).', statByStar:{6:{dmgReduction:{v:10,zone:'cond',cond:'피해를 받은 후 체력이 35%일 때 "보호의 장막" 발동(1턴 지속, 쿨타임 3턴)'}}}}, desc:'몸을 숨길 수 있는 칠흑의 망토. 저항력 +7%(상시). 피해를 받은 후 체력 35%라면 1턴간 받는 피해 -10%+엄폐(치명타 방지, 지향성 공격 받는 피해 -50%).'},
    ACC43: {name:'전도성 결정', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, desc:'번개의 기운을 받았다고 전해지는 광석. 범위 스킬로 적에게 피해를 입힐 경우 20% 확률로 "감전 경직"(적 디버프: 반격 불가) 부여, 2중첩 시 "기절"(적 디버프)로 전환 — 전부 적 디버프라 위 스탯과 무관.'},
    ACC44: {name:'헌신의 성배', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}},
      skill:{desc:'치유 스킬 시전 시 "헌신"(치유량 증가 +10%, 2턴 지속, 최대 2중첩) 획득 — 표시값은 풀스택(2중첩) 기준.',
        statByStar:{6:{healGive:{v:20,zone:'cond',cond:'치유 스킬 시전 시 "헌신" 획득(2턴 지속, 최대 2중첩) — 표시값은 풀스택(2중첩) 기준'}}}},
      desc:'평생을 신을 위해 몸을 바친 사람들이 모인 수도원에 모셔진 성배. 치유 스킬 시전 시 "헌신"(치유량 증가 +10%, 2턴, 최대 2중첩) 획득.'},
    ACC45: {name:'화염 결정', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{}}, skill:{desc:'스킬로 적에게 치명타를 입힐 경우 3턴간 "그을림" 부여, 2중첩 시 "작열통"(받는 피해량 +10%, 2턴)으로 전환.', statByStar:{6:{dmgIncrease:{v:10,zone:'cond',cond:'스킬 치명타로 "그을림" 2중첩을 쌓아 "작열통" 전환 시(2턴 지속)'}}}}, desc:'불의 기운을 받았다고 전해지는 광석. 스킬로 적에게 치명타를 입힐 경우 3턴간 "그을림"(적 디버프: 받는 치유량 -35%, 이 계산기가 추적하지 않는 회복 계열이라 미반영) 부여, 2중첩 시 "작열통"(적 디버프: 받는 피해량 +10%, 2턴)으로 전환 — 받는 피해량 증가는 주는 피해 증가로 환산해 반영.'},
    ACC46: {name:'황금 사과 머리핀', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{critResDmg:{v:15,zone:'village'}}}, desc:'황금 사과 장식이 달린 머리핀. 받는 치명타 피해량 -15%(상시). 게임 중 1회 피해를 받아 체력이 35% 이하로 내려가면 최대 체력의 20% 회복(1회성 회복).'},
    ACC47: {name:'황금 주사위', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{res:{v:8,zone:'village'}}}, desc:'도박사들이 행운의 징표처럼 가지고 다닌다는 황금빛 주사위. 저항력 +8%(상시). 착용자의 치명타 확률에 "행운" 적용(치명타 확률을 2번 체크해서 1번만 성공해도 치명타로 적용 — 확률 재판정 메커닉이라 이 계산기의 스탯 합계에는 포함되지 않습니다).'},
    ACC48: {name:'휴대용 숫돌', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{atk:{v:10,zone:'village'},extraHitDmgIncrease:{v:40,zone:'village'}}}, desc:'구하기 매우 힘든 값비싼 숫돌. 공격력 +10%, 추가타 피해량 +40%(둘 다 상시, 조건 없음).'},
    ACC49: {name:'흑요석 반지', grade:'영웅', maxStar:6, fixedStar:true, unique:false, starStats:{6:{critResChance:{v:10,zone:'village'}}}, desc:'흑요석 안에 어둠의 힘이 담겨 있다고 전해지는 반지. 받는 치명타 확률 -10%(상시). 40% 확률로 침묵 효과 무시(확률 메커닉).'}
  },

  // ── 룬 ─────────────────────────────────────────────────────────
  RUNES: {
    RUNE01: {name:'궁극', grade:'기본룬', slots:{1:[{k:'def',v:35,pct:false}],2:[{k:'def',v:25,pct:true}],3:[{k:'hp',v:272,pct:false}],4:[{k:'hp',v:5,pct:true}],5:[{k:'shieldTake',v:9,pct:true},{k:'healTake',v:9,pct:true}],6:[{k:'res',v:25,pct:true}]}, setEffect:[{k:'hp',v:2,pct:true}]},
    RUNE02: {name:'태양', grade:'기본룬', slots:{1:[{k:'crit',v:7.5,pct:true}],2:[{k:'atk',v:5,pct:true}],3:[{k:'critResDmg',v:18,pct:true}],4:[{k:'critResChance',v:7.2,pct:true}],5:[{k:'hp',v:5,pct:true}],6:[{k:'skillDmgIncrease',v:1.8,pct:true}]}, setEffect:[{k:'critResDmg',v:7.2,pct:true}]},
    RUNE03: {name:'바람', grade:'기본룬', slots:{1:[{k:'phys',v:15,pct:true}],2:[{k:'phys',v:7.5,pct:true}],3:[{k:'hp',v:136,pct:false}],4:[{k:'hp',v:5,pct:true}],5:[{k:'basicAtkDmgIncrease',v:6,pct:true}],6:[{k:'skillDmgIncrease',v:1.8,pct:true}]}, setEffect:[{k:'phys',v:3,pct:true}]},
    RUNE04: {name:'자비', grade:'기본룬', slots:{1:[{k:'def',v:35,pct:false}],2:[{k:'def',v:25,pct:true}],3:[{k:'hp',v:136,pct:false}],4:[{k:'hp',v:5,pct:true}],5:[{k:'shieldGive',v:9,pct:true},{k:'healGive',v:9,pct:true}],6:[{k:'mag',v:50,pct:false}]}, setEffect:[{k:'healGive',v:1.5,pct:true},{k:'shieldGive',v:1.5,pct:true}]},
    RUNE05: {name:'번개', grade:'기본룬', slots:{1:[{k:'magPen',v:7.5,pct:true}],2:[{k:'aoeDmgIncrease',v:4.5,pct:true}],3:[{k:'hp',v:136,pct:false}],4:[{k:'hp',v:5,pct:true}],5:[{k:'mag',v:10,pct:true}],6:[{k:'mag',v:50,pct:false}]}, setEffect:[{k:'mag',v:2,pct:true}]},
    RUNE06: {name:'대지', grade:'기본룬', slots:{1:[{k:'def',v:70,pct:false}],2:[{k:'def',v:25,pct:true}],3:[{k:'def',v:35,pct:false}],4:[{k:'dmgReduction',v:3,pct:true}],5:[{k:'res',v:70,pct:false}],6:[{k:'res',v:25,pct:true}]}, setEffect:[{k:'def',v:5,pct:true},{k:'res',v:5,pct:true}]},
    RUNE07: {name:'혼돈', grade:'기본룬', slots:{1:[{k:'atk',v:10,pct:true}],2:[{k:'atk',v:80,pct:false}],3:[{k:'hp',v:136,pct:false}],4:[{k:'hp',v:5,pct:true}],5:[{k:'skillDmgIncrease',v:3,pct:true}],6:[{k:'hp',v:3,pct:true}]}, setEffect:[{k:'atk',v:2,pct:true}]},
    RUNE08: {name:'음모', grade:'기본룬', slots:{1:[{k:'crit',v:7.5,pct:true}],2:[{k:'crit',v:3.75,pct:true}],3:[{k:'def',v:25,pct:true}],4:[{k:'res',v:25,pct:true}],5:[{k:'hp',v:136,pct:false}],6:[{k:'hp',v:5,pct:true}]}, setEffect:[{k:'crit',v:1.5,pct:true}]},
    RUNE09: {name:'달', grade:'기본룬', slots:{1:[{k:'magPen',v:15,pct:true}],2:[{k:'aoeDmgIncrease',v:4.5,pct:true}],3:[{k:'critResDmg',v:9,pct:true}],4:[{k:'critResDmg',v:9,pct:true}],5:[{k:'mag',v:3,pct:true}],6:[{k:'mag',v:30,pct:false}]}, setEffect:[{k:'magPen',v:3,pct:true}]},
    RUNE10: {name:'구름', grade:'기본룬', slots:{1:[{k:'magPen',v:15,pct:true}],2:[{k:'aoeDmgIncrease',v:4.5,pct:true}],3:[{k:'critResChance',v:9,pct:true}],4:[{k:'critResDmg',v:14.4,pct:true}],5:[{k:'mag',v:10,pct:true}],6:[{k:'mag',v:50,pct:false}]}, setEffect:[{k:'critResDmg',v:3.6,pct:true}]},
    RUNE11: {name:'죽음', grade:'기본룬', slots:{1:[{k:'critDmg',v:9,pct:true}],2:[{k:'critDmg',v:4.5,pct:true}],3:[{k:'def',v:25,pct:true}],4:[{k:'res',v:25,pct:true}],5:[{k:'hp',v:136,pct:false}],6:[{k:'basicAtkDmgIncrease',v:6,pct:true}]}, setEffect:[{k:'critDmg',v:1.8,pct:true}]},
    RUNE12: {name:'전쟁', grade:'기본룬', slots:{1:[{k:'atk',v:7,pct:true},{k:'crit',v:3,pct:true}],2:[{k:'atk',v:3,pct:true},{k:'hp',v:55,pct:false}],3:[{k:'hp',v:82,pct:false},{k:'def',v:21,pct:false}],4:[{k:'hp',v:3,pct:true},{k:'res',v:14,pct:false}],5:[{k:'hp',v:82,pct:false},{k:'skillDmgIncrease',v:2.4,pct:true}],6:[{k:'hp',v:82,pct:false},{k:'basicAtkDmgIncrease',v:3.6,pct:true}]}, setEffect:[{k:'atk',v:1,pct:true},{k:'hp',v:1,pct:true}]},
    RUNE13: {name:'지혜', grade:'기본룬', slots:{1:[{k:'crit',v:3,pct:true},{k:'magPen',v:4.5,pct:true}],2:[{k:'hp',v:55,pct:false},{k:'aoeDmgIncrease',v:2.7,pct:true}],3:[{k:'def',v:18,pct:false},{k:'res',v:18,pct:false}],4:[{k:'hp',v:3,pct:true},{k:'def',v:14,pct:false}],5:[{k:'mag',v:9,pct:true},{k:'hp',v:82,pct:false}],6:[{k:'mag',v:3,pct:true},{k:'hp',v:82,pct:false}]}, setEffect:[{k:'mag',v:1,pct:true},{k:'hp',v:1,pct:true}]},
    RUNE14: {name:'정의', grade:'상위룬', slots:{1:[{k:'atk',v:7,pct:true},{k:'crit',v:3,pct:true}],2:[{k:'crit',v:3,pct:true},{k:'critDmg',v:3.6,pct:true}],3:[{k:'hp',v:3,pct:true}],4:[{k:'hp',v:3,pct:true},{k:'res',v:14,pct:false}],5:[{k:'hp',v:81,pct:false},{k:'skillDmgIncrease',v:2.4,pct:true}],6:[{k:'hp',v:3,pct:true},{k:'skillDmgIncrease',v:1.8,pct:true}]}, setEffect:[{k:'atk',v:1,pct:true},{k:'crit',v:0.75,pct:true}]},
    RUNE15: {name:'절대', grade:'상위룬', slots:{1:[{k:'crit',v:4.5,pct:true},{k:'magPen',v:3.6,pct:true}],2:[{k:'crit',v:3,pct:true},{k:'magPen',v:4.5,pct:true}],3:[{k:'hp',v:3,pct:true},{k:'def',v:21,pct:false}],4:[{k:'hp',v:3,pct:true},{k:'def',v:21,pct:false}],5:[{k:'mag',v:9,pct:true},{k:'skillDmgIncrease',v:1.2,pct:true}],6:[{k:'mag',v:3,pct:true},{k:'hp',v:81,pct:false}]}, setEffect:[{k:'mag',v:1,pct:true},{k:'crit',v:0.75,pct:true}]},
    RUNE16: {name:'바다', grade:'상위룬', slots:{1:[{k:'atk',v:7,pct:true},{k:'phys',v:6,pct:true}],2:[{k:'atk',v:4,pct:true},{k:'phys',v:3,pct:true}],3:[{k:'hp',v:81,pct:false},{k:'def',v:21,pct:false}],4:[{k:'hp',v:3,pct:true},{k:'res',v:21,pct:false}],5:[{k:'basicAtkDmgIncrease',v:6,pct:true}],6:[{k:'basicAtkDmgIncrease',v:6,pct:true}]}, setEffect:[{k:'atk',v:1,pct:true},{k:'phys',v:1.5,pct:true}]},
    RUNE17: {name:'교만', grade:'상위룬', slots:{1:[{k:'magPen',v:12,pct:true}],2:[{k:'hp',v:81,pct:false},{k:'magPen',v:4.5,pct:true}],3:[{k:'def',v:21,pct:false},{k:'res',v:21,pct:false}],4:[{k:'hp',v:3,pct:true},{k:'def',v:21,pct:false}],5:[{k:'mag',v:8,pct:true},{k:'skillDmgIncrease',v:1.8,pct:true}],6:[{k:'mag',v:2,pct:true},{k:'hp',v:108,pct:false}]}, setEffect:[{k:'mag',v:1,pct:true},{k:'magPen',v:1.5,pct:true}]},
    RUNE18: {name:'헌신', grade:'상위룬', slots:{1:[{k:'aoeDmgReduction',v:4.5,pct:true}],2:[{k:'hp',v:3,pct:true},{k:'def',v:42,pct:false}],3:[{k:'hp',v:5,pct:true},{k:'critResChance',v:4.5,pct:true}],4:[{k:'hp',v:108,pct:false},{k:'critResDmg',v:5.4,pct:true}],5:[{k:'healGive',v:12,pct:true}],6:[{k:'shieldGive',v:8.4,pct:true}]}, setEffect:[{k:'mag',v:2,pct:true}]},
    RUNE19: {name:'건설', grade:'상위룬', slots:{1:[{k:'physRes',v:15,pct:true},{k:'magRes',v:15,pct:true}],2:[{k:'hp',v:3,pct:true},{k:'def',v:15,pct:true}],3:[{k:'hp',v:8,pct:true}],4:[{k:'hp',v:108,pct:false},{k:'dmgReduction',v:1.8,pct:true}],5:[{k:'dotDmgReduction',v:15,pct:true}],6:[{k:'res',v:15,pct:true}]}, setEffect:[{k:'critResDmg',v:3.6,pct:true},{k:'hp',v:1,pct:true}]},
    RUNE20: {name:'검황', grade:'유일룬', slots:{1:[{k:'atk',v:10,pct:true},{k:'aoeDmgIncrease',v:2.7,pct:true}],2:[{k:'atk',v:50,pct:false},{k:'aoeDmgIncrease',v:4.5,pct:true}],3:[{k:'hp',v:136,pct:false},{k:'critResDmg',v:9,pct:true}],4:[{k:'hp',v:5,pct:true},{k:'critResDmg',v:9,pct:true}],5:[{k:'hp',v:136,pct:false},{k:'skillDmgIncrease',v:3,pct:true}],6:[{k:'hp',v:5,pct:true},{k:'hp',v:81,pct:false}]}, setEffect:[{k:'atk',v:2,pct:true},{k:'hp',v:1,pct:true}]},
    RUNE21: {name:'시간', grade:'유일룬', slots:{1:[{k:'atk',v:10,pct:true},{k:'crit',v:2.25,pct:true}],2:[{k:'atk',v:80,pct:false},{k:'crit',v:2.25,pct:true}],3:[{k:'hp',v:136,pct:false},{k:'critResChance',v:4.5,pct:true}],4:[{k:'hp',v:5,pct:true},{k:'critResChance',v:4.5,pct:true}],5:[{k:'hp',v:5,pct:true},{k:'skillDmgIncrease',v:3,pct:true}],6:[{k:'hp',v:5,pct:true},{k:'res',v:35,pct:false}]}, setEffect:[{k:'atk',v:2,pct:true},{k:'critDmg',v:1,pct:true}]},
    RUNE22: {name:'계승', grade:'유일룬', slots:{1:[{k:'atk',v:10,pct:true},{k:'phys',v:4.5,pct:true}],2:[{k:'hp',v:81,pct:false},{k:'phys',v:12,pct:true}],3:[{k:'critResDmg',v:9,pct:true},{k:'critResChance',v:4.5,pct:true}],4:[{k:'hp',v:5,pct:true},{k:'hp',v:81,pct:false}],5:[{k:'basicAtkDmgIncrease',v:6,pct:true},{k:'skillDmgIncrease',v:3,pct:true}],6:[{k:'hp',v:5,pct:true},{k:'shieldTake',v:4.5,pct:true},{k:'healTake',v:4.5,pct:true}]}, setEffect:[{k:'atk',v:2,pct:true},{k:'phys',v:1.5,pct:true}]},
    RUNE23: {name:'빛', grade:'유일룬', slots:{1:[{k:'atk',v:10,pct:true},{k:'critDmg',v:2.7,pct:true}],2:[{k:'critDmg',v:7.2,pct:true},{k:'aoeDmgIncrease',v:2.7,pct:true}],3:[{k:'hp',v:5,pct:true},{k:'critResDmg',v:9,pct:true}],4:[{k:'hp',v:5,pct:true},{k:'critResDmg',v:9,pct:true}],5:[{k:'shieldGive',v:6,pct:true},{k:'hp',v:5,pct:true}],6:[{k:'healTake',v:4.5,pct:true},{k:'shieldTake',v:4.5,pct:true},{k:'skillDmgIncrease',v:3,pct:true}]}, setEffect:[{k:'atk',v:3,pct:true}]},
  },

  // ── 룬 프리셋 (배열 값은 룬 코드) ──────────────────────────────────
  RUNE_PRESETS: {
    '올혼돈': ['RUNE07','RUNE07','RUNE07','RUNE07','RUNE07','RUNE07'],
    '올바람': ['RUNE03','RUNE03','RUNE03','RUNE03','RUNE03','RUNE03'],
    '마법기본': ['RUNE09','RUNE09','RUNE05','RUNE05','RUNE05','RUNE05'],
    '물리기본': ['RUNE07','RUNE07','RUNE01','RUNE01','RUNE08','RUNE08'],
    '올검황': ['RUNE20','RUNE20','RUNE20','RUNE20','RUNE20','RUNE20'],
    '올시간': ['RUNE21','RUNE21','RUNE21','RUNE21','RUNE21','RUNE21'],
    '올계승': ['RUNE22','RUNE22','RUNE22','RUNE22','RUNE22','RUNE22'],
    '올빛': ['RUNE23','RUNE23','RUNE23','RUNE23','RUNE23','RUNE23'],
  },

  // ── 구조 상수 ────────────────────────────────────────────────────
  SLOTS: ['투구','갑옷','장갑','신발'],
  RUNE_GRADE_ORDER: ['기본룬','상위룬','유일룬'],

};
