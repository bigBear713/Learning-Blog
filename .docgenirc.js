/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'lite',
    title: '学习博客',
    repoUrl: 'https://github.com/bigBear713/learning-blog',
    logoUrl: "/assets/angular.svg",
    docsDir: "contents",
    publicDir: "public",
    outputDir: "docs",
    exclude: ["public", "node_modules"],
    navs: [
        null,
        {
            title: 'GitHub',
            path: 'https://github.com/bigBear713',
            isExternal: true
        }
    ]
}