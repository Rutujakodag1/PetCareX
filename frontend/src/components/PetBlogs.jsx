import React from "react";

const PetCareBlog = ({ theme }) => {
  const articles = [
    {
      id: 1,
      title: "How to Keep Your Pet Healthy: Essential Tips",
      description: "Learn the best practices to maintain your pet's health and well-being.",
      image: "/images/health.jpg",
      category: "Health",
      content: "Discover ways to provide a balanced diet, regular exercise, and checkups to keep your pet healthy.",
    },
    {
      id: 2,
      title: "Training Your Pet: A Beginner’s Guide",
      description: "Training your pet is essential to create a well-behaved companion.",
      image: "/images/training.jpg",
      category: "Training",
      content: "This guide covers basic training techniques and how to teach your pet obedience and good behavior.",
    },
    {
      id: 3,
      title: "Pet Grooming 101: Keep Your Pet Clean and Comfortable",
      description: "Grooming is crucial for your pet’s hygiene and comfort. Here’s what you need to know.",
      image: "/images/grooming.jpg",
      category: "Care",
      content: "Learn how often to groom your pet and the tools you’ll need for an effective grooming routine.",
    },
    {
      id: 4,
      title: "Preventing Common Pet Health Problems",
      description: "Explore common health issues in pets and how to prevent them.",
      image: "/images/health_issues.jpg",
      category: "Health",
      content: "This article provides advice on how to spot common pet illnesses early and how to prevent them.",
    },
  ];

  const handleViewArticle = (article) => {
    alert(`You’re viewing the article: ${article.title}\n\nContent: ${article.content}`);
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">PetCare Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className={`shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
            onClick={() => handleViewArticle(article)}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">{article.title}</h3>
            <p className="mt-2 text-sm">{article.description}</p>
            <p className="mt-2 text-sm italic text-gray-500">{article.category}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetCareBlog;
