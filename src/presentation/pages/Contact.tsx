import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../components/ui';
import { useContact, useUserProfile } from '../hooks';
import type { ContactFormData } from '../../domain/entities';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const { sendMessage, isLoading, response } = useContact();
  const { user } = useUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg text-slate-500 max-w-[500px] mx-auto">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[900px] mx-auto">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Email</h3>
              <p className="text-lg">{user?.email || 'hello@irello.dev'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Location</h3>
              <p className="text-lg">{user?.location || 'Jakarta, Indonesia'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Availability</h3>
              <p className="text-lg font-medium text-emerald-500">Open for opportunities</p>
            </div>
          </motion.div>

          <motion.form
            className="md:col-span-2 flex flex-col gap-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 text-base border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 text-base border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="px-4 py-3 text-base border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-y min-h-[120px]"
                placeholder="Tell me about your project..."
              />
            </div>
            {response && (
              <div
                className={`px-4 py-3 rounded-md text-sm ${
                  response.success
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {response.message}
              </div>
            )}
            <Button type="submit" size="lg" isLoading={isLoading}>
              <Send size={20} />
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
