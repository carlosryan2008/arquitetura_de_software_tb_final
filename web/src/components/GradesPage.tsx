import { Award, ArrowLeft, BookOpen, TrendingUp, Calendar, Filter, FileText, CheckSquare, Folder } from 'lucide-react';
import { studentGrades, enrolledCourses } from '../data/mockData';
import { useState } from 'react';

interface GradesPageProps {
  onNavigate: (page: string) => void;
}

type FilterType = 'all' | 'quiz' | 'assignment' | 'project';

export function GradesPage({ onNavigate }: GradesPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  // Calculate statistics
  const totalGrades = studentGrades.length;
  const averageGrade = studentGrades.reduce((sum, grade) => {
    return sum + (grade.grade / grade.maxGrade) * 100;
  }, 0) / totalGrades;

  const gradesAbove90 = studentGrades.filter(g => (g.grade / g.maxGrade) * 100 >= 90).length;
  const passRate = (studentGrades.filter(g => (g.grade / g.maxGrade) * 100 >= 60).length / totalGrades) * 100;

  // Filter grades
  const filteredGrades = studentGrades.filter(grade => {
    const matchesType = selectedFilter === 'all' || grade.type === selectedFilter;
    const matchesCourse = selectedCourse === 'all' || grade.courseId === selectedCourse;
    return matchesType && matchesCourse;
  });

  // Group grades by course
  const gradesByCourse = filteredGrades.reduce((acc, grade) => {
    if (!acc[grade.courseId]) {
      acc[grade.courseId] = [];
    }
    acc[grade.courseId].push(grade);
    return acc;
  }, {} as { [key: string]: typeof studentGrades });

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', bar: 'bg-green-500' };
    if (percentage >= 70) return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500' };
    if (percentage >= 60) return { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'bg-yellow-500' };
    return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500' };
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'quiz': return 'Quiz';
      case 'assignment': return 'Tarefa';
      case 'project': return 'Projeto';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <CheckSquare className="w-4 h-4" />;
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'project': return <Folder className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Get unique course IDs from enrolled courses
  // (removed unused variable)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Minhas Notas</h1>
              <p className="text-sm text-gray-600">Acompanhe seu desempenho acadêmico</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Média Geral</p>
                <p className="text-2xl font-bold text-gray-900">{averageGrade.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Notas A+</p>
                <p className="text-2xl font-bold text-gray-900">{gradesAbove90}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Avaliado</p>
                <p className="text-2xl font-bold text-gray-900">{totalGrades}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Aprovação</p>
                <p className="text-2xl font-bold text-gray-900">{passRate.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filtros</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Course Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Curso
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Cursos</option>
                {enrolledCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Atividade
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedFilter('quiz')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'quiz'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quiz
                </button>
                <button
                  onClick={() => setSelectedFilter('assignment')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'assignment'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tarefas
                </button>
                <button
                  onClick={() => setSelectedFilter('project')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedFilter === 'project'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Projetos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grades by Course */}
        <div className="space-y-6">
          {Object.keys(gradesByCourse).length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Nenhuma nota encontrada</h3>
              <p className="text-gray-600">
                Não há notas que correspondam aos filtros selecionados.
              </p>
            </div>
          ) : (
            Object.entries(gradesByCourse).map(([courseId, grades]) => {
              const course = enrolledCourses.find(c => c.id === courseId);
              const courseAverage = grades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / grades.length;
              const courseColors = getGradeColor(courseAverage);

              return (
                <div key={courseId} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Course Header */}
                  <div className={`${courseColors.bg} ${courseColors.border} border-l-4 p-6`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="font-bold text-gray-900 mb-1">
                          {grades[0].courseName}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {grades.length} {grades.length === 1 ? 'avaliação' : 'avaliações'}
                          </span>
                          {course && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              Progresso: {course.progress}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Média do Curso</p>
                        <p className={`text-3xl font-bold ${courseColors.text}`}>
                          {courseAverage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Grades List */}
                  <div className="divide-y divide-gray-200">
                    {grades
                      .sort((a, b) => new Date(b.gradedDate).getTime() - new Date(a.gradedDate).getTime())
                      .map(grade => {
                        const percentage = (grade.grade / grade.maxGrade) * 100;
                        const colors = getGradeColor(percentage);

                        return (
                          <div key={grade.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                                    grade.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                                    grade.type === 'assignment' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {getTypeIcon(grade.type)}
                                    {getTypeLabel(grade.type)}
                                  </span>
                                  <h3 className="font-semibold text-gray-900">
                                    {grade.assignmentTitle}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Avaliado em {new Date(grade.gradedDate).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right ml-6">
                                <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                                  {grade.grade}/{grade.maxGrade}
                                </div>
                                <div className={`text-sm font-medium ${colors.text}`}>
                                  {percentage.toFixed(1)}%
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`${colors.bar} h-2 rounded-full transition-all`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>

                            {/* Feedback */}
                            {grade.feedback && (
                              <div className={`${colors.bg} ${colors.border} border-l-2 p-4 rounded-r-lg`}>
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                  Feedback do Professor:
                                </p>
                                <p className="text-sm text-gray-700 italic">
                                  "{grade.feedback}"
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Performance Legend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Legenda de Desempenho</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium text-gray-900">Excelente</p>
                <p className="text-xs text-gray-600">90% - 100%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium text-gray-900">Bom</p>
                <p className="text-xs text-gray-600">70% - 89%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div>
                <p className="font-medium text-gray-900">Satisfatório</p>
                <p className="text-xs text-gray-600">60% - 69%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div>
                <p className="font-medium text-gray-900">Precisa Melhorar</p>
                <p className="text-xs text-gray-600">Abaixo de 60%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
