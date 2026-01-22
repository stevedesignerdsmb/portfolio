import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { CldImage } from '@/lib/cloudinary';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Steve Calderon`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M7.5 4.16667L12.5 9.16667L7.5 14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to portfolio
        </Link>

        <article>
          <h1 className="text-4xl font-medium text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{project.description}</p>

          <div className="aspect-video mb-8 rounded-2xl overflow-hidden bg-gray-100">
            <CldImage
              src={`portfolio/${project.image}`}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {project.longDescription && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-base text-gray-700 leading-7">
                {project.longDescription}
              </p>
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 gap-6 mb-8">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-2xl overflow-hidden bg-gray-100"
                >
                  <CldImage
                    src={`portfolio/${image}`}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              View Project
            </a>
          )}
        </article>
      </div>
    </main>
  );
}
