import { useSetAtom } from 'jotai';
import type React from 'react';
import { useState } from 'react';
import { authApi, type LoginData, type RegisterData } from '../services/api';
import { loginAtom } from '../store/authStore';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useSetAtom(loginAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let response: any;
            if (isLogin) {
                const loginData: LoginData = {
                    email: formData.email,
                    password: formData.password
                };
                response = await authApi.login(loginData);
            } else {
                const registerData: RegisterData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                };
                response = await authApi.register(registerData);
            }

            const { access_token, user, items } = response.data;
            login({
                user,
                token: access_token,
                items: items.map((item: any) => ({
                    ...item,
                    id: item._id
                }))
            });
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || err.message || 'Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div
                    className='absolute inset-0'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />
            </div>

            {/* Login Form */}
            <div className='relative w-full max-w-md'>
                {/* Decorative border */}
                <div className='absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-lg blur opacity-25'></div>

                <div className='relative bg-gray-900 bg-opacity-90 backdrop-blur-sm border border-yellow-500/30 rounded-lg shadow-2xl'>
                    {/* Header */}
                    <div className='text-center py-8 border-b border-yellow-500/20'>
                        <h1 className='text-3xl font-bold text-yellow-400 mb-2 font-serif'>⚔️ WAR GAME ⚔️</h1>
                        <p className='text-gray-300 text-sm'>{isLogin ? 'Savaşa geri dön' : 'Orduna katıl'}</p>
                    </div>

                    {/* Form */}
                    <div className='p-8'>
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {!isLogin && (
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium text-yellow-400 mb-2'>
                                        Savaşçı Adı
                                    </label>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200'
                                        placeholder='Adınızı girin...'
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-yellow-400 mb-2'>
                                    E-posta
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200'
                                    placeholder='E-posta adresiniz...'
                                />
                            </div>

                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-yellow-400 mb-2'>
                                    Şifre
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200'
                                    placeholder='Şifreniz...'
                                    minLength={6}
                                />
                                {!isLogin && <p className='text-xs text-gray-400 mt-1'>En az 6 karakter olmalı</p>}
                            </div>

                            {error && (
                                <div className='bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md text-sm'>
                                    {error}
                                </div>
                            )}

                            <button
                                type='submit'
                                disabled={isLoading}
                                className='w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none'
                            >
                                {isLoading ? (
                                    <div className='flex items-center justify-center'>
                                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                                        {isLogin ? 'Giriş yapılıyor...' : 'Kayıt olunuyor...'}
                                    </div>
                                ) : (
                                    <span className='flex items-center justify-center'>
                                        {isLogin ? '⚔️ Savaşa Başla' : '🛡️ Orduna Katıl'}
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Toggle */}
                        <div className='mt-8 text-center'>
                            <button
                                type='button'
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                    setFormData({ name: '', email: '', password: '' });
                                }}
                                className='text-yellow-400 hover:text-yellow-300 transition-colors duration-200 text-sm'
                            >
                                {isLogin ? (
                                    <>
                                        Henüz bir hesabın yok mu?{' '}
                                        <span className='font-semibold underline'>Kayıt ol</span>
                                    </>
                                ) : (
                                    <>
                                        Zaten bir hesabın var mı?{' '}
                                        <span className='font-semibold underline'>Giriş yap</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
