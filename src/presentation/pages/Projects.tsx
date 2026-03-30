import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useProjects } from '../hooks';

export function Projects() {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-slate-500">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-lg text-slate-500 mb-8">
            A collection of projects I've worked on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-250 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="p-8">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-slate-500 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-white dark:bg-slate-900 rounded-full text-blue-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 px-8 py-4 border-t border-slate-200 dark:border-slate-700">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <Github size={20} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={20} />
                    Live
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
