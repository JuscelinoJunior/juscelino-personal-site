import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useState, useEffect } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { FaPython, FaAws, FaJava } from "react-icons/fa";
import { DiMysql, DiOpensource, DiGoogleCloudPlatform } from "react-icons/di";
import { IoLogoFirebase } from "react-icons/io5";
import { SiDjango, SiFlask, SiPostgresql, SiAwslambda, SiRedis, SiFastapi, SiAerospike, SiApachekafka, SiApacheairflow } from "react-icons/si";
import Head from 'next/head'
import Link from 'next/link'

type Post = {
    slug: string
    title: string
    excerpt: string
    date: string
    lang: string
    content: string
}

type ExperienceTranslation = {
    company: string
    period: string
    description: string
}

type Experience = {
    pt: ExperienceTranslation
    en: ExperienceTranslation
    technologies: string[]
}

import React from 'react'

function PostList({ posts, theme }: { posts: Post[]; theme: 'light' | 'dark' }) {
    const textColor = theme === 'light' ? '#4B5563' : '#A1A1AA' // gray-600 light / gray-400 dark
    const titleColor = theme === 'light' ? '#111827' : '#F3F4F6' // gray-900 light / gray-100 dark

    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 0, color: textColor, marginTop: 0 }}>
            {posts.map((post) => (
                <li
                    key={post.slug}
                    style={{
                        cursor: 'pointer',
                        marginBottom: '1.5rem',
                        borderRadius: '8px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read post titled ${post.title}`}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                            theme === 'light' ? 'rgba(128, 128, 128, 0.1)' : 'rgba(128, 128, 128, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    }}
                >
                    <Link href={`/${post.slug}`} style={{ color: titleColor, textDecoration: 'none', flex: 1 }}>
                            <h3
                                style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    marginTop: 0,
                                    marginBottom: '0.25rem',
                                    color: titleColor,
                                }}
                            >
                                {post.title}
                            </h3>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', margin: 0 }}>{post.excerpt}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default function Home({ posts, experiences }: { posts: Post[], experiences: Experience[] }) {
    const [lang, setLang] = useState<'pt' | 'en'>('pt')
    const [selectedExperience, setSelectedExperience] = useState<ExperienceTranslation | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const techtoIcon = new Map([
        ['Python', <FaPython />],
        ['Java', <FaJava />],
        ['Django', <SiDjango />],
        ['FastAPI', <SiFastapi />],
        ['Flask', <SiFlask />],
        ['PostgreSQL', <SiPostgresql />],
        ['MySQL', <DiMysql />],
        ['Redis', <SiRedis />],
        ['Aerospike', <SiAerospike />],
        ['Kafka', <SiApachekafka />],
        ['Airflow', <SiApacheairflow />],
        ['AWS', <FaAws />],
        ['AWS Lambda', <SiAwslambda />],
        ['GCP', <DiGoogleCloudPlatform />],
        ['Firebase', <IoLogoFirebase />],
        ['Open Source Projects', <DiOpensource />]
    ])

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark')
        } else {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        }
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const filteredPosts = posts.filter((p) => p.lang === lang)

    const toggleLang = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))
    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

    const bgColor = theme === 'light' ? '#fff' : '#111827' // white / almost black
    const textColor = theme === 'light' ? '#111827' : '#F3F4F6' // dark / light
    const subTextColor = theme === 'light' ? '#6B7280' : '#A1A1AA' // gray-500 light / gray-400 dark
    const buttonBorder = theme === 'light' ? '#DC2626' : '#F87171' // red-600 / red-400
    const buttonText = theme === 'light' ? '#DC2626' : '#F87171'
    const buttonHoverBg = theme === 'light' ? '#DC2626' : '#F87171'

    return (
        <>
            <Head>
                <title>Juscelino Junior - Backend Software Engineer</title>
                <meta name="description" content="Backend Software Engineer com experiência em Python, Django, FastAPI, AWS e mais. Veja meu portfólio e blog." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="author" content="Juscelino Junior" />
                <meta property="og:title" content="Juscelino Junior - Backend Software Engineer" />
                <meta property="og:description" content="Conheça meu trabalho, experiência profissional opiniões sobre tecnologia." />
                <meta property="og:type" content="website" />
            </Head>

            <main
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '4rem 1.5rem',
                    fontFamily: "'Inter', sans-serif",
                    color: textColor,
                    backgroundColor: bgColor,
                    minHeight: '100vh',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
            >
                <header style={{ marginBottom: '2rem' }}>
                    <h1
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            marginBottom: '0.25rem',
                            lineHeight: 1.1,
                            color: textColor,
                        }}
                    >
                        Juscelino Junior
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: subTextColor, marginTop: 0 }}>
                        {lang === 'pt' ? 'Engenheiro de Software Backend com mais de 5 anos de experiência, focado em arquitetura, escalabilidade e sistemas orientados a dados. Embora meu foco principal seja o backend, tenho uma visão ampla de todo o ciclo de desenvolvimento — do frontend ao banco de dados — e busco sempre alinhar boas práticas com impacto real no produto.' : 'Backend Software Engineer with over 5 years of experience, focused on architecture, scalability, and data-driven systems. While my primary focus is backend, I have a broad understanding of the entire development lifecycle — from frontend to database — and always aim to align best engineering practices with real product impact.'}
                    </p>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={toggleLang}
                            aria-label="Toggle language"
                            style={{
                                padding: '0.5rem 1.5rem',
                                border: `2px solid ${buttonBorder}`,
                                borderRadius: '9999px',
                                color: buttonText,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                background: 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flex: 1,
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget
                                btn.style.backgroundColor = buttonHoverBg
                                btn.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget
                                btn.style.backgroundColor = 'transparent'
                                btn.style.color = buttonText
                            }}
                        >
                            {lang === 'pt' ? '🇺🇸 Switch to English' : '🇧🇷 Trocar para Português'}
                        </button>
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            style={{
                                padding: '0.5rem 1.5rem',
                                border: `2px solid ${buttonBorder}`,
                                borderRadius: '9999px',
                                color: buttonText,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                background: 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flex: 1,
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget
                                btn.style.backgroundColor = buttonHoverBg
                                btn.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget
                                btn.style.backgroundColor = 'transparent'
                                btn.style.color = buttonText
                            }}
                        >
                            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                        </button>
                    </div>
                </header>

                <section style={{ marginBottom: '2rem' }}>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: textColor,
                        }}
                    >
                        {lang === 'pt' ? 'Fale Comigo' : 'Contact Me'}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: subTextColor, marginTop: 0 }}>
                        {lang === 'pt' ? 'Fique à vontade para entrar em contato para oportunidades profissionais ou simplesmente para trocar ideias sobre tecnologia!' : 'Feel free to reach out for professional opportunities or just to chat about technology!'}
                    </p>
                    <p
                        style={{
                            fontSize: '1.1rem',
                            color: subTextColor,
                            marginTop: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <MdEmail
                            style={{
                                color: theme === 'light' ? '#111827' : '#F3F4F6',
                                fontSize: '1.5rem',
                            }}
                        />
                        <span>juniorjuscelino122@gmail.com</span>
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <a
                            href="https://www.linkedin.com/in/juscelino-junior-18a8bb150/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            style={{ color: theme === 'light' ? '#0A66C2' : '#60A5FA', fontSize: '1.5rem' }}
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/JuscelinoJunior"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            style={{ color: theme === 'light' ? '#111827' : '#F3F4F6', fontSize: '1.5rem' }}
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://youtube.com/@seu-canal"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            style={{ color: theme === 'light' ? '#DC2626' : '#F87171', fontSize: '1.5rem' }}
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: textColor,
                        }}
                    >
                        {lang === 'pt' ? 'Experiência Profissional' : 'Work Experience'}
                    </h2>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                        {experiences.map((exp) => (
                            <li
                                key={exp[lang].company}
                                onClick={() => setSelectedExperience(exp[lang])}
                                style={{
                                    padding: '1rem',
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
                                    cursor: 'pointer',
                                    backgroundColor: theme === 'light' ? '#F9FAFB' : '#1F2937',
                                    transition: 'background 0.3s ease',
                                }}
                            >
                                <strong style={{ fontSize: '1rem', color: textColor }}>{exp[lang].company}</strong>
                                <p style={{ fontSize: '0.875rem', color: subTextColor, margin: 0 }}>
                                    {exp[lang].period}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem'}}>
                                    {
                                        exp["technologies"].map((technology, index) => (
                                            <div style={{ display: 'flex', gap: '0.3rem'}}>{techtoIcon.get(technology)}<span key={index}>{technology}</span></div>
                                        ))}
                                </div>
                            </li>
                        ))}
                    </ul>

                </section>

                {selectedExperience && (
                    <div
                        onClick={() => setSelectedExperience(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 999,
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: theme === 'light' ? '#fff' : '#1F2937',
                                color: textColor,
                                padding: '2rem',
                                borderRadius: '12px',
                                maxWidth: '500px',
                                width: '90%',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                            }}
                        >
                            <h3 style={{ marginTop: 0 }}>{selectedExperience.company}</h3>
                            <p style={{ fontStyle: 'italic', color: subTextColor }}>{selectedExperience.period}</p>
                            <div
                                dangerouslySetInnerHTML={{ __html: selectedExperience.description }}
                                style={{ fontSize: '1rem', lineHeight: 1.6 }}
                            />
                            <button
                                onClick={() => setSelectedExperience(null)}
                                style={{
                                    marginTop: '1rem',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: buttonHoverBg,
                                    color: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                }}
                            >
                                {lang === 'pt' ? 'Fechar' : 'Close'}
                            </button>
                        </div>
                    </div>
                )}

                <section>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: textColor,
                        }}
                    >
                        Blog
                    </h2>
                    {
                        <PostList posts={filteredPosts} theme={theme} />
                    }
                </section>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const onlyFiles = filenames.filter((name) => {
        const fullPath = path.join(postsDirectory, name)
        return fs.statSync(fullPath).isFile()
    })

    const posts = await Promise.all(
        onlyFiles.map(async (filename) => {
            const slug = filename.replace(/\.md$/, '')
            const fileContents = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8')
            const { data, content } = matter(fileContents)
            const processedContent = await remark().use(html).process(content)
            const htmlContent = processedContent.toString()

            return {
                slug,
                title: data.title ?? slug,
                excerpt: data.excerpt ?? '',
                date: data.date ?? '',
                lang: data.lang ?? 'pt',
                content: htmlContent
            }
        })
    )

    // EXPERIENCES
    const experiencesDirectory = path.join(process.cwd(), 'experiences')
    const expSlugs = ['codeleap', 'pagbank', 'dafiti', 'dremio', 'simbiose']

    const loadExperienceDescription = async (slug: string, lang: 'pt' | 'en') => {
        const filePath = path.join(experiencesDirectory, `${slug}.${lang}.md`)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const processed = await remark().use(html).process(fileContent)
        return processed.toString()
    }

    const experiences: Experience[] = await Promise.all(
        expSlugs.map(async (slug) => {
            const [ptDesc, enDesc] = await Promise.all([
                loadExperienceDescription(slug, 'pt'),
                loadExperienceDescription(slug, 'en')
            ])

            const techMap: { [key: string]: string[] } = {
                codeleap: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Firebase', 'AWS'],
                pagbank: ['Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Redis', 'AWS', 'AWS Lambda'],
                dafiti: ['Python', 'FastAPI', 'Flask', 'PostgreSQL', 'Redis', 'AWS', 'AWS Lambda'],
                dremio: ['Java', 'Python', 'GCP', 'Open Source Projects'],
                simbiose: ['Python', 'Java', 'MySQL', 'Aerospike', 'Kafka', 'Airflow'],
            }

            const periods: { [key: string]: { pt: string, en: string } } = {
                codeleap: { pt: '2025 - Atualmente', en: '2025 - Current' },
                pagbank: { pt: '2024 - 2025', en: '2024 - 2025' },
                dafiti: { pt: '2023 - 2024', en: '2023 - 2024' },
                dremio: { pt: '2021 - 2022', en: '2023 - 2024' },
                simbiose: { pt: '2020 - 2022', en: '2023 - 2024' },
            }

            return {
                pt: {
                    company: capitalize(slug),
                    period: periods[slug].pt,
                    description: ptDesc,
                },
                en: {
                    company: capitalize(slug),
                    period: periods[slug].en,
                    description: enDesc,
                },
                technologies: techMap[slug] || [],
            }
        })
    )

    return {
        props: { posts, experiences },
    }
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
