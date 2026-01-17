import { GraduationCap, Star, Users, Clock, Award, CheckCircle, Play, CreditCard } from 'lucide-react';
import { courses } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User } from '../App';

interface CourseDetailProps {
  courseId: string;
  onNavigate: (page: string, courseId?: string) => void;
  user: User | null;
}

const courseImages: { [key: string]: string } = {
  'web-development': 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3Njc2MzA5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'data-science': 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njc2ODMzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'digital-marketing': 'https://images.unsplash.com/photo-1707301280408-8a9158f7613d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY3NzA1NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'ui-ux-design': 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2NzY2NTM5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'mobile-development': 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njc2NjIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'business-analytics': 'https://images.unsplash.com/photo-1736751035793-353baaa416cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGNoYXJ0c3xlbnwxfHx8fDE3Njc2NzkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

export function CourseDetail({ courseId, onNavigate, user }: CourseDetailProps) {
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnroll = () => {
    if (user) {
      alert('Payment would be processed via Stripe integration. For demo purposes, enrollment is simulated.');
      onNavigate('course-player', courseId);
    } else {
      alert('Please log in to enroll in this course.');
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('landing')}
            >
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">EduConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Back to Catalog
              </button>
              {user ? (
                <button
                  onClick={() => onNavigate(user.role === 'student' ? 'student-dashboard' : 'teacher-dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block px-3 py-1 bg-blue-500 rounded-full text-sm mb-4">
                {course.category}
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-blue-200">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=3b82f6&color=fff`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{course.instructor}</div>
                  <div className="text-sm text-blue-200">{course.instructorTitle}</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl">
                <ImageWithFallback
                  src={courseImages[course.thumbnail]}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="text-3xl font-bold mb-4">${course.price}</div>
                <button
                  onClick={handleEnroll}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <CreditCard className="w-5 h-5" />
                  Enroll Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Preview Course
                </button>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm font-semibold text-gray-900 mb-3">This course includes:</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Video lessons on demand
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Live class sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Practical exercises
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.syllabus.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {course.syllabus.map((topic, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{topic}</span>
                      </div>
                      <Play className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Instructor */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Instructor</h2>
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=3b82f6&color=fff&size=80`}
                  alt={course.instructor}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <div className="font-bold text-xl text-gray-900 mb-1">{course.instructor}</div>
                  <div className="text-gray-600 mb-3">{course.instructorTitle}</div>
                  <p className="text-gray-700">
                    An experienced educator with years of industry experience. Passionate about helping 
                    students achieve their learning goals through practical, hands-on instruction.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{course.rating} rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Sticky sidebar could go here for additional info */}
          </div>
        </div>
      </div>
    </div>
  );
}
