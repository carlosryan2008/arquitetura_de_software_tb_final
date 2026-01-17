import { useState } from 'react';
import { GraduationCap, BookOpen, Users, Plus, LogOut, CheckCircle, Clock, Edit } from 'lucide-react';
import { courses, teacherSubmissions } from '../data/mockData';
import type { User } from '../App';

interface TeacherDashboardProps {
  user: User;
  onNavigate: (page: string, courseId?: string) => void;
  onLogout: () => void;
}

export function TeacherDashboard({ user, onNavigate, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'courses' | 'grading' | 'create'>('courses');
  // Removed unused showCreateActivityModal state
  
  // Filter teacher's courses (for demo, showing first 2 courses)
  const teacherCourses = courses.slice(0, 2);
  const pendingSubmissions = teacherSubmissions.filter(s => s.status === 'pending');
  const gradedSubmissions = teacherSubmissions.filter(s => s.status === 'graded');

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
                Browse Courses
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {user.name.charAt(0)}
                </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your courses and engage with students</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{teacherCourses.length}</div>
                <div className="text-sm text-gray-600">Active Courses</div>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {teacherCourses.reduce((sum, course) => sum + course.students, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{pendingSubmissions.length}</div>
                <div className="text-sm text-gray-600">Pending Grades</div>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'courses'
                  ? 'border-blue-600 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`pb-4 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'grading'
                  ? 'border-blue-600 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Grading Center
              {pendingSubmissions.length > 0 && (
                <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {pendingSubmissions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-600 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Create Activity
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
              <button 
                onClick={() => onNavigate('create-course')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Course
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {teacherCourses.map(course => (
                <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.category}</p>
                    </div>
                    <button className="text-gray-600 hover:text-blue-600">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{course.students}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{course.rating}</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">${course.price}</div>
                      <div className="text-xs text-gray-600">Price</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onNavigate('manage-course-content', course.id)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Manage Content
                    </button>
                    <button 
                      onClick={() => onNavigate('edit-course', course.id)}
                      className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Edit Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grading' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Grading Center</h2>
            
            {/* Pending Submissions */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Pending Submissions ({pendingSubmissions.length})
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Assignment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Submitted</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pendingSubmissions.map(submission => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{submission.studentName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{submission.courseName}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{submission.assignmentTitle}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(submission.submittedDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Grade
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Graded Submissions */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Recently Graded ({gradedSubmissions.length})
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Assignment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Grade</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {gradedSubmissions.map(submission => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{submission.studentName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{submission.courseName}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{submission.assignmentTitle}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                            submission.grade! >= 90 ? 'bg-green-100 text-green-700' :
                            submission.grade! >= 70 ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {submission.grade}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Activity</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Activity created successfully!');
              }}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a course...</option>
                    {teacherCourses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Type
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type...</option>
                    <option value="assignment">Assignment</option>
                    <option value="quiz">Quiz</option>
                    <option value="project">Project</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., JavaScript Functions Assignment"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide detailed instructions for this activity..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Activity
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}