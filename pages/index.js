import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/faq.module.css"
import { Meta, Header, Footer, Sidebar, RelatedTags } from "../src/components"
import * as faqs from "../src/faqs"
import * as tags from "../src/tags"
import * as utils from "../src/utils"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const componentsOverride = { }

export function HomepageFAQ({ source, faq }) {
  return <div className="content">
    <MDXRemote {...source} components={componentsOverride} />
  </div>
}

export default function Home({ priority, grouped }) {
  return (
    <div>
      <Meta />

      <div className="navbar"></div>
      <div className="container">
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.contentWrapper}>
                <div className={styles.home}>
                  {priority.map(props  => {
                    return <HomepageFAQ key={props.faq.slug} {...props} />
                  })}

                </div>
            </div>

            <Sidebar />
            <RelatedTags {...grouped} />
            <Footer />
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const allTags = tags.getAll();
  const grouped = faqs.getByTags(allTags);
  const priority = [];

  const slugs = [
    "what-is-saito",
    "why-do-we-need-another-blockchain",
    "why-is-openness-more-important-than-decentralization",
    "whats-wrong-with-bitcoin",
  ];

  for (const slug of slugs) {
    const faq = faqs.getBySlug(slug);
    const content = `${faq.content.trim()} <a href="/faq/${faq.slug}/">#</a>`;
    const source = await serialize(content);
    priority.push({ faq, source });
  }

  return { props: { priority, grouped } };
}

