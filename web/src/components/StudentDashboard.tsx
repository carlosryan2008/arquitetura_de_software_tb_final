import { GraduationCap, BookOpen, Calendar, TrendingUp, Play, Clock, LogOut, Award } from 'lucide-react';
import { enrolledCourses, studentActivities, studentGrades } from '../data/mockData';
import type { User } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudentDashboardProps {
  user: User;
  onNavigate: (page: string, courseId?: string) => void;
  onLogout: () => void;
}

const courseImages: { [key: string]: string } = {
  'web-development': 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3Njc2MzA5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'data-science': 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njc2ODMzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'ui-ux-design': 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2NzY2NTM5NHww&ixlib=rb-4.1.0&q=80&w=1080'
};

export function StudentDashboard({ user, onNavigate, onLogout }: StudentDashboardProps) {
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
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('catalog')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Buscar Cursos
              </button>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-900 font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta, {user.name}!</h1>
          <p className="text-gray-600">Continue sua jornada de aprendizagem</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Meus Cursos</h2>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Buscar Mais →
                </button>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map(course => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onNavigate('course-player', course.id)}
                  >
                    <div className="flex gap-6">
                      <ImageWithFallback
                        src={courseImages[course.thumbnail]}
                        alt={course.title}
                        className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600">{course.instructor}</p>
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Continuar
                          </button>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progresso</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            Próxima: {course.nextLesson}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.lastAccessed}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Activities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Atividades Pendentes</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {studentActivities.map(activity => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              activity.type === 'assignment' ? 'bg-blue-100 text-blue-700' :
                              activity.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            <span className="text-sm text-gray-600">{activity.courseName}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Prazo: {new Date(activity.dueDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-blue-100">Cursos Ativos</div>
                </div>
              </div>
              <div className="pt-4 border-t border-blue-500">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">38%</div>
                    <div className="text-sm text-blue-100">Progresso Médio</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12h</div>
                    <div className="text-sm text-blue-100">Esta Semana</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grades/Notas */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Minhas Notas
              </h3>
              <div className="space-y-4">
                {studentGrades.slice(0, 4).map(grade => {
                  const percentage = (grade.grade / grade.maxGrade) * 100;
                  const getGradeColor = (pct: number) => {
                    if (pct >= 90) return 'text-green-600';
                    if (pct >= 70) return 'text-blue-600';
                    if (pct >= 60) return 'text-yellow-600';
                    return 'text-red-600';
                  };
                  
                  return (
                    <div
                      key={grade.id}
                      className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 mb-1">{grade.assignmentTitle}</h4>
                          <p className="text-xs text-gray-500">{grade.courseName}</p>
                        </div>
                        <div className={`text-lg font-bold ${getGradeColor(percentage)}`}>
                          {grade.grade}/{grade.maxGrade}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              percentage >= 90 ? 'bg-green-500' :
                              percentage >= 70 ? 'bg-blue-500' :
                              percentage >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
                      </div>
                      {grade.feedback && (
                        <p className="text-xs text-gray-600 mt-2 italic">"{grade.feedback}"</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-4 w-full text-center"
                onClick={() => onNavigate('grades')}
              >
                Ver Todas as Notas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}