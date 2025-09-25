import React from 'react';
import {NavLink} from "react-router-dom";
import { SparklesIcon } from '@heroicons/react/24/outline';

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="max-w-3xl w-full text-center">
                {/* Иконка с анимацией */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-indigo-200 rounded-full blur-lg opacity-30 animate-pulse"></div>
                        <div className="relative bg-white p-6 rounded-full shadow-lg">
                            <SparklesIcon className="h-16 w-16 text-indigo-600 mx-auto" />
                        </div>
                    </div>
                </div>


                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 mb-6">
                    Добро пожаловать!
                </h1>


                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 px-2">
                    Мы рады видеть вас здесь! 🌟
                    Независимо от того, впервые вы с нами или возвращаетесь —
                    вы всегда желанный гость. Пусть каждый ваш шаг здесь будет наполнен
                    вдохновением, теплом и полезными открытиями.
                </p>

                <div className="mt-12">
                    <button
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                    >
                       <NavLink to="/sendMessage"> Далее </NavLink>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;