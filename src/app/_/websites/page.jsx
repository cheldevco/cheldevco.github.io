"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [websites, setWebsites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    url: "", // Добавляем поле URL
  });
  const [error, setError] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = ""; // Обновляем baseUrl для корневого домена

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/projects/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "website" }),
      });

      if (!response.ok) {
        throw new Error("Failed to load websites");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setWebsites(data.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { url, error } = await upload({ file });
      if (error) {
        setError(error);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        image_url: url,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/projects/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "website",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create website");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      await loadWebsites();
      setFormData({ title: "", description: "", image_url: "", url: "" });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-montserrat">Наши сайты</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            {showForm ? "Отменить" : "Добавить сайт"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="grid gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Название сайта"
                className="p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Описание сайта"
                className="p-2 border rounded"
                required
              />
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="URL сайта (например, https://example.com)"
                className="p-2 border rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="p-2 border rounded"
              />
              <button
                type="submit"
                disabled={uploadLoading}
                className="bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                {uploadLoading ? "Загрузка..." : "Сохранить"}
              </button>
            </div>
          </form>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading ? (
          <div className="text-center">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((website) => (
              <div
                key={website.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                {website.image_url && (
                  <img
                    src={website.image_url}
                    alt={`Скриншот сайта ${website.title}`}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2 font-montserrat">
                  {website.title}
                </h2>
                <p className="mb-4">{website.description}</p>
                {website.url && (
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#1a1a1a] text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Посетить сайт
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainComponent;