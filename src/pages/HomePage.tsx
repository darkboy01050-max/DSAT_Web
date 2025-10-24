import { BookOpen, Calculator, TrendingUp, Clock } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Start Your Journey to Master Digital SAT Math
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                A comprehensive online course for mastering the DSAT Math section, taught by
                <span className="font-semibold text-gray-900"> Mr. Mohamed Aliaa</span>. Build strong math
                fundamentals and practice the new SAT digital format from anywhere, at your own pace.
              </p>

              <div>
                <a
                  href="https://dsat-math.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-elegant shadow-md hover:shadow-xl hover:scale-105 transform"
                >
                  Start Now
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 transition-elegant hover:shadow-xl">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/logo.jpg"
                    alt="Digital SAT Math"
                    className="w-full h-full object-cover transition-elegant hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <Calculator className="hidden w-32 h-32 text-blue-500" strokeWidth={1.5} />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white rounded-xl p-6 shadow-xl max-w-xs hidden md:block transition-elegant hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
                <p className="font-semibold mb-1">Interactive Learning</p>
                <p className="text-sm text-blue-100">Practice with real SAT-style problems</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[

              {
                icon: BookOpen,
                title: 'Comprehensive Curriculum',
                description: 'Complete coverage of all Digital SAT Math topics'
              },
              {
                icon: TrendingUp,
                title: 'Proven Methods',
                description: 'Strategies that have helped hundreds of students succeed'
              },
              {
                icon: Clock,
                title: 'Flexible Learning',
                description: 'Study at your own pace, anytime and anywhere'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-elegant hover:-translate-y-1 animate-fade-in-up group"
                style={{ animationDelay: `${0.6 + index * 0.1}s`, opacity: 0 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 transition-elegant group-hover:bg-blue-100 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
