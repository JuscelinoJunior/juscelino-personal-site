import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Head from 'next/head'
import { useRouter } from 'next/router'

type Post = {
    slug: string
    title: string
    excerpt: string
    date: string
    lang: string
    content: string
}

export default function PostPage({ post }: { post: Post }) {
    const router = useRouter()

    if (!post) {
        return <p>Post not found.</p>
    }

    return (
        <>
            <Head>
                <title>{post.title} - Juscelino Junior</title>
                <meta name="description" content={post.excerpt} />
            </Head>

            <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: "'Inter', sans-serif" }}>
                <button
                    onClick={() => router.push('/')}
                    aria-label="Back to posts list"
                    style={{
                        marginBottom: '2rem',
                        fontSize: '0.875rem',
                        color: '#DC2626',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontWeight: 600,
                    }}
                >
                    ← Voltar
                </button>

                <article>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>{post.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        style={{ fontSize: '1rem', lineHeight: 1.7}}
                    />
                </article>
            </main>
        </>
    )
}

// Gera as rotas estáticas (SSG) para cada post
export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const paths = filenames.map((filename) => ({
        params: { slug: filename.replace(/\.md$/, '') },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf-8')

    const { data, content } = matter(fileContents)
    const processedContent = await remark().use(html).process(content)
    const htmlContent = processedContent.toString()

    const post: Post = {
        slug: params.slug,
        title: data.title ?? params.slug,
        excerpt: data.excerpt ?? '',
        date: data.date ?? '',
        lang: data.lang ?? 'pt',
        content: htmlContent,
    }

    return {
        props: {
            post,
        },
    }
}
