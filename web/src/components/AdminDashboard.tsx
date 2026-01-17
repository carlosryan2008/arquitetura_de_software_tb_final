import { useState } from 'react';
import { GraduationCap, Users, BookOpen, DollarSign, TrendingUp, LogOut, CheckCircle, Clock, AlertTriangle, Search } from 'lucide-react';
import { courses } from '../data/mockData';
import type { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface UserManagement {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
  coursesCount: number;
}

const mockUsers: UserManagement[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'student', status: 'active', joinedDate: '2025-12-15', coursesCount: 3 },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', role: 'student', status: 'active', joinedDate: '2025-12-20', coursesCount: 2 },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@email.com', role: 'student', status: 'active', joinedDate: '2026-01-02', coursesCount: 1 },
  { id: '4', name: 'Dra. Sarah Johnson', email: 'sarah@email.com', role: 'teacher', status: 'active', joinedDate: '2025-11-10', coursesCount: 2 },
  { id: '5', name: 'Prof. Michael Chen', email: 'michael@email.com', role: 'teacher', status: 'active', joinedDate: '2025-11-15', coursesCount: 1 },
  { id: '6', name: 'Ana Costa', email: 'ana@email.com', role: 'teacher', status: 'pending', joinedDate: '2026-01-05', coursesCount: 0 },
];

export function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'courses' | 'revenue'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'teacher'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalTeachers = mockUsers.filter(u => u.role === 'teacher' && u.status === 'active').length;
  const pendingTeachers = mockUsers.filter(u => u.role === 'teacher' && u.status === 'pending').length;
  const totalCourses = courses.length;
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * course.students), 0);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegação */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('landing')}
            >
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">EduConnect</span>
              <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('catalog')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Ver Catálogo
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
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
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel do Administrador</h1>
          <p className="text-gray-600">Gerencie usuários, cursos e monitore a plataforma</p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
                <div className="text-sm text-gray-600">Estudantes</div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% este mês</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalTeachers}</div>
                <div className="text-sm text-gray-600">Professores</div>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            {pendingTeachers > 0 && (
              <div className="mt-4 flex items-center text-sm text-orange-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>{pendingTeachers} pendente{pendingTeachers > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalCourses}</div>
                <div className="text-sm text-gray-600">Cursos Ativos</div>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+3 novos</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">R$ {(totalRevenue / 1000).toFixed(0)}k</div>
                <div className="text-sm text-gray-600">Receita Total</div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+24% este mês</span>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-purple-600 text-purple-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Gerenciar Usuários
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'courses'
                  ? 'border-purple-600 text-purple-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Gerenciar Cursos
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'revenue'
                  ? 'border-purple-600 text-purple-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Análise de Receita
            </button>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Atividades Recentes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Atividades Recentes</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Novo curso publicado</div>
                          <div className="text-sm text-gray-600">Dra. Sarah Johnson publicou "Introdução ao Desenvolvimento Web"</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">há 2 horas</span>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Novo estudante registrado</div>
                          <div className="text-sm text-gray-600">Pedro Oliveira se inscreveu na plataforma</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">há 5 horas</span>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Professor pendente aprovação</div>
                          <div className="text-sm text-gray-600">Ana Costa solicitou registro como professora</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">há 1 dia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cursos Mais Populares */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cursos Mais Populares</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {courses.slice(0, 3).map(course => (
                  <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estudantes:</span>
                        <span className="font-medium text-gray-900">{course.students}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avaliação:</span>
                        <span className="font-medium text-gray-900">{course.rating} ⭐</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Receita:</span>
                        <span className="font-medium text-green-600">R$ {(course.price * course.students).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h2>
            </div>

            {/* Filtros e Busca */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar usuários..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as 'all' | 'student' | 'teacher')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Todos os Papéis</option>
                  <option value="student">Estudantes</option>
                  <option value="teacher">Professores</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as UserManagement["status"])}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativo</option>
                  <option value="pending">Pendente</option>
                  <option value="suspended">Suspenso</option>
                </select>
              </div>
            </div>

            {/* Tabela de Usuários */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Papel</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Data de Entrada</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cursos</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role === 'teacher' ? 'Professor' : 'Estudante'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' :
                          user.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {user.status === 'active' ? 'Ativo' : user.status === 'pending' ? 'Pendente' : 'Suspenso'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(user.joinedDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{user.coursesCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'pending' && (
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              Aprovar
                            </button>
                          )}
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Editar
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            {user.status === 'suspended' ? 'Reativar' : 'Suspender'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Cursos</h2>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Curso</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Instrutor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Categoria</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Estudantes</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avaliação</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Preço</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map(course => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">{course.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{course.instructor}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{course.category}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{course.students}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{course.rating} ⭐</td>
                      <td className="py-3 px-4 text-sm text-gray-900">R$ {course.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Visualizar
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Remover
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Análise de Receita</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Receita por Categoria</h3>
                <div className="space-y-4">
                  {['Desenvolvimento Web', 'Ciência de Dados', 'Marketing', 'Design'].map((category) => {
                    const categoryRevenue = courses
                      .filter(c => c.category === category)
                      .reduce((sum, c) => sum + (c.price * c.students), 0);
                    const percentage = (categoryRevenue / totalRevenue) * 100;
                    
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{category}</span>
                          <span className="text-sm font-medium text-gray-900">R$ {categoryRevenue.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Top Cursos por Receita</h3>
                <div className="space-y-3">
                  {courses
                    .sort((a, b) => (b.price * b.students) - (a.price * a.students))
                    .slice(0, 5)
                    .map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-xs text-gray-600">{course.students} estudantes</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          R$ {(course.price * course.students).toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Receita Total</div>
                  <div className="text-2xl font-bold text-gray-900">R$ {totalRevenue.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Receita Média por Curso</div>
                  <div className="text-2xl font-bold text-gray-900">R$ {(totalRevenue / courses.length).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ticket Médio</div>
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {(totalRevenue / courses.reduce((sum, c) => sum + c.students, 0)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
