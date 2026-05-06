import type { MetadataRoute } from "next";

const siteUrl = "https://massage-tawny-five.vercel.app";

const areaPaths = [
  "/area/수원시/영통구/광교1동",
  "/area/수원시/팔달구/인계동",
  "/area/성남시/분당구/정자동",
  "/area/성남시/분당구/판교동",
  "/area/용인시/기흥구/신갈동",
  "/area/용인시/수지구/죽전1동",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...areaPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
