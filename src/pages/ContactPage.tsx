import { MessageCircle, Linkedin, Facebook } from 'lucide-react';

function ContactPage() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverBgColor: 'hover:bg-green-100'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBgColor: 'hover:bg-blue-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      hoverBgColor: 'hover:bg-blue-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up" style={{ opacity: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to join? Reach out to us through any of the following platforms:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center p-8 bg-white rounded-xl border border-gray-200 ${link.hoverBgColor} transition-elegant hover:shadow-xl hover:-translate-y-2 animate-fade-in-up group`}
                style={{ animationDelay: `${0.2 + index * 0.1}s`, opacity: 0 }}
              >
                <div className={`w-16 h-16 ${link.bgColor} rounded-xl flex items-center justify-center mb-4 transition-elegant group-hover:scale-110`}>
                  <link.icon className={`w-8 h-8 ${link.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {link.name}
                </h3>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <div className="inline-block bg-white rounded-xl px-8 py-6 border border-gray-200 shadow-sm transition-elegant hover:shadow-md">
              <p className="text-gray-600">
                We're here to help you succeed in your Digital SAT Math journey!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
