import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Image, ArrowRight, Sparkles, Layers } from 'lucide-react';

export function AdminDashboard() {
    const cards = [
        {
            title: 'Mermer Yönetimi',
            description: 'Mermer koleksiyonunuzu yönetin, düzenleyin ve görüntüleyin',
            icon: Package,
            to: '/yonetim/marbles',
            gradient: 'from-purple-600 via-pink-600 to-red-600',
            bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
            stats: '∞ Ürün',
        },
        {
            title: 'Slayt Yönetimi',
            description: 'Ana sayfa slider görsellerini düzenleyin ve sıralayın',
            icon: Image,
            to: '/yonetim/hero-slides',
            gradient: 'from-blue-600 via-cyan-600 to-teal-600',
            bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
            stats: '∞ Slayt',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-32 pb-16">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/20 to-transparent rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg shadow-black/5"
                    >
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="tracking-[0.2em] uppercase text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Admin Panel
                        </span>
                        <Sparkles className="w-5 h-5 text-pink-600" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-7xl tracking-[0.15em] uppercase font-light mb-6 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent"
                    >
                        Yönetim
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-600 tracking-wide text-lg max-w-2xl mx-auto"
                    >
                        Hangi yönetim alanına gitmek istersiniz?
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <Link key={card.to} to={card.to}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    className="group relative overflow-hidden"
                                >
                                    {/* Gradient Border Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur`} />

                                    {/* Main Card */}
                                    <div className={`relative ${card.bgPattern} backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/10 border border-white/50 transition-all duration-500`}>
                                        {/* Floating Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        {/* Content */}
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-3xl tracking-[0.1em] uppercase font-light text-neutral-900">
                                                    {card.title}
                                                </h2>
                                                <motion.div
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 4 }}
                                                    className="mt-2"
                                                >
                                                    <ArrowRight className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                                                </motion.div>
                                            </div>

                                            <p className="text-neutral-600 tracking-wide leading-relaxed">
                                                {card.description}
                                            </p>

                                            {/* Stats Badge */}
                                            <div className="flex items-center gap-2 pt-4 border-t border-neutral-200/50">
                                                <Layers className="w-4 h-4 text-neutral-500" />
                                                <span className="text-sm font-medium text-neutral-700 tracking-wide">
                                                    {card.stats}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

                                        {/* Shimmer Effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            initial={{ x: '-100%' }}
                                            whileHover={{
                                                x: '100%',
                                                transition: {
                                                    duration: 0.8,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                        >
                                            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Decoration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-neutral-400 text-sm tracking-wide">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-300" />
                        <Sparkles className="w-4 h-4" />
                        <span>STL Stone Gallery</span>
                        <Sparkles className="w-4 h-4" />
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-neutral-300" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
