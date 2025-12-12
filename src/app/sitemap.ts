export default async function sitemap() {
    return [
        {
            url: process.env.NEXT_PUBLIC_DOMAIN_URL || "https://pikaresume.com",
            lastModified: new Date(),
        },
    ];
}
