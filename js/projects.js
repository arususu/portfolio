/**
 * projects.js — ポートフォリオデータ
 *
 * 新しいプロジェクトを追加するには PROJECTS 配列に
 * 以下のスキーマに従ったオブジェクトを追記してください。
 *
 * スキーマ:
 *   id          : string   — ユニークな識別子（英数字・ハイフン）
 *   title       : string   — プロジェクト名
 *   subtitle    : string   — 短い説明（サブタイトル）
 *   team        : string   — チーム名
 *   period      : string   — 年度・期間
 *   role        : string   — 具体的な担当役割名
 *   involvement : "lead" | "member" | "support"
 *                   lead    = 主担当（資料に名前あり・中心的役割）
 *                   member  = 参加  （資料に名前あり）
 *                   support = サポート（資料に名前なし・周辺関与）
 *   description : string   — 詳細説明文
 *   technologies: string[] — 使用技術・ツール
 *   event       : string   — コンテスト・発表イベント名
 *   awards      : string[] — 受賞内容（なければ空配列）
 *   highlights  : string[] — 担当ハイライト（箇条書き）
 *   color       : string   — カードのアクセントカラー（CSS color）
 */
const PROJECTS = [
  {
    id: "agri-dx",
    title: "農業DXソリューション",
    subtitle: "低コスト測位技術 × マルチモーダルAI",
    team: "旭川工業高等専門学校チーム",
    period: "2025（継続開発中）",
    role: "AI開発担当",
    involvement: "lead",
    description:
      "農業が抱える後継者不足・経験値への依存・アナログな作業文化という課題を解決するため、低コストBLE測位技術とマルチモーダルAIを統合した農業DXシステムを開発。カメラのみで作物の生育状況・糖度・酸度を推定し、xRゴーグルを活用した現場作業のDX化・全自動収穫ロボットの開発を目指す。NEDOフューチャーリーダーズプログラムに採択された継続プロジェクト。",
    technologies: ["Python", "AI / 機械学習", "マルチモーダルAI", "BLE / Bluetooth", "xR / HoloLens2", "FastAPI", "Jetson Orin Nano", "Intel RealSense"],
    event: "NEDO フューチャーリーダーズプログラム",
    awards: [
      "東熱科学技術財団 採択（2024・2025両年）",
      "WiCON 2024 リコー賞",
      "北海道起業家甲子園 準優勝（テレコム懇談会長賞）"
    ],
    highlights: [
      "AI開発担当として、カメラ画像からの糖度・酸度・収穫適期推定モデルを設計・実装",
      "MobileNetV2ベースのモデルに生成AIを組み合わせた高精度化手法を開発",
      "栃木・香川の協力農家でのフィールドデータ収集に参加",
      "複数農家へのヒアリングを通じた課題抽出・要件定義に貢献",
      "BLEビーコンとAI推定結果を組み合わせた圃場デジタルMAP機能の開発"
    ],
    color: "#10b981"
  },
  {
    id: "maywanatastu",
    title: "迷わなたす",
    subtitle: "屋内位置情報取得システム",
    team: "北国のでじたるふぇありーず",
    period: "2024",
    role: "デバイスエンジニア",
    involvement: "member",
    description:
      "複雑化する都市部施設での「迷い」問題を解決するため、BLEビーコンを用いた屋内位置測位システムを開発。観光客向けナビ・施設管理者向け位置共有・HoloLens2を使ったMR施設管理の3大機能を持つ。フリスの伝達公式を応用した三点測位アルゴリズムにより屋内での高精度位置推定を実現した。WiCON 2024でリコー賞を受賞。",
    technologies: ["BLE / Bluetooth", "nRF Series", "Node.js", "REST API", "HoloLens2 / MR", "JavaScript", "三点測位アルゴリズム"],
    event: "WiCON 2024",
    awards: ["WiCON 2024 リコー賞"],
    highlights: [
      "デバイスエンジニアとしてBLEビーコンのハードウェア設計・ファームウェア実装を担当",
      "Advertising Interval（3秒）最適化によるバッテリー寿命の大幅延長を実現",
      "フリスの伝達公式を用いた三点測位アルゴリズムの実装・検証",
      "旭川高専内での自己位置測位実証実験に参加し、基本動作を確認",
      "ビーコン自動配置ツールのデバイス側インターフェース開発に貢献"
    ],
    color: "#06b6d4"
  },
  {
    id: "tournament",
    title: "オンライントーナメントシステム",
    subtitle: "校内体育大会向けリアルタイム得点管理",
    team: "旭川高専DX化推進隊",
    period: "2024",
    role: "開発チームメンバー",
    involvement: "member",
    description:
      "旭川高専の体育大会でリアルタイムに得点を更新・共有できるWebベースのトーナメントシステムを開発・本番運用。WebSocketによる同期通信でHTTPポーリングより通信コストを削減し、Canvas APIで動的なトーナメント表示を実現。さくらインターネット様のクラウドを協賛いただき運用。150人アンケートで72.7%が「次年度以降も必要」と回答した。",
    technologies: ["Node.js", "WebSocket", "JavaScript", "Canvas API", "Apache", "JSON", "さくらクラウド"],
    event: "中高生情報学研究コンテスト",
    awards: [],
    highlights: [
      "WebSocket同期通信によるリアルタイム得点更新システムの構築",
      "クライアント5,000台同時接続対応の設計・実装",
      "JSON形式の勝敗データをCanvas APIで動的描画するトーナメント表示機能",
      "さくらインターネット様の協賛クラウドを利用した本番デプロイ・運用",
      "150人中72.7%が次年度以降の必要性を支持するアンケート結果"
    ],
    color: "#8b5cf6"
  },
  {
    id: "pick-kun",
    title: "AI選書サービス「ぴっく君」",
    subtitle: "音楽の好みから本を選ぶAIサービス",
    team: "旭川高専 読書力向上委員会",
    period: "2026",
    role: "サポート",
    involvement: "support",
    description:
      "活字離れが進む中、若者と音楽の強い親和性に着目し、好きな曲・アーティストを入力すると音楽の世界観に合う本を推薦するAI選書サービス。Fine-Tuning済みLLM（Qwen）を使用し、「読まされる読書」から「読みたくて読む読書」への変革を目指す。DCON 2026出展作品。",
    technologies: ["LLM Fine-Tuning", "Qwen", "FastAPI", "Python", "GPU Server"],
    event: "DCON 2026",
    awards: [],
    highlights: [
      "選書用教師データ200件の手作業作成に参加",
      "Llama-3-405Bの1/5パラメータで動作するQwenモデルの選定・検証サポート",
      "音楽情報と書籍の対応付けロジックの議論・整理に貢献"
    ],
    color: "#f59e0b"
  },
  {
    id: "ichigo",
    title: "いちごの糖度推定システム",
    subtitle: "農業DXの足掛かりとなるAI技術",
    team: "フォレストリバー技術開発部",
    period: "2024",
    role: "サポート",
    involvement: "support",
    description:
      "カメラ画像のみからいちごの糖度・酸度・収穫適期・サイズを推定するAIシステム。ATAGO製糖度酸度計を用いたオリジナルデータセットを構築し、MobileNetV2ベースのモデルを開発。農業DXソリューションの前身となるコアAI技術の確立を目指した技育CAMPでの発表作品。",
    technologies: ["Python", "MobileNetV2", "PyTorch", "TensorFlow", "FastAPI", "Flask", "Kaggle Dataset"],
    event: "技育CAMP",
    awards: [],
    highlights: [
      "オリジナル糖度酸度データセットの収集・前処理に参加",
      "MobileNetV2 + LLMベースの糖度推定モデル開発サポート",
      "農業DXソリューションへのコア技術引き継ぎに貢献"
    ],
    color: "#ef4444"
  }
];

/**
 * 受賞歴データ
 * 新しい受賞を追加するには AWARDS 配列にオブジェクトを追記してください。
 *
 * スキーマ:
 *   year   : string — 年度
 *   name   : string — 受賞・実績名
 *   detail : string — 受賞内容・詳細
 *   note   : string — 備考（省略可）
 *   image  : string — 受賞証明写真のパス（省略可）例: "images/awards/wicon2024.jpg"
 */
const AWARDS = [
  {
    year: "2024・2025",
    name: "東熱科学技術財団",
    detail: "採択（両年）",
    note: "農業DXソリューション"
  },
  {
    year: "2024",
    name: "WiCON 2024",
    detail: "リコー賞",
    note: "迷わなたす（屋内位置情報取得システム）"
  },
  {
    year: "2024",
    name: "北海道起業家甲子園",
    detail: "準優勝（テレコム懇談会長賞）",
    note: "農業DXソリューション"
  },
  {
    year: "2024",
    name: "XROBOCON",
    detail: "準優勝",
    note: ""
  },
  {
    year: "2024",
    name: "北海道学生アプリコンテスト",
    detail: "インフィニットループ賞",
    note: ""
  }
];
