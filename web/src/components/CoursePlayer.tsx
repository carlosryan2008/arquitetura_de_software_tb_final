import { useState } from 'react';
import { GraduationCap, Play, CheckCircle, Circle, Video, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { courses } from '../data/mockData';
import type { User } from '../App';

interface CoursePlayerProps {
  courseId: string;
  user: User;
  onNavigate: (page: string, courseId?: string) => void;
}

export function CoursePlayer({ courseId, user, onNavigate }: CoursePlayerProps) {
  const [activeTab, setActiveTab] = useState<'lessons' | 'live' | 'exercises'>('lessons');
  const [currentLessonId, setCurrentLessonId] = useState('l1');
  const [lessonCompletionState, setLessonCompletionState] = useState<{ [key: string]: boolean }>({});
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>Curso não encontrado</div>;
  }

  // Flatten all lessons for easy access
  const allLessons = course.modules.flatMap(module => 
    module.lessons.map(lesson => ({ 
      ...lesson, 
      moduleTitle: module.title,
      completed: lessonCompletionState[lesson.id] !== undefined ? lessonCompletionState[lesson.id] : lesson.completed
    }))
  );
  
  const currentLesson = allLessons.find(l => l.id === currentLessonId) || allLessons[0];
  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId);

  if (!currentLesson) {
    return <div>Nenhuma lição disponível</div>;
  }

  const handleMarkComplete = () => {
    setLessonCompletionState(prev => ({
      ...prev,
      [currentLessonId]: true
    }));
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate(user.role === 'student' ? 'student-dashboard' : 'teacher-dashboard')}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar ao Painel
              </button>
              <div className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <span className="text-white font-medium">{course.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-gray-300 text-sm">
                Progresso: {Math.round((allLessons.filter(l => l.completed).length / allLessons.length) * 100)}%
              </div>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(allLessons.filter(l => l.completed).length / allLessons.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-56px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="bg-black flex-1 flex items-center justify-center">
            <div className="w-full h-full">
              <iframe
                src={currentLesson.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Controls & Info */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-2">{currentLesson.title}</h2>
              <p className="text-gray-400 mb-4">{currentLesson.moduleTitle}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousLesson}
                  disabled={currentLessonIndex === 0}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={handleMarkComplete}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Marcar como Completo
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima Lição
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex gap-8 border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('lessons')}
                  className={`pb-4 pt-4 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'lessons'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Lessons
                </button>
                <button
                  onClick={() => setActiveTab('live')}
                  className={`pb-4 pt-4 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'live'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Live Class
                </button>
                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`pb-4 pt-4 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'exercises'
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Exercises
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800 flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-6 py-6">
              {activeTab === 'lessons' && (
                <div className="text-gray-300">
                  <h3 className="font-semibold text-white mb-4">Course Overview</h3>
                  <p className="mb-4">{course.description}</p>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.syllabus.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'live' && (
                <div className="text-gray-300">
                  <h3 className="font-semibold text-white mb-4">Live Class Sessions</h3>
                  <div className="bg-gray-700 rounded-lg p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Weekly Live Session</h4>
                        <p className="text-sm text-gray-400">Every Monday at 6:00 PM EST</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Join our instructor for a live Q&A session, code reviews, and real-time problem solving.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Join Google Meet Session
                    </button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-white mb-3">Upcoming Sessions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                        <div>
                          <div className="text-white font-medium">Introduction to Advanced Topics</div>
                          <div className="text-sm text-gray-400">Monday, Jan 13, 2026 at 6:00 PM</div>
                        </div>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Upcoming</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                        <div>
                          <div className="text-white font-medium">Office Hours & Q&A</div>
                          <div className="text-sm text-gray-400">Monday, Jan 20, 2026 at 6:00 PM</div>
                        </div>
                        <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'exercises' && (
                <div className="text-gray-300">
                  <h3 className="font-semibold text-white mb-4">Practice Exercises</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white mb-1">Build a Responsive Layout</h4>
                          <p className="text-sm text-gray-400">Practice CSS Flexbox and Grid</p>
                        </div>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Assignment</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">
                        Create a responsive web page layout using modern CSS techniques. Your submission should 
                        include both desktop and mobile views.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Due: Jan 10, 2026</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Start Exercise
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white mb-1">JavaScript Functions Quiz</h4>
                          <p className="text-sm text-gray-400">Test your understanding</p>
                        </div>
                        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Quiz</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">
                        A 20-question quiz covering arrow functions, callbacks, and closures. Time limit: 30 minutes.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Due: Jan 8, 2026</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Take Quiz
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6 opacity-60">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white mb-1">Final Project: Portfolio Website</h4>
                          <p className="text-sm text-gray-400">Capstone project</p>
                        </div>
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Project</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">
                        Create a complete portfolio website showcasing everything you've learned in this course.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Unlocks after Module 6</span>
                        <button disabled className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm">
                          Locked
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white">Conteúdo do Curso</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {course.modules.map(module => (
              <div key={module.id} className="border-b border-gray-700">
                <div className="p-4 bg-gray-750">
                  <h4 className="font-medium text-white">{module.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {module.lessons.length} lições
                  </p>
                </div>
                <div className="divide-y divide-gray-700">
                  {module.lessons.map(lesson => {
                    // Find the lesson in allLessons to get updated completion state
                    const lessonWithState = allLessons.find(l => l.id === lesson.id);
                    const isCompleted = lessonWithState?.completed || false;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={`w-full text-left p-4 hover:bg-gray-700 transition-colors ${
                          currentLessonId === lesson.id ? 'bg-gray-700' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${
                              currentLessonId === lesson.id ? 'text-blue-400' : 'text-white'
                            }`}>
                              {lesson.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                              <Play className="w-3 h-3" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}