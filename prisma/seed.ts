import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const worksData = [
  {
    repositoryUrl: "https://github.com/yashi846/portfolio-frontend",
    order: 1,
    imageUrl: "/images/works/portfolio-frontend.png",
    imageAlt: "Portfolio website frontend screenshot",
    language: ["TypeScript"],
    framework: ["Next.js", "React"],
    translations: {
      ja: {
        title: "ポートフォリオサイト フロントエンド",
        shortDescription: "ポートフォリオサイトのフロントエンド",
        description:
          "このポートフォリオサイトをNext.js、TypeScript、Tailwind CSSを使用して作成しました。shadcn/uiコンポーネントを活用し、レスポンシブデザインを実装しています。",
        technicalHighlights: [
          "初めてのサイト制作",
          "初めてのフロントエンド",
          "初めてのGithub Actions",
        ],
      },
      en: {
        title: "Portfolio Website Frontend",
        shortDescription: "Portfolio website frontend",
        description:
          "This portfolio website was created using Next.js, TypeScript, and Tailwind CSS. It utilizes shadcn/ui components and implements responsive design.",
        technicalHighlights: [
          "First website project",
          "First frontend",
          "First Github Actions",
        ],
      },
    },
  },
  {
    repositoryUrl: "https://github.com/yashi846/portfolio-backend",
    order: 2,
    imageUrl: "",
    imageAlt: "",
    language: ["TypeScript"],
    framework: ["Express", "Prisma"],
    translations: {
      ja: {
        title: "ポートフォリオサイト バックエンド",
        shortDescription: "ポートフォリオサイトのバックエンド",
        description:
          "Express と Prisma を使って Postgres（Neon）に接続し、作品データを返します。",
        technicalHighlights: ["初めてのサイト制作", "初めてのバックエンド"],
      },
      en: {
        title: "Portfolio Website Backend",
        shortDescription: "Portfolio website backend",
        description:
          "Connect to Postgres (Neon) using Express and Prisma, and return the works data.",
        technicalHighlights: ["First website project", "First backend"],
      },
    },
  },
  {
    repositoryUrl: "https://github.com/yashi846/shooting-game",
    order: 3,
    imageUrl: "/images/works/shooting-game.png",
    imageAlt: "Shooting game screenshot",
    language: ["Blueprint"],
    framework: [],
    translations: {
      ja: {
        title: "Shooting Game",
        shortDescription: "UE5による3Dシューティングゲーム",
        description:
          "UE5を使用して、3Dシューティングゲームを作りました。時間内に銃を手にれて敵を射る。そして、ゴールするのが目的です。",
        technicalHighlights: ["初めてのゲームプロジェクト"],
      },
      en: {
        title: "Shooting Game",
        shortDescription: "3D shooting game with UE5",
        description:
          "Created a 3D shooting game using UE5. The goal is to get a gun within the time limit, shoot the enemies, and reach the goal.",
        technicalHighlights: ["First game project"],
      },
    },
  },
  {
    repositoryUrl: "https://github.com/yashi846/speed_game",
    order: 4,
    imageUrl: "/images/works/speed-game.jpg",
    imageAlt: "Speed game screenshot",
    language: ["Blueprint"],
    framework: [],
    translations: {
      ja: {
        title: "Speed Game",
        shortDescription: "UE5によるレーシングゲーム",
        description:
          "第24回UE5ぷちコンのテーマ「スピード」を元に制作したレーシングゲームです。時速が40km/hを下回らないように、ゴールを目指します。",
        technicalHighlights: [
          "ゲームの世界観が保たれるようなデザイン",
          "テンプレートの活用",
        ],
      },
      en: {
        title: "Speed Game",
        shortDescription: "Racing game with UE5",
        description:
          "A racing game based on the theme 'Speed' from the 24th UE5 Petit Con. The goal is to reach the finish line without dropping below 40km/h.",
        technicalHighlights: [
          "Design that maintains the worldview of the game",
          "Utilization of templates",
        ],
      },
    },
  },
];

async function main() {
  await prisma.workTranslation.deleteMany(); // 既存のデータの削除
  await prisma.work.deleteMany();

  for (let i = 0; i < worksData.length; i++) {
    const workData = worksData[i];
    const work = await prisma.work.create({
      data: {
        repositoryUrl: workData.repositoryUrl,
        imageUrl: workData.imageUrl,
        imageAlt: workData.imageAlt,
        language: workData.language,
        framework: workData.framework,
        sortOrder: i,
        translations: {
          create: [
            {
              language: "ja",
              title: workData.translations.ja.title,
              shortDescription: workData.translations.ja.shortDescription,
              description: workData.translations.ja.description,
              technicalHighlights: workData.translations.ja.technicalHighlights,
            },
            {
              language: "en",
              title: workData.translations.en.title,
              shortDescription: workData.translations.en.shortDescription,
              description: workData.translations.en.description,
              technicalHighlights: workData.translations.en.technicalHighlights,
            },
          ],
        },
      },
    });
  }
  console.log("Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
