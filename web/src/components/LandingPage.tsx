import { GraduationCap, BookOpen, Users, Award, Play, Search, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navegação */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">EduConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Cursos
              </button>
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
            </div>
          </div>
        </div>
      </nav>

      {/* Seção Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Aprenda Sem Limites
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Conecte-se com professores especializados, acesse cursos de qualidade e alcance seus objetivos de aprendizado. 
                Junte-se a milhares de estudantes que já estão aprendendo no EduConnect.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Explorar Cursos
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('teacher-signup')}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Ensinar no EduConnect
                </button>
              </div>
              <div className="mt-12 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600">Estudantes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Cursos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-gray-600">Instrutores</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629359652978-a5d383151c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY3NjY4NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Estudante aprendendo online"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Certificado Incluído</div>
                    <div className="text-sm text-gray-600">Ao completar o curso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher o EduConnect?</h2>
            <p className="text-xl text-gray-600">Tudo que você precisa para uma jornada de aprendizado bem-sucedida</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aprendizado por Vídeo</h3>
              <p className="text-gray-600">
                Aulas em vídeo de alta qualidade que você pode assistir a qualquer hora, em qualquer lugar. Aprenda no seu próprio ritmo.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aulas ao Vivo</h3>
              <p className="text-gray-600">
                Participe de sessões ao vivo com instrutores e interaja com outros estudantes em tempo real.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exercícios Práticos</h3>
              <p className="text-gray-600">
                Aplique o que você aprende com projetos práticos e tarefas para reforçar suas habilidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prévia de Cursos em Destaque */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Cursos em Destaque</h2>
              <p className="text-xl text-gray-600">Comece a aprender com nossos cursos mais populares</p>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Ver Todos →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <CourseCard
              title="Introdução ao Desenvolvimento Web"
              instructor="Dra. Sarah Johnson"
              rating={4.8}
              students={1234}
              price={49.99}
              image="https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3Njc2MzA5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              onNavigate={onNavigate}
            />
            <CourseCard
              title="Ciência de Dados com Python"
              instructor="Prof. Michael Chen"
              rating={4.9}
              students={892}
              price={79.99}
              image="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3Njc2ODMzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              onNavigate={onNavigate}
            />
            <CourseCard
              title="Princípios de UI/UX Design"
              instructor="Alex Rodriguez"
              rating={4.9}
              students={1567}
              price={69.99}
              image="https://images.unsplash.com/photo-1586717799252-bd134ad00e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWdufGVufDF8fHx8MTc2NzY2NTM5NHww&ixlib=rb-4.1.0&q=80&w=1080"
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6" />
                <span className="font-semibold">EduConnect</span>
              </div>
              <p className="text-gray-400">
                Capacitando aprendizes em todo o mundo com educação de qualidade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Navegar Cursos</a></li>
                <li><a href="#" className="hover:text-white">Tornar-se Professor</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2026 EduConnect. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  onNavigate: (page: string) => void;
}

function CourseCard({ title, instructor, rating, students, price, image, onNavigate }: CourseCardProps) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onNavigate('catalog')}
    >
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{instructor}</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({students.toLocaleString()} estudantes)</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">R$ {price.toFixed(2)}</div>
      </div>
    </div>
  );
}
