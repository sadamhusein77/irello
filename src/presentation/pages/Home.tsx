import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { useUserProfile, useSkills } from '../hooks';

const socialIcons = [
  { icon: Github, key: 'github', label: 'GitHub' },
  { icon: Linkedin, key: 'linkedin', label: 'LinkedIn' },
  { icon: Twitter, key: 'twitter', label: 'Twitter' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Home() {
  const { user } = useUserProfile();
  const { skills } = useSkills();

  const frontendSkills = skills.filter(s => s.category === 'frontend').slice(0, 4);
  const backendSkills = skills.filter(s => s.category === 'backend').slice(0, 4);
  const toolSkills = skills.filter(s => s.category === 'tools').slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-72px)] flex items-center py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="text-lg text-blue-600 font-medium block mb-2"
            >
              Hello, I'm
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent"
            >
              {user?.name || 'Your Name'}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl text-slate-500 font-medium mb-6"
            >
              Full Stack Developer & UI/UX Enthusiast
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-500 max-w-[600px] mb-8 leading-relaxed"
            >
              {user?.bio || 'I build exceptional digital experiences with modern technologies.'}
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 mb-8 flex-wrap">
              <Link to="/projects">
                <Button size="lg">
                  View Projects
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Me
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6">
              {socialIcons.map((social) => {
                const url = user?.socialLinks?.[social.key as keyof typeof user.socialLinks];
                if (!url) return null;
                return (
                  <a
                    key={social.key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-150 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Frontend</h3>
              <p className="text-slate-500">{frontendSkills.map(s => s.name).join(', ')}</p>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Backend</h3>
              <p className="text-slate-500">{backendSkills.map(s => s.name).join(', ')}</p>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-250 hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Tools</h3>
              <p className="text-slate-500">{toolSkills.map(s => s.name).join(', ')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
