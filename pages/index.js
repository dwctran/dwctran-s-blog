import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import NewsletterForm from '@/components/NewsletterForm'
import LayoutWrapper from '@/components/LayoutWrapper'
// import headerNavLinks from '@/data/headerNavLinks'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* <LayoutWrapper> */}
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <div className="grid grid-cols-3 mb-20 mt-20 items-center justify-items-center">
            <div>
              <div className="col-span-1" style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={siteMetadata.heroImage}
                  alt={siteMetadata.title}
                  width="320px"
                  height="320px"
                  className="absolute"
                />
              </div>
            </div>
            <div className=" col-span-2 mx-auto border-gray p-4">
              <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-10">
                I'm <span className="text-4xl font-semibold text-primary-400">Tran Dinh Duc</span>.
                I'm a university sophomore, Data Analytics self-learner.
              </h1>
              {/* <p>University Sophomore, Wannabe Data Analyst</p> */}
              <Link href="/blog">
                <button className="bg-primary-400 rounded-xl text-white font-semibold dark:font-medium dark:text-gray-900 text-lg px-6 py-2 mt-8 hover:outline hover:outline-primary-400 hover:outline-offset-4 dark:bg-gray-500 dark:hover:outline dark:hover:outline-gray-500 dark:hover:outline-offset-4 mr-4">
                  Read the blog
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-gray-300 rounded-xl font-medium text-gray-900 text-lg px-6 py-2 mt-8 hover:outline dark:font-semibold dark:text-gray-100 hover:outline-primary-400 hover:outline-offset-4 dark:bg-primary-500 dark:hover:outline dark:hover:outline-primary-500 dark:hover:outline-offset-4">
                  More about me
                </button>
              </Link>
              {/* <Link href = '/about'>
                <button className='hover:outline hover:outline-offset-2'>More about me</button>
              </Link> */}
            </div>
          </div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {/* </LayoutWrapper> */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images, readingTime } = frontMatter
            // const src = { src: images[0] ? images[0] }
            // console.log(images[0])
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-6 xl:items-start">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>📆 {formatDate(date)}</time>
                      </dd>
                      {/* const src = {src: post.images[0]?.url} */}
                      <dd>
                        {images
                          ? images.length > 0 && (
                              <img
                                src={images[0]}
                                alt={title}
                                style={{ 'max-width': '90%' }}
                                layout="fixed"
                                className="rounded-lg mt-2 border-2 border-primary-900 dark:border-none "
                              />
                            )
                          : ''}
                      </dd>
                    </dl>
                    <div className=" xl:col-span-3">
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="mt-2 text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
