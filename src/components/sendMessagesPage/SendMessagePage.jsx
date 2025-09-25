// src/components/SendMessagePage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SendMessagePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Валидация белорусского номера
    const isValidBelarusianPhone = (phone) => {
        const phoneRegex = /^(\+375\d{9}|80\d{9})$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
        }

        if (!formData.phone || !isValidBelarusianPhone(formData.phone)) {
            newErrors.phone = 'Неверный формат белорусского номера (+375... или 80...)';
        }

        if (!formData.message || formData.message.trim().length < 2) {
            newErrors.message = 'Сообщение должно содержать минимум 2 символа';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Скрываем сообщение об успехе при редактировании
        if (submitSuccess) {
            setSubmitSuccess(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            // Отправка на ваш бэкенд
            await axios.post('http://localhost:4000/api/messages', formData);

            // Успех: очистка формы и показ сообщения
            setFormData({ name: '', phone: '', message: '' });
            setSubmitSuccess(true);
        } catch (error) {
            console.error('Ошибка отправки:', error);
            setErrors({ submit: 'Не удалось отправить сообщение. Попробуйте позже.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">Напишите нам</h1>
                    <p className="text-indigo-100 mt-1">Мы с радостью ответим на ваше сообщение!</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Имя */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Имя *
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'
                            } focus:ring-2 focus:ring-indigo-200 outline-none transition`}
                            placeholder="Введите ваше имя"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Телефон */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Телефон *
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'
                            } focus:ring-2 focus:ring-indigo-200 outline-none transition`}
                            placeholder="+375291234567 или 80291234567"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Сообщение */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Сообщение *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                                errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'
                            } focus:ring-2 focus:ring-indigo-200 outline-none transition`}
                            placeholder="Расскажите, как мы можем вам помочь..."
                        />
                        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>

                    {/* Общая ошибка отправки */}
                    {errors.submit && <p className="text-sm text-red-600 text-center">{errors.submit}</p>}

                    {/* Сообщение об успехе */}
                    {submitSuccess && (
                        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium">
                            ✅ Сообщение успешно отправлено! Спасибо!
                        </div>
                    )}

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </span>
                        ) : (
                            'Отправить сообщение'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMessagePage;