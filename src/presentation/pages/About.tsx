import { motion } from 'framer-motion';
import { Download, Mail, MapPin } from 'lucide-react';
import { Button } from '../components/ui';
import { useUserProfile, useExperiences } from '../hooks';

export function About() {
  const { user } = useUserProfile();
  const { experiences } = useExperiences();

  return (
    <div className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px] mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-4">
            {user?.bio || "I'm a passionate developer with experience building modern web applications."}
          </p>
          {user?.location && (
            <p className="flex items-center gap-2 text-slate-500">
              <MapPin size={18} />
              {user.location}
            </p>
          )}
        </motion.div>
      </div>

      {/* Experience Section */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8">Experience</h2>
          <div className="flex flex-col gap-8 max-w-[800px]">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="pl-8 border-l-2 border-blue-600 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="absolute -left-[6px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600" />
                <p className="text-sm text-blue-600 font-medium mb-1">{exp.period}</p>
                <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                <p className="text-slate-500 mb-2">{exp.company}</p>
                <p className="text-slate-500 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-violet-500 rounded-xl p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-2">Let's work together</h2>
            <p className="opacity-90 mb-8">I'm currently available for freelance projects and full-time opportunities.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                <Mail size={20} />
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Download size={20} />
                Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
