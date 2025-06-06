"use client";
import React from "react";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = ""; // Обновляем baseUrl для корневого домена

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1a1a1a] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href={baseUrl} className="text-2xl font-bold font-montserrat">
            ChelDev
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
            ></i>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href={`${baseUrl}/apps`} className="hover:text-gray-300">
                  Приложения
                </a>
              </li>
              <li>
                <a href={`${baseUrl}/websites`} className="hover:text-gray-300">
                  Сайты
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href={`${baseUrl}/apps`}
                  className="block py-2 px-4 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Приложения
                </a>
              </li>
              <li>
                <a
                  href={`${baseUrl}/websites`}
                  className="block py-2 px-4 hover:bg-gray-800 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Сайты
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-montserrat">
          Добро пожаловать в ChelDev
        </h1>
        <p className="text-center text-xl mb-8">
          Мы создаем качественные веб-сайты и приложения
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 font-montserrat">
              Приложения
            </h2>
            <p className="mb-4">
              Разрабатываем мобильные и веб-приложения для вашего бизнеса
            </p>
            <a
              href={`${baseUrl}/apps`}
              className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Смотреть проекты
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 font-montserrat">Сайты</h2>
            <p className="mb-4">
              Создаем современные и функциональные веб-сайты
            </p>
            <a
              href={`${baseUrl}/websites`}
              className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Смотреть проекты
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainComponent;