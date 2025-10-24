import { Video, Users, MessageCircle } from 'lucide-react';

function CoursesPage() {
  const courses = [
    {
      title: 'Private Course',
      description: 'Live online sessions with Mr. Mohamed Aliaa — personalized explanations, interactive problem-solving, and direct feedback designed for your progress.',
      details: 'One-on-one attention with customized lesson plans tailored to your learning pace. Get instant clarification on difficult concepts and receive strategies proven to boost your score.',
      price: 'Starting from $99',
      icon: Users,
      buttonText: 'Contact to Enroll',
      buttonAction: () => window.location.href = '/contact'
    },
    {
      title: 'Recorded Course',
      description: 'Pre-recorded video lessons covering every DSAT Math topic. Learn anytime, anywhere, at your own speed.',
      details: 'Learn all essential DSAT Math strategies with detailed examples and practice problems. Complete curriculum with step-by-step video explanations and downloadable resources.',
      price: 'Starting from $49',
      icon: Video,
      buttonText: 'Start Learning',
      buttonAction: () => window.open('https://dsat-math.vercel.app/', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Learning Style
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the format that best fits your schedule and learning preferences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition-elegant hover:-translate-y-2 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 transition-elegant group-hover:bg-blue-100 group-hover:scale-110">
                    <course.icon className="w-8 h-8 text-blue-500 transition-elegant" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {course.details}
                  </p>
                  <div className="inline-block bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-blue-600 font-semibold text-sm">{course.price}</p>
                  </div>
                </div>

                <button
                  onClick={course.buttonAction}
                  className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-elegant shadow-sm hover:shadow-lg hover:scale-105 transform"
                >
                  {course.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <div className="inline-block bg-white rounded-xl px-8 py-6 border border-gray-200 shadow-sm max-w-2xl transition-elegant hover:shadow-md">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <p className="text-gray-900 font-semibold">All courses are fully online</p>
              </div>
              <p className="text-gray-600">
                Learn from anywhere with an internet connection. No physical location required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;
