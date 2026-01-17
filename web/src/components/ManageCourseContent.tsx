import { useState } from 'react';
import { ArrowLeft, BookOpen, Plus, Video, Users2, Edit, Trash2, Play, Calendar, Clock } from 'lucide-react';
import { courses } from '../data/mockData';

interface ManageCourseContentProps {
  courseId: string;
  onNavigate: (page: string, courseId?: string) => void;
}

export function ManageCourseContent({ courseId, onNavigate }: ManageCourseContentProps) {
  const course = courses.find(c => c.id === courseId);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [showAddLiveModal, setShowAddLiveModal] = useState(false);

  // Mock data for live classes
  const [liveClasses, setLiveClasses] = useState([
    {
      id: '1',
      title: 'Sessão de Dúvidas - JavaScript',
      date: '2026-01-10',
      time: '19:00',
      duration: '60 min',
      meetLink: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Workshop: React Hooks Avançado',
      date: '2026-01-15',
      time: '20:00',
      duration: '90 min',
      meetLink: 'https://meet.google.com/xyz-wxyz-abc',
      status: 'scheduled'
    }
  ]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Curso não encontrado</h2>
          <button
            onClick={() => onNavigate('teacher-dashboard')}
            className="text-blue-600 hover:text-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAddLesson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Aula adicionada com sucesso!');
    setShowAddLessonModal(false);
  };

  const handleAddLive = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLive = {
      id: String(liveClasses.length + 1),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      duration: formData.get('duration') as string,
      meetLink: formData.get('meetLink') as string,
      status: 'scheduled' as const
    };
    setLiveClasses([...liveClasses, newLive]);
    setShowAddLiveModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('teacher-dashboard')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Conteúdo</h1>
              <p className="text-sm text-gray-600">{course.title}</p>
            </div>
            <button
              onClick={() => onNavigate('edit-course', courseId)}
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Editar Curso
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Modules & Lessons */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="font-bold text-gray-900">Módulos e Aulas</h2>
                </div>
                <button
                  onClick={() => setShowAddLessonModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Aula
                </button>
              </div>

              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          Módulo {moduleIndex + 1}: {module.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-blue-600 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-red-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {lessonIndex + 1}. {lesson.title}
                                  </p>
                                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="text-gray-600 hover:text-blue-600 p-1">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-red-600 p-1">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Nenhum módulo criado ainda</h3>
                  <p className="text-gray-600 mb-4">Comece adicionando aulas ao seu curso</p>
                  <button
                    onClick={() => setShowAddLessonModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Primeira Aula
                  </button>
                </div>
              )}
            </div>

            {/* Live Classes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users2 className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="font-bold text-gray-900">Aulas ao Vivo</h2>
                </div>
                <button
                  onClick={() => setShowAddLiveModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Agendar Live
                </button>
              </div>

              <div className="space-y-4">
                {liveClasses.map((live) => (
                  <div key={live.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{live.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(live.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {live.time} ({live.duration})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-600 hover:text-blue-600 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={live.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Video className="w-4 h-4" />
                        Link da Reunião
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Estatísticas do Curso</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Total de Módulos</span>
                    <span className="font-bold text-gray-900">{course.modules?.length || 0}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Total de Aulas</span>
                    <span className="font-bold text-gray-900">
                      {course.modules?.reduce((sum, m) => sum + m.lessons.length, 0) || 0}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Lives Agendadas</span>
                    <span className="font-bold text-gray-900">{liveClasses.length}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Alunos Matriculados</span>
                    <span className="font-bold text-gray-900">{course.students}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowAddLessonModal(true)}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Adicionar Aula
                </button>
                <button
                  onClick={() => setShowAddLiveModal(true)}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Agendar Live
                </button>
                <button
                  onClick={() => onNavigate('edit-course', courseId)}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Editar Curso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Lesson Modal */}
      {showAddLessonModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Adicionar Nova Aula</h2>
                <button
                  onClick={() => setShowAddLessonModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddLesson} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Módulo *
                  </label>
                  <select
                    name="module"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um módulo ou crie novo</option>
                    {course.modules?.map((module, index) => (
                      <option key={module.id} value={module.id}>
                        Módulo {index + 1}: {module.title}
                      </option>
                    ))}
                    <option value="new">+ Criar novo módulo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Aula *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Ex: Introdução ao HTML5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link do YouTube *
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    required
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cole o link completo do vídeo no YouTube
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder="Ex: 15:30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Adicionar Aula
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLessonModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Live Class Modal */}
      {showAddLiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Agendar Aula ao Vivo</h2>
                <button
                  onClick={() => setShowAddLiveModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddLive} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Live *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Ex: Sessão de Dúvidas - JavaScript"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário *
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder="Ex: 60 min"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link do Google Meet *
                  </label>
                  <input
                    type="url"
                    name="meetLink"
                    required
                    placeholder="https://meet.google.com/abc-defg-hij"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cole o link da reunião do Google Meet
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Agendar Live
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLiveModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
