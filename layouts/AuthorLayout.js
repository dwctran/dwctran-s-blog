import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    facebook,
    twitter,
    linkedin,
    github,
  } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-6 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 ">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="w-48 h-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-gray-900">
              {name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex pt-6 space-x-3 items-center">
              <SocialIcon kind="mail" href={`mailto:${email}`} size="10" />
              <SocialIcon kind="github" href={github} size="8" />
              <SocialIcon kind="facebook" href={facebook} size="8" />
              <SocialIcon kind="linkedin" href={linkedin} size="8" />
              {/* <SocialIcon kind="twitter" href={twitter} /> */}
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2 text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
