import { useState } from 'react';
import { GraduationCap, Search, Filter, Star, Users } from 'lucide-react';
import { courses } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User } from '../App';

interface CourseCatalogProps {
  onNavigate: (page: string, courseId?: string) => void;
  user: User | null;
}

const categories = ['Todos', 'Desenvolvimento Web', 'Ciência de Dados', 'Marketing', 'Design', 'Desenvolvimento Mobile', 'Negócios'];
const priceRanges = ['Todos', 'Grátis', 'R$ 0-50', 'R$ 50-100', 'R$ 100+'];

const courseImages: { [key: string]: string } = {
  'web-development': 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3Njc2MzA5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'data-science': 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njc2ODMzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'digital-marketing': 'https://images.unsplash.com/photo-1707301280408-8a9158f7613d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzY3NzA1NTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'ui-ux-design': 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2NzY2NTM5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'mobile-development': 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Njc2NjIyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'business-analytics': 'https://images.unsplash.com/photo-1736751035793-353baaa416cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGNoYXJ0c3xlbnwxfHx8fDE3Njc2NzkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

export function CourseCatalog({ onNavigate, user }: CourseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Todos');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPriceRange === 'Grátis') {
      matchesPrice = course.price === 0;
    } else if (selectedPriceRange === 'R$ 0-50') {
      matchesPrice = course.price >= 0 && course.price <= 50;
    } else if (selectedPriceRange === 'R$ 50-100') {
      matchesPrice = course.price > 50 && course.price <= 100;
    } else if (selectedPriceRange === 'R$ 100+') {
      matchesPrice = course.price > 100;
    }

    return matchesSearch && matchesCategory && matchesPrice;
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
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={() => onNavigate(user.role === 'student' ? 'student-dashboard' : user.role === 'teacher' ? 'teacher-dashboard' : 'admin-dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Painel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => onNavigate('student-signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Começar Agora
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explorar Cursos</h1>
          <p className="text-xl text-gray-600">Descubra sua próxima aventura de aprendizado</p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-700" />
            <span className="font-semibold text-gray-900">Filtros</span>
          </div>
          
          {/* Filtro de Categoria */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Preço</label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(range => (
                <button
                  key={range}
                  onClick={() => setSelectedPriceRange(range)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedPriceRange === range
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-gray-600">
            Mostrando {filteredCourses.length} {filteredCourses.length === 1 ? 'curso' : 'cursos'}
          </p>
        </div>

        {/* Grade de Cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => onNavigate('course-detail', course.id)}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <ImageWithFallback
                src={courseImages[course.thumbnail]}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                  {course.category}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <p className="text-sm text-gray-700 mb-4">{course.instructor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-sm">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">R$ {course.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">{course.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
