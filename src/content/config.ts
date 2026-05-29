import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    // 過去の記事と新しい記事の両方を受け入れるようにルールを緩和
    schema: z.object({
        title: z.string(),
        summary: z.string().optional(), // 必須を解除（なくてもOK）
        tags: z.union([z.string(), z.array(z.string())]).optional(), // 文字列でも配列[ ]でもOK
        publishedAt: z.coerce.date().optional(), // 必須を解除
        pubDate: z.coerce.date().optional(),     // あなたの過去の記事用（pubDateやdate）
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
    }).transform((data) => {
        // 新しいテンプレートがエラーを起こさないように、裏側で自動変換してあげる
        return {
            ...data,
            // publishedAt が無ければ pubDate を使い、それも無ければ今日の日付にする
            publishedAt: data.publishedAt || data.pubDate || new Date(),
            // タグが配列 [ ] だった場合は、"音楽, ライブ" のように文字列に変換してあげる
            tags: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
            // summary が無い場合は空文字にする
            summary: data.summary || '',
        };
    }),
});

export const collections = { blog };