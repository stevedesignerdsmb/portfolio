'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  const copyEmail = () => {
    navigator.clipboard.writeText('contact@stevedesignerd.com');
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-[178px] font-medium text-center leading-[178px] tracking-[-5.34px]">
          Find me in
        </h2>
        <div className="bg-gray-200 rounded-3xl p-1 flex gap-1 items-center">
          <button
            onClick={copyEmail}
            className="bg-white rounded-2xl px-3 py-2.5 shadow-md border border-gray-100 flex items-center gap-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-600"
            >
              <path
                d="M8 5.00005C7.01165 5.00005 6.49359 5.00005 6.09202 5.33756C5.99068 5.42787 5.90193 5.52947 5.82757 5.64005C5.5 6.13005 5.5 6.82505 5.5 8.21505V15.785C5.5 17.175 5.5 17.87 5.82757 18.36C5.90193 18.4706 5.99068 18.5722 6.09202 18.6625C6.49359 19 7.01165 19 8 19H16C16.9883 19 17.5064 19 17.908 18.6625C18.0093 18.5722 18.0981 18.4706 18.1724 18.36C18.5 17.87 18.5 17.175 18.5 15.785V8.21505C18.5 6.82505 18.5 6.13005 18.1724 5.64005C18.0981 5.52947 18.0093 5.42787 17.908 5.33756C17.5064 5.00005 16.9883 5.00005 16 5.00005H8Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5.5 7L12 12L18.5 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-medium text-gray-900">
              contact@stevedesignerd.com
            </span>
          </button>
          <a
            href="https://wa.me/yournumber"
            className="bg-white rounded-2xl px-3 py-2.5 shadow-md border border-gray-100 flex items-center gap-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-600"
            >
              <path
                d="M17.472 14.382C17.342 14.208 15.109 12.023 14.623 11.522C14.183 11.073 13.743 11.074 13.328 11.127C13.015 11.165 12.722 11.226 12.445 11.34C11.987 11.535 11.411 11.835 10.829 12.23C9.82 12.89 9.001 13.465 8.422 14.382C7.843 15.299 8.253 16.115 8.554 16.516C8.805 16.85 9.108 17.14 9.45 17.376C9.792 17.612 10.168 17.79 10.562 17.904C10.956 18.018 11.362 18.066 11.768 18.046C12.174 18.026 12.574 17.938 12.951 17.784C13.328 17.63 13.676 17.412 13.98 17.14C14.284 16.868 14.54 16.546 14.738 16.188C14.936 15.83 15.072 15.442 15.14 15.04C15.208 14.638 15.206 14.228 15.134 13.826C15.062 13.424 14.922 13.038 14.72 12.68C14.518 12.322 14.258 12 13.95 11.728C13.642 11.456 13.292 11.238 12.915 11.084C12.538 10.93 12.138 10.842 11.732 10.822C11.326 10.802 10.92 10.85 10.526 10.964C10.132 11.078 9.756 11.256 9.414 11.492C9.072 11.728 8.769 12.018 8.518 12.352C8.267 12.686 7.966 13.502 8.545 14.419"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-medium text-gray-900">Whatsapp</span>
          </a>
          <a
            href="https://twitter.com/yourhandle"
            className="bg-white rounded-2xl px-3 py-2.5 shadow-md border border-gray-100"
          >
            <span className="text-lg font-medium text-gray-900">X (Twitter)</span>
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            className="bg-white rounded-2xl px-3 py-2.5 shadow-md border border-gray-100"
          >
            <span className="text-lg font-medium text-gray-900">Linkedin</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
